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
//用来管理页面的增加和删除
var game;
(function (game) {
    var BaseLayerMediator = (function (_super) {
        __extends(BaseLayerMediator, _super);
        function BaseLayerMediator() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.closeEffect = 0; //关闭特效
            _this.showEffect = 0; //显示特效
            _this.showAnimEffect = 0; //显示动画特效
            //  uConfig = DefContainer.userConfig
            _this.isPreloading = false;
            return _this;
        }
        // public constructor(viewComponent: any = null) {
        //     super(this.mediatorName, viewComponent);
        // }
        // public constructor(mediatorName:string,viewComponent: any = null,openMsg:string,closeMsg:string) {
        //     super(mediatorName, viewComponent);
        //     this.openMessage = openMsg
        //     this.closeMessage = closeMsg
        // }
        //puremvc 调用
        BaseLayerMediator.prototype.listNotificationInterests = function () {
            return [
                this.openMessage,
                this.closeMessage,
            ];
        };
        BaseLayerMediator.prototype.getUILayer = function (body) {
            //子类需要重写
            return new game.BaseLayer();
        };
        BaseLayerMediator.prototype.addUILayer = function (UILayer) {
            // if (!this.uConfig) {
            //     this.uConfig = DefContainer.userConfig
            // }
            this.isPreloading = false;
            this.uiLayer = UILayer;
            if (!this.uiLayer.createComplete) {
                this.uiLayer.addEventListener(eui.UIEvent.COMPLETE, this.doShowUI, this);
            }
            else {
                this.doShowUI();
            }
        };
        BaseLayerMediator.prototype.flushLayerParams = function (data) {
            //根据新传入的参数 重置页面信息
        };
        BaseLayerMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            //Logger.log("mediatorName", this.mediatorName, "received msg:" + notification.getName())
            switch (notification.getName()) {
                case this.openMessage: {
                    //显示面板
                    // if (this.isPreloading){
                    //     console.warn("input the same msg when preloading", notification.getName())
                    //     return
                    // }
                    if (!this.uiLayer) {
                        // this.uiLayer = <any>this.getUILayer(data)
                        this.isPreloading = true;
                        this.getUILayerAnsyc(this.addUILayer, this, data);
                    }
                    else {
                        GameLayerManager.getInstance().recoveryToLayer(this.uiLayer);
                        this.flushLayerParams(data);
                        // Logger.error("已经有同名页面")
                        // return
                    }
                    break;
                }
                case this.closeMessage: {
                    this.closePanel(this.closeEffect);
                    break;
                }
            }
        };
        BaseLayerMediator.prototype.doShowUI = function () {
            //添加到显示层
            this.uiLayer.closeMsg = this.closeMessage;
            this.uiLayer.openMsg = this.openMessage;
            if (this.uiLayer.layerType == game.LayerType.NormalForm) {
                if (this.showEffect == 0) {
                    this.showEffect = 1;
                }
                if (this.showEffect == -1) {
                    this.showEffect = 0;
                }
            }
            this.uiLayer.removeEventListener(eui.UIEvent.COMPLETE, this.doShowUI, this);
            this.showUI(this.uiLayer, true, 0, 0, this.showEffect, undefined, this.showAnimEffect);
        };
        BaseLayerMediator.prototype.initUI = function () {
            _super.prototype.initUI.call(this);
            // if (this.uiLayer) {
            //     let btnNamelist = this.uiLayer.buttonNameList
            //     for (let i in btnNamelist) {
            //         let btnName: string = btnNamelist[i];
            //         if (btnName != "btnExit") {
            //             let callBackname = 'on{0}{1}'.format(btnName[0].toUpperCase(), btnName.substring(1, btnName.length))
            //             if (this[callBackname] && typeof (this[callBackname]) == "function") {
            //                 this.uiLayer[btnName].setCallBack(this[callBackname], this)
            //             }
            //         }
            //     }
            //     let exit = (<any>this.uiLayer).btnExit
            //     if (exit instanceof Pb.Button) {
            //         exit.setCallBack(this.onMenuClose, this)
            //     }
            //     // this.ignorScrollerBar()
            // }
        };
        BaseLayerMediator.prototype.ignorScrollerBar = function () {
            // let children = this.uiLayer.$children
            // for (let k in children){
            //     let child:any = children[k]
            //     if (child.__class__ == "eui.Scroller"){
            //         ez.scrollerDo(child,false)
            //     }
            // }
        };
        BaseLayerMediator.prototype.beforeRemove = function (ui) {
            this.uiLayer = undefined;
            // ez.clearTweenList([this])
            _super.prototype.beforeRemove.call(this);
        };
        BaseLayerMediator.prototype.onMenuClose = function (btn) {
            this.sendNotification(this.returnMessage || this.closeMessage);
        };
        BaseLayerMediator.prototype.publish = function (msg, params) {
            //EZTopic.publish(msg, params, this)
        };
        BaseLayerMediator.prototype.subscribe = function (msg, callback, target) {
            //EZTopic.subscribe(msg, callback, target || this)
        };
        BaseLayerMediator.prototype.loadRes = function (resInfo, cb, cbTarget, hashCode, isHide, priority) {
            if (isHide === void 0) { isHide = false; }
            //EasyResLoad.loadRes(resInfo, cb, cbTarget, hashCode, isHide, priority)
        };
        BaseLayerMediator.prototype.sendLayerSign = function (signAction, signType) {
            // let req = GameProtocol.LayerSignReq.get()
            // req.action = signAction
            // req.type = signAction
            // this.send(req, false)
        };
        BaseLayerMediator.prototype.jumpToProject = function (projectID) {
            //ez.jumpToProject(projectID)
        };
        BaseLayerMediator.prototype.getObjectLength = function (obj) {
            var item;
            var length;
            length = 0;
            for (item in obj) {
                length = length + 1;
            }
            return length;
        };
        BaseLayerMediator.prototype.finishButton = function (bt) {
            //ez.tryFinishBtn(btn)
        };
        BaseLayerMediator.prototype.showDesc = function (params) {
            //game.AppFacade.getInstance().sendNotification(MainNotify.OPEN_FORM_COM_DESC, params)
        };
        return BaseLayerMediator;
    }(BaseMediator));
    game.BaseLayerMediator = BaseLayerMediator;
    __reflect(BaseLayerMediator.prototype, "game.BaseLayerMediator");
})(game || (game = {}));
