//与mediator绑定的页面
module game {
    export enum LayerType {
        Scene = 1, //全屏页面比如挂机、战斗、迷宫、抓宠、道馆、铁拳等
        MainLayer, //全屏页面上居中的那一部分 会根据当前显示scene的group来判断是否显示
        HomeBar,//下边栏
        TopBar,//上边栏
        FirstLayer, //第一个layer会把其他layer删掉
        NormalLayer,
        NormalForm,
        Dialog,
        Effect,//特想层
        Guide,  //引导层
    }

    export enum FocusHomeType{
        Guaji = 0,
        HomeCity = 1,   
    }
    export class BaseLayer extends Pb.Component {
        // skinNamePath:string
        closeMsg: string = undefined //用于页面的关闭与开启
        openMsg: string = undefined
        hideMsg: string = undefined   //隐藏页面的消息暂时预留
        protected _showCommonBanner = true
        showHomeBar:boolean = true
        protected _layerType: LayerType = LayerType.NormalLayer
        sceneMap: any  = undefined;
        isDelayBake:boolean
        isBottomForm:boolean
        constructor() {
            super()
            this.addEventListener(eui.UIEvent.COMPLETE, this.onCreateComplete, this);
            let skinPath = this.getSkinPath()
            if (skinPath && skinPath.length > 0) {
                this.skinName = skinPath
                this.registerResBySkinPath(skinPath)
            } else {
                this.onCreateComplete()
            }
          
            this.tryUpdateGuajiState()
        }

        $onAddToStage(stage: egret.Stage, nestLevel: number){
      
            super.$onAddToStage(stage,nestLevel)
        }

        $onRemoveFromStage(){
            super.$onRemoveFromStage()
        }


        private resizeCb
        private resizeTgt
        //resize 处理可以自己传入函数也可以自己重载adjustPos
        addResizeHandle(resizeCb?: Function, resizeTgt?: any) {
            this.adjustPos()
        }

        onResizeDelay() {

            egret.setTimeout(function () {
                this.adjustPos()
            }, this, 1)
        }

        adjustPos() {

            if (this.resizeCb) {
                this.resizeCb.call(this.resizeTgt)
            }
        }

        onRemove() {
          
            super.onRemove()
        }


        publish(msg:string,params?:any){
           // EZTopic.publish(msg,params,this)
            
        } 
          
        subscribe(msg:string,callback: (...args) => any){
           //EZTopic.subscribe(msg,callback,this)
        }

        set layerType(layerType) {
            this._layerType = layerType
        }
        
        get layerType() {

            return this._layerType
        }

        get isFirstLayer() {

            return this._layerType == LayerType.FirstLayer
        }

        set showCommonBanner(vue){
            this._showCommonBanner = vue
        }

        get showCommonBanner(){
            return this._showCommonBanner
        }

        getSkinPath(): string {

            return ''
        }
        afterCreateComplete() {

        }
        onCreateComplete() {
            this.createComplete = true
            this.removeEventListener(eui.UIEvent.COMPLETE, this.onCreateComplete, this);
            this.afterCreateComplete()
            this.tryAfterCreateAndAddFinish()
        }


      

        
    }
}