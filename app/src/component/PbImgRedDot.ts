// Button扩展防止多次点击
module Pb{
    export class ImgRedDot extends eui.Image{
        isAdd = false
        constructor(){
            super();              
            this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this)
        }        

        onAddToStage(){
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE,this.onRemove,this)
            this.updateVisible()
            this.touchEnabled = false
            this.isAdd = true
            if (this._signID){
                userData.redDotMgr.registerRedDot(this._signID,this)
            }             
        }

        onRemove(){
            this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this)
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE,this.onRemove,this)
            // if (this._signID == 100){
            //     debugger
            // }
            if (this._signID){
                userData.redDotMgr.unRegisterRedDot(this._signID,this)
            }            
        }

        // public signID:number = 0
        protected _signID:number = 0

        get signID(){
            return this._signID
        }

        set signID(vue){
            //  if (vue == 100){
            //     debugger
            // }           
            if (this._signID){
                userData.redDotMgr.unRegisterRedDot(this._signID,this)
            }
            this._signID = parseInt(<any>vue)
            if (this._signID && this.isAdd){
                userData.redDotMgr.registerRedDot(this._signID,this)
            }
            this.updateVisible()
        }

        protected _isLocked = false
        get isLocked(){
            return this._isLocked
        }

        set isLocked(vue){
            this._isLocked = vue
        }

        setVisibleWithLevel(visible){
            this.visible = (!this.getIsShiled() && visible) ? true : false
        }

        getIsShiled():boolean{
            // return false
            return userData.redDotMgr.isShiled(this.signID)
        }

        getCanHandle():boolean{
            return userData.redDotMgr.isActive(this.signID)
        }

        protected _judgeCb:Function
        protected _judgeTgt:any
        protected _judgeParams:any

        //需要特殊判断的红点设置判断函数
        setJudgeFunc(judgeCb,judgeTgt,judgeParams ?:any){
            this._judgeCb = judgeCb
            this._judgeTgt = judgeTgt
            this._judgeParams = judgeParams
        }

        updateVisible(){
            if (this._isLocked){ return }
            // if (this.signID == 101){
            //     Logger.log("宠物红点")
            // }
            if (this._judgeCb){
                //特殊判断
                this.visible = this._judgeCb.call(this._judgeTgt,this._judgeParams)
            }else{
                //一般判断
                if (this.signID && !this.getIsShiled()){
                    this.visible = this.getCanHandle()
                }else{
                    this.visible = false
                }
            }
        }
    }
}