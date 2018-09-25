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
var msgHandler = (function () {
    function msgHandler() {
    }
    //消息相关
    msgHandler.prototype.registerOnSocketEvent = function (responseDefine, cb, once) {
        //   if !this._messageDefineMap
        //     self.$logger.error("You Should registerOnSocketEvent after BaseLayer.onEnter!!!")
        //     return
        var event_id = responseDefine.MAIN_TYPE << 8 | responseDefine.SUB_TYPE;
        //SocketClient.registerOnEvent(responseDefine, cb, this, once)
        //   if !this._messageDefineMap[event_id]
        //     self.$socketClient.registerOnEvent(responseDefine, this.handleAllResponse, this.)
        //     this._messageDefineMap[event_id] = 1
    };
    msgHandler.prototype.unregisterAllSocket = function () {
        // SocketClient.unregisterAllOnTarget(this)
    };
    /*////*
      * 发送Socket请求
      *
      * @param {GameProtocol.Message} req 请求指令
      * @param {cc.ControlButton|CCMenuItem} control 发出指令的按钮，当收到相应反馈后，自动执行对应的finishMenuEvent
      * @param {Boolean} isSyncMessage 是否同步指令，若是，则服务器端反馈的serial则与req.serial一致，若非，则为0 （例如战斗请求）
      *
    //////*/
    msgHandler.prototype.send = function (req, control, isSyncMessage) {
        if (isSyncMessage == undefined) {
            if (control != undefined && control != null && (control == true || control == false)) {
                isSyncMessage = control;
            }
            else {
                isSyncMessage = true;
            }
        }
        this._sendMessage(req, control, isSyncMessage);
        if (isSyncMessage) {
            //   this.increaseWaiting(undefined, req.serial)
        }
        return;
    };
    msgHandler.prototype._sendMessage = function (req, control, isSyncMessage) {
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
    };
    return msgHandler;
}());
__reflect(msgHandler.prototype, "msgHandler");
var BaseMediator = (function (_super) {
    __extends(BaseMediator, _super);
    function BaseMediator(mediatorName, viewComponent) {
        if (mediatorName === void 0) { mediatorName = ""; }
        if (viewComponent === void 0) { viewComponent = null; }
        var _this = _super.call(this, mediatorName, viewComponent) || this;
        _this.isSynClose = false; //删除时是否同步删除
        _this.isInitialized = false; //是否初始化
        _this.isPopUp = false; //是否已经显示
        _this.ui = null; //UI容器
        _this.w = 0;
        _this.h = 0;
        _this.w = GameConfig.curWidth();
        _this.h = GameConfig.curHeight();
        //一些公共函数的赋值
        _this.send = msgHandler.prototype.send;
        _this._sendMessage = msgHandler.prototype._sendMessage;
        _this.registerOnSocketEvent = msgHandler.prototype.registerOnSocketEvent;
        _this.unregisterAllSocket = msgHandler.prototype.unregisterAllSocket;
        return _this;
    }
    /**
    * 添加面板方法
    * panel       		面板
    * dark        		背景是否变黑
    * popUpWidth      	指定弹窗宽度，定位使用
    * popUpHeight      	指定弹窗高度，定位使用
    * effectType        0：没有动画 1:从中间轻微弹出 2：从中间猛烈弹出  3：从左向右 4：从右向左 5、从上到下 6、从下到上
    */
    BaseMediator.prototype.showUI = function (ui, dark, popUpWidth, popUpHeight, effectType, isAlert, animationType) {
        if (dark === void 0) { dark = false; }
        if (popUpWidth === void 0) { popUpWidth = 0; }
        if (popUpHeight === void 0) { popUpHeight = 0; }
        if (effectType === void 0) { effectType = 0; }
        if (isAlert === void 0) { isAlert = false; }
        if (animationType === void 0) { animationType = 0; }
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
        this.afterAddLayer();
    };
    /**
     * 面板弹出之前处理
     */
    BaseMediator.prototype.beforShow = function () {
    };
    /**
     * 初始化面板ui
     */
    BaseMediator.prototype.initUI = function () {
    };
    /**初始化面板事件 */
    BaseMediator.prototype.initEvent = function () {
    };
    /**
     * 初始化面板数据
     */
    BaseMediator.prototype.initData = function () {
    };
    BaseMediator.prototype.afterAddLayer = function () {
        //添加面板之后
    };
    /**
    * 移除面板方法
    * panel       		面板
    * effectType        0：没有动画 1:从中间缩小消失 2：  3：从左向右 4：从右向左 5、从上到下 6、从下到上
    */
    BaseMediator.prototype.closePanel = function (effectType) {
        if (effectType === void 0) { effectType = 0; }
        if (this.ui) {
            PopUpManager.removePopUp(this.ui, effectType, this);
            this.onRemove();
            this.destroy();
            this.ui = undefined;
        }
    };
    /*
        移除面板前需要执行的方法
     */
    BaseMediator.prototype.beforeRemove = function (ui) {
    };
    /**
     * 面板关闭后需要销毁的对象
     */
    BaseMediator.prototype.destroy = function () {
        // userData.gameDefMgr.clearWaitListByTgt(this)
        // EZTopic.unsubscribeAllOnTarget(this)
        // SecTimeCb.unsubscribeAllOnTarget(this)
        this.unregisterAllSocket();
    };
    /**
     * 面板是否弹出状态
     */
    BaseMediator.prototype.getIsPopUp = function () {
        return this.isPopUp;
    };
    /**
     * 面板是否初始化完毕
     */
    BaseMediator.prototype.getIsInit = function () {
        return this.isInitialized;
    };
    // 获取面板宽度
    BaseMediator.prototype.getWidth = function () {
        return this.ui.width;
    };
    // 获取面板高度
    BaseMediator.prototype.getHeight = function () {
        return this.ui.height;
    };
    //消息相关
    BaseMediator.prototype.registerOnSocketEvent = function (responseDefine, cb, once) {
    };
    BaseMediator.prototype.unregisterAllSocket = function () {
    };
    BaseMediator.prototype.send = function (req, control, isSyncMessage) {
    };
    BaseMediator.prototype._sendMessage = function (req, control, isSyncMessage) {
    };
    BaseMediator.prototype.sendNotification = function (msg, body) {
        game.AppFacade.getInstance().sendNotification(msg, body);
    };
    BaseMediator.prototype.getLayerResAnsyc = function (cb, cbTarget) {
        //子类以后需要重写的方法,用于获取当前页面的资源,后面要把这个函数注册到表中直接
    };
    BaseMediator.prototype.getLayerResByOpenMsgAnsyc = function (openMsg, cb, cbTarget) {
    };
    return BaseMediator;
}(puremvc.Mediator));
__reflect(BaseMediator.prototype, "BaseMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
