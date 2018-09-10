
module Pb {
    export class ItemRenderer extends eui.ItemRenderer {
        createComplete: boolean;
        buttonNameList: Array<string>
        public constructor() {
            super();
            this.createComplete = false;
            this.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
        }

        public createCompleteEvent(event: eui.UIEvent): void {
            this.removeEventListener(eui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
            this.addEventListener(eui.UIEvent.REMOVED_FROM_STAGE, this.onRemove, this);
            this.createComplete = true;
            this.onCreateComplete()
        }

        onCreateComplete() {
            this.dataChanged()
        }


        finishBtn(btn){
            if (btn && btn instanceof Pb.Button){
                btn.finish()
            }
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

        onRemove() {
            EZTopic.unsubscribeAllOnTarget(this)
            SecTimeCb.unsubscribeAllOnTarget(this)
            EasyResLoad.removeByHasCode(this.hashCode)
            if (this.buttonNameList && this.buttonNameList.length > 0) {
                this.buttonNameList.forEach((name) => {
                    if (this[name]) {
                        (<Pb.Button>(this[name])).clearCallBack()
                    }
                })
            }
            this.removeEventListener(eui.UIEvent.REMOVED_FROM_STAGE, this.onRemove, this);
        }
    }
}
