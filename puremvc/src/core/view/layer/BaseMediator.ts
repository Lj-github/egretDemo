/**
  * 面板mediator基类
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  * todo:面板特效，全屏+非全屏蒙层
  */
// interface interfaceMsgHandler{
//         registerOnSocketEvent(responseDefine, cb, once ?:boolean);
//         unregisterAllSocket();
//         send(req, control ?:Pb.Button | boolean, isSyncMessage ?:boolean);
//         _sendMessage(req, control, isSyncMessage);
// } 

class msgHandler {
    //消息相关
    registerOnSocketEvent(responseDefine, cb, once?: boolean) {
        //   if !this._messageDefineMap
        //     self.$logger.error("You Should registerOnSocketEvent after BaseLayer.onEnter!!!")
        //     return

        let event_id = responseDefine.MAIN_TYPE << 8 | responseDefine.SUB_TYPE

        //SocketClient.registerOnEvent(responseDefine, cb, this, once)

        //   if !this._messageDefineMap[event_id]
        //     self.$socketClient.registerOnEvent(responseDefine, this.handleAllResponse, this.)
        //     this._messageDefineMap[event_id] = 1
    }

    unregisterAllSocket() {
       // SocketClient.unregisterAllOnTarget(this)
    }
    /*////*
      * 发送Socket请求
      *
      * @param {GameProtocol.Message} req 请求指令
      * @param {cc.ControlButton|CCMenuItem} control 发出指令的按钮，当收到相应反馈后，自动执行对应的finishMenuEvent
      * @param {Boolean} isSyncMessage 是否同步指令，若是，则服务器端反馈的serial则与req.serial一致，若非，则为0 （例如战斗请求）
      *
    //////*/
    send(req, control: boolean, isSyncMessage?: boolean) {
        if (isSyncMessage == undefined) {
            if (control != undefined && control != null && (control == true || control == false)) {
                isSyncMessage = control
            } else {
                isSyncMessage = true
            }
        }
        this._sendMessage(req, control, isSyncMessage)

        if (isSyncMessage) {
            //   this.increaseWaiting(undefined, req.serial)

        }
        return
    }


    _sendMessage(req, control, isSyncMessage) {
        // 由于本次输出 for 循环较多，因此需要判断是否支持 debug 输出
        // let msgClassName = ez.getMessageName(req)
        // 输出到 log

        // SocketClient.send(req, isSyncMessage)
        // // 异步指令，不支持Control
        // if (control) {
        //     if (isSyncMessage) {
        //         SocketClient.addBtnControl(req.serial,control)
        //     } else {
        //         // control.finish()
        //         ez.tryFinishBtn(control)
        //     }
        // }
        // return
    }
}

class  BaseMediator extends puremvc.Mediator implements puremvc.IMediator {
    public isSynClose = false //删除时是否同步删除
    private isInitialized: Boolean = false;//是否初始化
    private isPopUp: Boolean = false;//是否已经显示
    private ui: eui.Component = null;//UI容器
    public w: number = 0;
    public h: number = 0;

    public constructor(mediatorName: string = "", viewComponent: Object = null) {
        super(mediatorName, viewComponent);
        this.w = GameConfig.curWidth();
        this.h = GameConfig.curHeight();
        //一些公共函数的赋值
        this.send = msgHandler.prototype.send
        this._sendMessage = msgHandler.prototype._sendMessage
        this.registerOnSocketEvent = msgHandler.prototype.registerOnSocketEvent
        this.unregisterAllSocket = msgHandler.prototype.unregisterAllSocket

    }

    /**
    * 添加面板方法
    * panel       		面板
    * dark        		背景是否变黑
    * popUpWidth      	指定弹窗宽度，定位使用
    * popUpHeight      	指定弹窗高度，定位使用
    * effectType        0：没有动画 1:从中间轻微弹出 2：从中间猛烈弹出  3：从左向右 4：从右向左 5、从上到下 6、从下到上
    */
    public showUI(ui: eui.Component, dark: boolean = false, popUpWidth: number = 0, popUpHeight: number = 0, effectType: number = 0, isAlert: boolean = false, animationType:number = 0): void {

        this.ui = ui;
        //基本没怎么用
        this.beforShow();
        //添加控件上的文字
        this.initUI();
        //添加控件回调函数 比如按钮
        this.initEvent();
        //添加玩家数值 比如等级经验值相关
        this.initData();
        //是否是黑色背景
        //ui.showDark = dark;
        PopUpManager.addAnimationShow(ui, dark, popUpWidth, popUpHeight, effectType, isAlert, animationType);
        this.afterAddLayer()
    }


	/**
	 * 面板弹出之前处理
	 */
    public beforShow(): void {


    }

	/**
	 * 初始化面板ui
	 */
    public initUI(): void {


    }

    /**初始化面板事件 */
    public initEvent(): void {

    }


	/**
	 * 初始化面板数据
	 */
    public initData(): void {

    }

    afterAddLayer(): void {
        //添加面板之后

    }
    /**
    * 移除面板方法
    * panel       		面板
    * effectType        0：没有动画 1:从中间缩小消失 2：  3：从左向右 4：从右向左 5、从上到下 6、从下到上
    */
    public closePanel(effectType: number = 0): void {

        if (this.ui) {
            PopUpManager.removePopUp(this.ui, effectType, this);
            this.onRemove()
            this.destroy();
            this.ui = undefined
        }
    }

    /*
        移除面板前需要执行的方法
     */
    public beforeRemove(ui?: any) {

    }
	/**
	 * 面板关闭后需要销毁的对象
	 */
    public destroy(): void {
        // userData.gameDefMgr.clearWaitListByTgt(this)
        // EZTopic.unsubscribeAllOnTarget(this)
        // SecTimeCb.unsubscribeAllOnTarget(this)
        this.unregisterAllSocket()
    }


	/**
	 * 面板是否弹出状态
	 */
    public getIsPopUp(): Boolean {

        return this.isPopUp;
    }


	/**
	 * 面板是否初始化完毕
	 */
    public getIsInit(): Boolean {

        return this.isInitialized;
    }

    // 获取面板宽度
    public getWidth(): number {

        return this.ui.width;
    }

    // 获取面板高度
    public getHeight(): number {

        return this.ui.height;
    }


    //消息相关
    registerOnSocketEvent(responseDefine, cb, once?: boolean) {

    }

    unregisterAllSocket() {

    }

    send(req, control: boolean, isSyncMessage?: boolean) {

    }
    _sendMessage(req, control, isSyncMessage) {

    }

    sendNotification(msg: string, body?: any) {

        game.AppFacade.getInstance().sendNotification(msg, body);
    }

    getLayerResAnsyc(cb, cbTarget) {

        //子类以后需要重写的方法,用于获取当前页面的资源,后面要把这个函数注册到表中直接
    }

    getLayerResByOpenMsgAnsyc(openMsg, cb, cbTarget) {

    }



}