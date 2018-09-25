//用来管理页面的增加和删除
module game {
     export abstract class BaseLayerMediator<D extends BaseLayer> extends BaseMediator {
        openMessage: string  //打开消息
        closeMessage: string //关闭消息  可能用于页面的销毁和恢复
        returnMessage:string //恢复上一个页面的消息
        uiLayer: D   //控制的UI类
        closeEffect: number = 0  //关闭特效
        showEffect: number = 0  //显示特效
        showAnimEffect: number = 0 //显示动画特效
      //  uConfig = DefContainer.userConfig
        isPreloading:boolean = false
        // public constructor(viewComponent: any = null) {
        //     super(this.mediatorName, viewComponent);
        // }
        // public constructor(mediatorName:string,viewComponent: any = null,openMsg:string,closeMsg:string) {
        //     super(mediatorName, viewComponent);
        //     this.openMessage = openMsg
        //     this.closeMessage = closeMsg
        // }
        //puremvc 调用
        public listNotificationInterests(): Array<any> {
            return [
                this.openMessage,
                this.closeMessage,
            ];
        }

        getUILayer(body?: any): BaseLayer {
            //子类需要重写
            return new BaseLayer()
        }

        public abstract getUILayerAnsyc(...para):void;

        private addUILayer(UILayer) {
            // if (!this.uConfig) {
            //     this.uConfig = DefContainer.userConfig
            // }
            this.isPreloading = false
            this.uiLayer = UILayer

            if (!this.uiLayer.createComplete) {
                this.uiLayer.addEventListener(eui.UIEvent.COMPLETE, this.doShowUI, this);
            } else {
                this.doShowUI()
            }
        }

        flushLayerParams(data) {
            //根据新传入的参数 重置页面信息
        }

        public handleNotification(notification: puremvc.INotification): void {

            var data: any = notification.getBody();
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
                        this.isPreloading = true
                        this.getUILayerAnsyc(this.addUILayer, this, data)
                    } else {
                        GameLayerManager.getInstance().recoveryToLayer(this.uiLayer)
                        this.flushLayerParams(data)
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
        }

        public doShowUI() {

            //添加到显示层
            this.uiLayer.closeMsg = this.closeMessage
            this.uiLayer.openMsg = this.openMessage
            if (this.uiLayer.layerType == game.LayerType.NormalForm) {
                if (this.showEffect == 0) {
                    this.showEffect = 1
                }
                if (this.showEffect == -1) {
                    this.showEffect = 0
                }

            }
            this.uiLayer.removeEventListener(eui.UIEvent.COMPLETE, this.doShowUI, this)
            this.showUI(this.uiLayer, true, 0, 0, this.showEffect, undefined, this.showAnimEffect);


        }



        public initUI(): void {
            super.initUI()
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
        }

        ignorScrollerBar()
        {
            // let children = this.uiLayer.$children
            // for (let k in children){
            //     let child:any = children[k]
            //     if (child.__class__ == "eui.Scroller"){
            //         ez.scrollerDo(child,false)
            //     }
            // }
        }

        beforeRemove(ui?: any) {
            this.uiLayer = undefined
            // ez.clearTweenList([this])
            super.beforeRemove()
        }

        onMenuClose(btn?: any) {

            this.sendNotification(this.returnMessage || this.closeMessage)
        }

        publish(msg: string, params?: any) {
            //EZTopic.publish(msg, params, this)

        }

        subscribe(msg: string, callback: (...args) => any, target?: any) {
            //EZTopic.subscribe(msg, callback, target || this)
        }

        loadRes(resInfo, cb: Function, cbTarget, hashCode, isHide = false, priority?: number) {

            //EasyResLoad.loadRes(resInfo, cb, cbTarget, hashCode, isHide, priority)
        }

        sendLayerSign(signAction, signType) {

            // let req = GameProtocol.LayerSignReq.get()
            // req.action = signAction
            // req.type = signAction
            // this.send(req, false)
        }

        jumpToProject(projectID) {
            //ez.jumpToProject(projectID)
        }
        getObjectLength(obj: any) {
            let item;
            let length: number;
            length = 0;
            for (item in obj) {
                length = length + 1;
            }
            return length;
        }
        finishButton(bt) {
            //ez.tryFinishBtn(btn)
        }

        showDesc(params) {
            //game.AppFacade.getInstance().sendNotification(MainNotify.OPEN_FORM_COM_DESC, params)
        }



        

    }
}