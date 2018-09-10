//用来管理页面的增加和删除
module game {
    export class BaseLayerMediator<D extends BaseLayer> extends BaseMediator {
        openMessage: string  //打开消息
        closeMessage: string //关闭消息  可能用于页面的销毁和恢复
        returnMessage:string //恢复上一个页面的消息
        uiLayer: D   //控制的UI类
        closeEffect: number = 0  //关闭特效
        showEffect: number = 0  //显示特效
        showAnimEffect: number = 0 //显示动画特效
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

        getUILayerAnsyc(cb: Function, cbTarget, body?: any) {
            let layer = new BaseLayer()
            cb.call(cbTarget, layer)
        }

        private addUILayer(UILayer) {
          
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
        }

       

        beforeRemove(ui?: any) {
            this.uiLayer = undefined
        }

        onMenuClose(btn?: any) {

        }

        publish(msg: string, params?: any) {
            //EZTopic.publish(msg, params, this)

        }

        subscribe(msg: string, callback: (...args) => any, target?: any) {
           // EZTopic.subscribe(msg, callback, target || this)
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
    }
}