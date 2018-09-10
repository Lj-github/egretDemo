// TypeScript file
// Button扩展防止多次点击
module Pb {
    export class RecycleEfc extends eui.Image {
        protected cb:Function
        protected cbTgt:any
        constructor(focusIcon ?:eui.Image,cb ?:Function,cbTgt ?:any,scale = 1) {
            super();
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this)
            this.cb = cb
            this.cbTgt = cbTgt
            if (focusIcon){
                this.initByIconFocus(focusIcon)
            }
            this.source = 'zbfj_tu_png'
        }

        onAddToStage() {
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this)
            this.showAction()
            this.touchEnabled = false
        }

        protected initByIconFocus(focusIcon:eui.Image){
            if (focusIcon){
                this.scaleX = this.scaleY = focusIcon.scaleX
                this.x = focusIcon.x 
                this.y = focusIcon.y
                this.horizontalCenter = focusIcon.horizontalCenter
                this.verticalCenter = focusIcon.verticalCenter
                focusIcon.parent.addChild(this)
            }
        }

        onRemove() {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this)
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this)
            egret.Tween.removeTweens(this)
            this.cb = this.cbTgt = undefined
        }

        tryCallBack(){
            let cb = this.cb
            let cbTgt = this.cbTgt
            this.cb = this.cbTgt = undefined
            if (cb){
                cb.call(cbTgt)
            }
        }
        showAction() {
            let scale = this.scaleX
            egret.Tween.get(this)
                .to({scaleX:scale,scaleY:scale,rotation:240},cz.fTimes.fps24*3)
                .to({scaleX:scale*2,scaleY:scale*2,alpha:0,rotation:480},cz.fTimes.fps24*3)
                .call(this.tryCallBack,this)
                .call(()=>{
                    if (this.parent){
                        this.parent.removeChild(this)
                    }
                },this)
        }

    }
}