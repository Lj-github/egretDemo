/**
  * 背包面板
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class BackpackMediator extends BaseLayerMediator<BackpackPanel> {
        public static NAME: string = "BackpackMediator";
        data :any

        public constructor(viewComponent: any = null) {
            super(BackpackMediator.NAME, viewComponent);
            this.openMessage = MainNotify.OPEN_MAIN;
			this.closeMessage = MainNotify.CLOSE_MAIN;
        }

        /**
         * 初始化面板ui
         */
        public initUI(): void {
            super.initUI()
            this.uiLayer.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeButtonClick, this);
            this.uiLayer.readProxy.addEventListener(egret.TouchEvent.TOUCH_TAP, this.readProxyButtonClick, this);
            this.uiLayer.saveProxy.addEventListener(egret.TouchEvent.TOUCH_TAP, this.saveProxyButtonClick, this);
        }
        getUILayerAnsyc(cb: Function, cbTarget, body?: any){
            this.data = body
            let layer = new BackpackPanel();
            layer.layerType = LayerType.NormalForm
            cb.call(cbTarget,layer)
        }

        /**
         * 初始化面板数据
         */
        public initData(): void {

        }

        private saveProxyButtonClick(event: egret.TouchEvent): void {
            P.getGameDataProxy().setGameName(this.uiLayer.input1.text);
            this.uiLayer.showText.text += "保存成功...\n" + P.getGameDataProxy().getGameName() + "\n";
        }
        private readProxyButtonClick(event: egret.TouchEvent): void {
            this.uiLayer.showText.text += P.getGameDataProxy().getGameName() + "\n";

        }
        private closeButtonClick(event: egret.TouchEvent): void {
            this.closePanel(1);
        }
    }
}