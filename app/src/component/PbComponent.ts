//预计封装监听函数，触摸，添加与删除等
module Pb {
    export class Component extends eui.Component {
        public showDark: boolean = false
        createComplete: boolean = false
        buttonNameList = [];
        uConfig = DefContainer.userConfig
        shiledTouch: boolean = false  //是否屏蔽所有触摸(包括子节点)

        constructor() {
            super();
            //一些公共函数的赋值
            this.send = msgHandler.prototype.send
            this._sendMessage = msgHandler.prototype._sendMessage
            this.registerOnSocketEvent = msgHandler.prototype.registerOnSocketEvent
            this.unregisterAllSocket = msgHandler.prototype.unregisterAllSocket
            // this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this)

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


        loadRes(resInfo, cb: Function, cbTarget, isHide = false, priority?: number) {

            EasyResLoad.loadRes(resInfo, cb, cbTarget, this.hashCode, isHide, priority)
        }

        tryAfterCreateAndAddFinish() {

            if (this.parent && this.createComplete) {
                this.aferCreateAndAddFinish()
            }
        }

        aferCreateAndAddFinish() {

        }

        onAddToStage() {

            // this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this)
            // this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this)
            this.tryAfterCreateAndAddFinish()
            // Logger.log(this.buttonNameList)
            // this.buttonNameList.forEach((name)=>{
            //     if (this[name]){
            //         // (<Pb.Button>(this[name])).clearCallBack()
            //         let button = (<Pb.Button>(this[name]))
            //         button.scaleX = button.scaleX
            //         button.scaleY = button.scaleY
            //     }
            // },this)            
        }

        registerBadImg(){
            let list = []
            for (let i = 0; i < 7;i++){
                list.push('ty_bad{0}_png'.format(i+1))
            }
            this.registerResList(list)
        }

        registerLightSide(){
            let list = []
            for (let i = 0; i < 6;i++){
                list.push(cz.lightBorder.format(i+1))
            }            
            this.registerResList(list)
        }

        onRemove() {
            ez.clearTweenList([this])
            // this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this)
            SocketClient.unregisterAllOnTarget(this)
            EasyResLoad.removeByHasCode(this.hashCode)
            EZTopic.unsubscribeAllOnTarget(this)
            SecTimeCb.unsubscribeAllOnTarget(this)
            this.buttonNameList.forEach((name) => {
                if (this[name]) {
                    (<Pb.Button>(this[name])).clearCallBack()
                }
            })
        }

        //消息相关
        registerOnSocketEvent(responseDefine, cb, once?: boolean) {

        }

        unregisterAllSocket() {

        }

        send(req, control?: Pb.Button | boolean, isSyncMessage?: boolean) {

        }
        _sendMessage(req, control, isSyncMessage) {

        }

        registerVipAndDuanwei(){
            
        }

        registerResSingle(key) {

            EasyResLoad.registerResSingle(key, this.hashCode)
        }

        unRegisterResSingle(key: string) {

            EasyResLoad.unRegisterResByHashCode(this.hashCode, [key])
        }

        unRegisterResList(keyList) {

            EasyResLoad.unRegisterResByHashCode(this.hashCode, keyList)
        }

        registerResList(keyList: string[]) {

            EasyResLoad.registerRes(keyList, this.hashCode)
        }

        registerResBySkinPath(skinPath: string) {

            EasyResLoad.registerResBySkinPath(skinPath, this.hashCode)
        }

        sendNotification(msg: string, body?: any) {

            game.AppFacade.getInstance().sendNotification(msg, body);
        }

        finishButton(btn: Pb.Button) {
            ez.tryFinishBtn(btn)
        }
    }
}