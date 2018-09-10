// Button扩展防止多次点击
module Pb{
    export class Button extends eui.Button{
        protected _callBack:Function;
        protected _cbTarget;
        protected isActFinish = true;
        protected _data:any;
        labelDisplay:egret.BitmapText;
        imgDisplay:eui.Image;
        _redDot:Pb.ImgRedDot
        actType:number = 0
        // _redDot:Pb.ImgRedDot
        _unlockId:number;
        functionName = ""

        lbl1:eui.Label; //大按钮说明
        imgLabel:eui.Image;

        // 选择宠物大按钮声明
        imgBg:eui.Image;
        imgPet:eui.Image;
        imgFoot:eui.Image;
        imgSelect:eui.Image;
        
        get redDot(){
            return this._redDot
        }

        set redDot(vue){
            this._redDot = vue
            if (this.redDot){
                this.redDot.signID = this._redSignID 
                this.redDot.isLocked = this._redPotLock
            }            
        }

        protected _redSignID:number
        get redSignID(){
            return this._redSignID
        }

        protected _redPotLock = false
        get redLock(){
            return this._redPotLock
        }

        set redLock(vue){
            this._redPotLock = vue
            if (this.redDot){
                this.redDot.isLocked = this._redPotLock
            }
        }

        set redSignID(vue){
            this._redSignID = vue
            if (this.redDot){
                this.redDot.signID = vue
            }
        }

        protected _isImgbtn = false
        set isImgbtn(vue){
            this._isImgbtn = vue
        }

        get isImgbtn(){
            return this._isImgbtn
        }        

        setRedDotVisible(vue){
            if (this.redDot){
                this.redDot.visible = vue
            }
        }

        onCreateComplete(){
            if (this.isImgbtn){
                let Img:eui.Image = <any>this.getChildAt(0)
                if (this.actType == 1 || this.actType == 2){

                }else{
                    this.width = this.width || 65
                    this.height = this.height || 68
                    Img.anchorOffsetX = this.width/2
                    Img.anchorOffsetY = this.height/2
                    Img.horizontalCenter = 0
                    Img.verticalCenter = 0
                }
            }
        }

        getSelectState(){
            if (this.actType == 1){
                return {scaleX:1,scaleY:1,rotation:5}
            }else if (this.actType == 2){
                return {scaleX:1,scaleY:1,rotation:-5}
            }else{
                return {scaleX:1.1,scaleY:1.1,rotation:0}
            }            
        }

        getNormalState(){
            if (this.actType == 1 || this.actType == 2){
                return {scaleX:1,scaleY:1,rotation:0}
            }else{
                return {scaleX:1,scaleY:1,rotation:0}
            }
        }

        invalidateState(){
            super.invalidateState()
            if (this.isImgbtn){
                let Img:eui.Image = <any>this.getChildAt(0)
                // if (this.getCurrentState() == 'down'){
                //     Img.scaleX = Img.scaleY = 1.1
                // }else{
                //     Img.scaleX = Img.scaleY = 1
                // }
                let state = this.getCurrentState() == 'down' ? this.getSelectState() : this.getNormalState()
                ez.setProp(Img,state)
            }
        }
        // getPreferredUWidth(){
        //     var values = this.$UIComponent;
        //     return isNaN(values[8 /* explicitWidth */]) ?
        //         values[16 /* measuredWidth */] : values[8 /* explicitWidth */];
        // };

        // getPreferredUHeight() {
        //     var values = this.$UIComponent;
        //     return isNaN(values[9 /* explicitHeight */]) ?
        //         values[17 /* measuredHeight */] : values[9 /* explicitHeight */];
        // };
        // getPreferredBounds(bounds){
        //     var w = this.getPreferredUWidth();
        //     var h = this.getPreferredUHeight();
        //     bounds.setTo(0, 0, w, h);
        //     if (this.isImgbtn){
        //         let img = this.$children[0]
        //         bounds.setTo(0, 0, img.width, img.height);
        //     }
        //     return bounds
        // }

        constructor(){
            super()
            this.addEventListener(eui.UIEvent.CREATION_COMPLETE,this.onCreateComplete,this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.tryCallBack,this);
            this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this)
           
        }

        private onAddToStage():void
        {
            // if(this._unlockId){
            //     userData.unlockMgr.register(this._unlockId,this);
            // }
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE,this.onRemove,this);
            this.invalidateState()
        }

        private onRemove():void
        {
            // if(this._unlockId){
            //     userData.unlockMgr.unregister(this._unlockId,this);
            // }
            this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this)
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE,this.onRemove,this)
        }

        set unlockId(value)
        {
            this._unlockId = value;
        }

        get unlockId(){
            return this._unlockId
        }

        public flushUnlock(scaleN:number):void
        {
            this.scaleX = this.scaleY = scaleN;
            this.visible = scaleN == 1;
        }

        setCallBack(callBack:Function,cbTarget,data ?:any){
            this._callBack = callBack
            this._cbTarget = cbTarget
            this._data = data
        }

        clearCallBack(){
            this._callBack = undefined
            this._cbTarget = undefined        
            this._data = undefined    
        }

        tryCallBack(){
            if (this.isActFinish && this._callBack){
                if (!this.cost || this.cost.isEnough(true)){
                    this.isActFinish = false
                    this._callBack.call(this._cbTarget,this,this._data)
                }
            }
        }

        finish(){
            this.isActFinish = true
        }
        cost:game.CostNode
        setCostData(costData:game.costObj | game.costObj[]){
            this.cost.setTypeData(costData)
        }        
        
        /**变灰滤镜 */
        public set gray(b:boolean){
            if(b){
                var colorMatrix = [
                    0.3,0.6,0,0,0,
                    0.3,0.6,0,0,0,
                    0.3,0.6,0,0,0,
                    0,0,0,1,0
                ];
				var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
                this.filters = [colorFlilter];
            }else{
                this.filters = null;
            }
        }

        public get gray():boolean
        {
            return !!this.filters;
        }

        public setMenuStatus (value,txt){
            // this.imgDisplay.source = cz.colorMenuBig[value]
            // this.labelDisplay.font = RES.getRes(cz.colorLabel[value]);
            // this.labelDisplay.text = txt
        }

        public updateBtnSource(source){
            let child = this.getChildAt(0)
            if (child instanceof eui.Group && child.numChildren){
                child = child.getChildAt(0)
            }
        }
       
    }
}