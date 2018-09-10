// TypeScript file
module Pb{
    export class TouchRect extends eui.Rect{
        private _cbTgt = undefined
        private _cb:Function = undefined
        private _params = undefined
        setTouchCb(cb,cbTgt,params = undefined){
            this._cb = cb
            this._cbTgt = cbTgt
            this._params = params
            if (this._cb){
                this.addEventListener(egret.TouchEvent.REMOVED_FROM_STAGE,this.onRemove,this)
                this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.tapCallBack,this)
            }else{
                this.clearTouchInfo()
            }
        }

        onRemove(){
            this.clearTouchInfo()
        }

        tapCallBack(){
            this.tryCallBack()
        }

        tryCallBack(){
            if (this._cb){
                this._cb.call(this._cbTgt,this._params)
            }
        }

        clearTouchInfo(){
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.tapCallBack,this)
            this._cb = this._cbTgt = this._params = undefined
        }
    }
}