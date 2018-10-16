class SocketClient extends egret.HashObject {
    private static _instance: SocketClient
    eventMaps = {}
    socket: any
    makeMessageIntall: any
    messageList = []

    constructor() {
        super()

    }

    public beginIntvall() {
        let self = this
        this.makeMessageIntall = window.setInterval(function () {
            self.makeMessageProcess()
        }, 33)
    }

    // public static getInstance(): SocketClient {
    //
    //     if (!this._instance)
    //         this._instance = new SocketClient();
    //     return this._instance;
    // }
    makeMessageProcess() {
        //def初始化未完成时先把消息屏蔽
        if (this.messageList == undefined || this.messageList.length <= 0) {
            return
        }
        // ;
        let len = this.messageList.length
        // 一次性不要处理太多消息,暂定5个
        let messageListBake: any = [];
        if (len < 5) {
            messageListBake = this.messageList
            this.messageList = []
        } else {
            messageListBake = this.messageList.splice(0, 5)
        }
        messageListBake.forEach((message) => {
            try {
                this.messageProcess(message)
            }
            catch (e) {
                Logger.error(e)
            }
        })
    }

    /*
     注册回调函数
     @param event_id 关心的事件ID
     @param cb 回调函数
     @param target cb回调中绑定的 this 对象
     @param once true: cb回调执行过完自动从注册中移除
    */
    public registerOnEvent(event_id, cb, target, once?) {
        if (typeof event_id == 'object') {
            event_id = event_id.name
        }
        let events: Array<any> = this.eventMaps[event_id.toString()]
        if (!events) {
            events = []
            this.eventMaps[event_id.toString()] = events
        }
        events.push({
            target: target,
            invoker: cb,
            once: once || false
        })
        return
    }

    /*
       取消回调函数的注册
       @param event_id 关心的事件ID
       @param target cb回调中绑定的 this 对象
   */
    public unregisterOnEvent(event_id, target) {
        if (typeof event_id == 'object') {
            event_id = event_id.id
        }

        let events = this.eventMaps[event_id.toString()]
        if (events) {
            // 没有传入 thisArg，则表示移除所有注册的回调函数
            if (!target) {
                this.eventMaps[event_id.toString()] = null
                return
            }
            let items = events.filter((item) => {
                return item.target != target // 找到不等于 target 的保留下来
            })
            this.eventMaps[event_id.toString()] = items
        }

        return
    }

    /*
       取消绑定在 target 中的所有回调函数注册
       @param target cb回调中绑定的 this 对象
   */
    public unregisterAllOnTarget(target) {
        if (!target) {
            return
        }

        Object.keys(this.eventMaps).forEach((key) => {
            let items = this.eventMaps[key].filter((item) => {
                return item.target != target // 找到不等于 target 的保留下来
            })
            this.eventMaps[key] = items
        })
        return
    }

    public connectToCoreServer(host: String, port: string, cb: Function, cbTar: any) {
        // timeOutReconnectClear()
        // timeOutReconnectInit()
        let self = this
        //socketWaitCnt.clearMessage()
        WebSocket = window.WebSocket || window.MozWebSocket
        let socket: any
        if (WebSocket) {
            let preStr = ''
            if (gt.isHttps()) {
                preStr = "wss://"
            } else {
                preStr = "ws://"
            }
            let url = preStr + host + ':' + port
            socket = new WebSocket(url)
            socket.binaryType = "arraybuffer" // We are talking binary
            //链接失败
            socket.onerror = this.onerror
            // 连接成功
            socket.onopen = () => {
                cb.call(cbTar)
            } //this.onopen.call(cb)
            // 断开连接
            socket.onclose = this.onclose

            // 收到指令
            let self = this
            socket.onmessage = (event) => {
                let data = event.data
                self.messageList.push(this.decode(data))

            }
            this.socket = socket
            this.beginIntvall()
        } else {
            // alert("Your browser does not support Web Socket. Upgrade to QQ/UC browser please.")
            throw "Your browser does not support Web Socket."
        }
        return
    }

    public send(packet, isSyncMessage?: boolean) {
        // Exemplary payload
        var payload = {test: "test22"};

        //let msgClass = packet.name
        var errMsg = gp.AwesomeMessage22.verify(payload);

        if (errMsg)
            throw Error(errMsg);
        var message = gp.AwesomeMessage22.create(payload); // or use .fromObject if conversion is necessary
        console.log('message', message)
        // Encode a message to an Uint8Array (browser) or Buffer (node)
        var buffer = gp.AwesomeMessage22.encode(message).finish();


        let msgID = gp.NetMessageCmd.values.AwesomeMessage22

        let  d = new ArrayBuffer(buffer.byteLength+5);

       // buffer.writeInt32(msgID);//和服务端约定好，前四个字节存放协议的名称

        this.socket.send(buffer)

    }

    public onopen(cb: Function) {


        Logger.error('The connect begin!')
    }

    public onerror(...paro) {

    }

    public onclose() {
        Logger.error('The connect is lost!')
    }


    public decode(buffer) {

        //  gp.NetMessageCmd.values.ID_LOGIN_REQUEST  消息id



        var dataview = new DataView(buffer);
        var unit8 = new Uint8Array(dataview.buffer, dataview.byteOffset, dataview.byteLength);
        //let msgID = new
        var message = gp.AwesomeMessage22.decode(unit8); // 接受的是这个
        // ... do something with message
        console.log('message', message)
        // If the application uses length-delimited buffers, there is also encodeDelimited and decodeDelimited.
        // Maybe convert the message back to a plain object
        //.content

        //https://blog.csdn.net/keyunq/article/details/81164413
        //https://my.oschina.net/cxh3905/blog/293000   enum
        var object = gp.AwesomeMessage22.toObject(message, {
            longs: String,
            enums: String,
            bytes: String,
            // see ConversionOptions
        });
        console.log('object', object)
        return object
    }

    addMessageToProcess() {

    }

    // 消息回调接口
    public messageProcess(msg) {
        if (!msg) {
            return
        }

        msg.messageCode = msg.mainType << 8 | msg.subType
        // 找到 messageCode 注册的 Callback
        let key = msg.messageCode.toString()
        let events = this.eventMaps[key]
        if (events) {
            // invoker回调中有可能会对events进行修改，所以必须等所有回调执行完成之后，才能处理once参数
            let list = []
            list.push(events)
            events.forEach((event) => {
                event.invoker.call(event.target, msg)
            })
            // 重新取值
            events = this.eventMaps[key]
            // 排除掉只能执行一次的那些 event
            let keeps = events.filter((event) => {
                return !event.once
            })

            this.eventMaps[key] = keeps
        }

        // //需要跳转到登陆界面的error特殊处理
        // if ((msg.isErrorMessage || (isMutiLogin)) && (!msg.isHandled) && !socketInfo.isDirectToLogin) {
        //
        // }

        // if (!msg.isLog) {
        //   Logger.log('no one process server msg ', msg)
        // }
    }


}
