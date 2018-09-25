//与mediator绑定的页面
module game {
    export class BaseLayer extends Pb.Component {
        createComplete: boolean = false
        shiledTouch: boolean = false  //是否屏蔽所有触摸(包括子节点)
        constructor() {
            super();
            //一些公共函数的赋值
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this)

        }
        $hitTest(stageX, stageY) {
            return this.shiledTouch ? undefined : super.$hitTest(stageX, stageY)
        }
        $onAddToStage(stage: egret.Stage, nestLevel: number){
            this.onAddToStage()
            super.$onAddToStage(stage,nestLevel)
        }
        $onRemoveFromStage(){
            this.onRemove()
            super.$onRemoveFromStage()
        }

        tryAfterCreateAndAddFinish() {
            if (this.parent && this.createComplete) {
                this.aferCreateAndAddFinish()
            }
        }
        aferCreateAndAddFinish() {

        }
        onAddToStage() {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this)
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this)
            this.tryAfterCreateAndAddFinish()

        }
        publish(msg:string,params?:any){

        } 
        subscribe(msg:string,callback: (...args) => any){
        }
        afterCreateComplete() {

        }
        onCreateComplete() {
            this.createComplete = true
            this.removeEventListener(eui.UIEvent.COMPLETE, this.onCreateComplete, this);
            this.afterCreateComplete()
            this.tryAfterCreateAndAddFinish()
        }
        onRemove(){



        }
    }
}