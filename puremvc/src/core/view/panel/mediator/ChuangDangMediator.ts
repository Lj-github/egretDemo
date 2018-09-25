/**
  * 背包面板
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class ChuangDangMediator extends BaseLayerMediator<ChuangDangPanel> {
        public static NAME: string = "ChuangDangMediator";
        public constructor(viewComponent: any = null) {
            super(ChuangDangMediator.NAME, viewComponent);
            this.openMessage = MainNotify.OPEN_ROLE;
			this.closeMessage = MainNotify.CLOSE_ROLE;
        }
        getUILayerAnsyc(cb: Function, cbTarget, body?: any){
            let layer = new ChuangDangPanel();
            layer.layerType = LayerType.NormalForm
            cb.call(cbTarget,layer)
        }

        public initUI(): void {
            super.initUI()
            this.uiLayer.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeButtonClick, this);
        }


        private closeButtonClick(event: egret.TouchEvent): void {
            this.closePanel(1);
        }
    }
}