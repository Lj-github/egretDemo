var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var SocketClient = (function (_super) {
    __extends(SocketClient, _super);
    function SocketClient() {
        var _this = _super.call(this) || this;
        _this.eventMaps = {};
        _this.messageList = [];
        return _this;
    }
    SocketClient.prototype.beginIntvall = function () {
        var self = this;
        this.makeMessageIntall = window.setInterval(function () {
            self.makeMessageProcess();
        }, 33);
    };
    // public static getInstance(): SocketClient {
    //
    //     if (!this._instance)
    //         this._instance = new SocketClient();
    //     return this._instance;
    // }
    SocketClient.prototype.makeMessageProcess = function () {
        var _this = this;
        //def初始化未完成时先把消息屏蔽
        if (this.messageList == undefined || this.messageList.length <= 0) {
            return;
        }
        // ;
        var len = this.messageList.length;
        // 一次性不要处理太多消息,暂定5个
        var messageListBake = [];
        if (len < 5) {
            messageListBake = this.messageList;
            this.messageList = [];
        }
        else {
            messageListBake = this.messageList.splice(0, 5);
        }
        messageListBake.forEach(function (message) {
            try {
                _this.messageProcess(message);
            }
            catch (e) {
                Logger.error(e);
            }
        });
    };
    /*
     注册回调函数
     @param event_id 关心的事件ID
     @param cb 回调函数
     @param target cb回调中绑定的 this 对象
     @param once true: cb回调执行过完自动从注册中移除
    */
    SocketClient.prototype.registerOnEvent = function (event_id, cb, target, once) {
        if (typeof event_id == 'object') {
            event_id = event_id.id;
        }
        var events = this.eventMaps[event_id.toString()];
        if (!events) {
            events = [];
            this.eventMaps[event_id.toString()] = events;
        }
        events.push({
            target: target,
            invoker: cb,
            once: once || false
        });
        return;
    };
    /*
       取消回调函数的注册
       @param event_id 关心的事件ID
       @param target cb回调中绑定的 this 对象
   */
    SocketClient.prototype.unregisterOnEvent = function (event_id, target) {
        if (typeof event_id == 'object') {
            event_id = event_id.id;
        }
        var events = this.eventMaps[event_id.toString()];
        if (events) {
            // 没有传入 thisArg，则表示移除所有注册的回调函数
            if (!target) {
                this.eventMaps[event_id.toString()] = null;
                return;
            }
            var items = events.filter(function (item) {
                return item.target != target; // 找到不等于 target 的保留下来
            });
            this.eventMaps[event_id.toString()] = items;
        }
        return;
    };
    /*
       取消绑定在 target 中的所有回调函数注册
       @param target cb回调中绑定的 this 对象
   */
    SocketClient.prototype.unregisterAllOnTarget = function (target) {
        var _this = this;
        if (!target) {
            return;
        }
        Object.keys(this.eventMaps).forEach(function (key) {
            var items = _this.eventMaps[key].filter(function (item) {
                return item.target != target; // 找到不等于 target 的保留下来
            });
            _this.eventMaps[key] = items;
        });
        return;
    };
    SocketClient.prototype.connectToCoreServer = function (host, port) {
        // timeOutReconnectClear()
        // timeOutReconnectInit()
        var self = this;
        //socketWaitCnt.clearMessage()
        WebSocket = window.WebSocket || window.MozWebSocket;
        var socket;
        if (WebSocket) {
            var preStr = '';
            if (gt.isHttps()) {
                preStr = "wss://";
            }
            else {
                preStr = "ws://";
            }
            var url = preStr + host + ':' + port;
            socket = new WebSocket(url);
            //socket.binaryType = "arraybuffer" // We are talking binary
            //链接失败
            socket.onerror = this.onerror;
            // 连接成功
            socket.onopen = this.onopen;
            // 断开连接
            socket.onclose = this.onclose;
            // 收到指令
            socket.onmessage = this.onmessage;
            this.socket = socket;
            this.beginIntvall();
        }
        else {
            // alert("Your browser does not support Web Socket. Upgrade to QQ/UC browser please.")
            throw "Your browser does not support Web Socket.";
        }
        return;
    };
    SocketClient.prototype.send = function (packet, isSyncMessage) {
    };
    SocketClient.prototype.onopen = function () {
        Logger.error('The connect begin!');
    };
    SocketClient.prototype.onerror = function () {
        var paro = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            paro[_i] = arguments[_i];
        }
    };
    SocketClient.prototype.onclose = function () {
        Logger.error('The connect is lost!');
    };
    SocketClient.prototype.onmessage = function (event) {
        var data = event.data;
        this.messageList.push(this.decode(data));
    };
    SocketClient.prototype.decode = function (data) {
    };
    SocketClient.prototype.addMessageToProcess = function () {
    };
    // 消息回调接口
    SocketClient.prototype.messageProcess = function (msg) {
        if (!msg) {
            return;
        }
        msg.messageCode = msg.mainType << 8 | msg.subType;
        // 找到 messageCode 注册的 Callback
        var key = msg.messageCode.toString();
        var events = this.eventMaps[key];
        if (events) {
            // invoker回调中有可能会对events进行修改，所以必须等所有回调执行完成之后，才能处理once参数
            var list = [];
            list.push(events);
            events.forEach(function (event) {
                event.invoker.call(event.target, msg);
            });
            // 重新取值
            events = this.eventMaps[key];
            // 排除掉只能执行一次的那些 event
            var keeps = events.filter(function (event) {
                return !event.once;
            });
            this.eventMaps[key] = keeps;
        }
        // //需要跳转到登陆界面的error特殊处理
        // if ((msg.isErrorMessage || (isMutiLogin)) && (!msg.isHandled) && !socketInfo.isDirectToLogin) {
        //
        // }
        // if (!msg.isLog) {
        //   Logger.log('no one process server msg ', msg)
        // }
    };
    return SocketClient;
}(egret.HashObject));
__reflect(SocketClient.prototype, "SocketClient");
