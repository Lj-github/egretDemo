//椭圆列表的管理类
module Pb {
    export class PbOvalList extends Pb.Component {
        protected _centerIndex: number = 0
        protected _dataArray: Array<any> = []
        protected _angleArray: Array<number> = [270]
        protected _flushFunc: Function
        protected _moveEndTopic:string  //移动结束时触发
        protected _touchCenterTopic:string  //中间被点击时触发
        protected _touchMoveTopic:string
        protected _flushTarget: any
        protected _isActing = false
        protected _ovalHonRadius = 155
        protected _ovalVerRadius = 31
        protected _scaleMax: number = 1
        protected _scaleMin: number = 1
        circle = true //是否循环滑动
        hideTop = false
        coverNode:egret.DisplayObject
        constructor() {
            super()
        }

        onRemove(){
             
            this.removeSliderChange()      
            super.onRemove()
        }
        public get scaleMax(): number {
            return this._scaleMax;
        }

        public set scaleMax(v: number) {
            this._scaleMax = v;
        }

        public get scaleMin(): number {
            return this._scaleMin;
        }

        public set scaleMin(v: number) {
            this._scaleMin = v;
        }


        public get ovalHonRadius(): number {
            return this._ovalHonRadius;
        }

        public set ovalHonRadius(v: number) {
            this._ovalHonRadius = v;
        }

        public get ovalVerRadius(): number {
            return this._ovalVerRadius;
        }
        public set ovalVerRadius(v: number) {
            this._ovalVerRadius = v;
        }

        leftOneCell(time: number) {
            this.updateCIndex(-1, time)
        }

        tryFlushBeforeCenterMove(centerIndex,centerIndexNext){
            if (centerIndex != centerIndexNext){
                let event = new Pb.event(Pb.event.OvalBeforeMoveToNext)
                event.params = [centerIndex,centerIndexNext]
                this.dispatchEvent(event)
            }
        }

        updateCIndex(updateDelta, time) {
            if (this._isActing) {
                return
            }
            if (!this.circle){
                let nextAbs = (this.centerIndex + updateDelta)
                if  (nextAbs >= this.dataArray.length || nextAbs < 0){
                    return
                } 
            }
            this._isActing = true
            this.flushNextOrder(updateDelta)
            let cIndex = (this.centerIndex + updateDelta + this.dataArray.length) % this.dataArray.length
            this.tryFlushBeforeCenterMove(this.centerIndex,cIndex)
            let cellList = this.$children.filter((child) => {
                return child != this.coverNode
            })
            // this.centerIndex = cIndex
            cellList.forEach((cell: Pb.DisplayObjectContainer, idx) => {
                let indexBefore = cell.ovalIndex
                let index = (indexBefore - updateDelta) % this.angArray.length
                if (index < 0) {
                    index += this.angArray.length
                }
                cell.ovalIndex = index
                this.setCellGrev(cell)
                let rotationTgt = this.angArray[index]
                cell.ovalRotation = (cell.ovalRotation + 360)%360
                let deltaRotation = rotationTgt - cell.ovalRotation
                if (deltaRotation*updateDelta > 0){
                    if (updateDelta > 0){
                        rotationTgt -= 360
                    }else{
                        rotationTgt += 360
                    }
                }
                // Logger.log("cell rot:", cell.ovalRotation, 'next:', rotationTgt, "indexBefore", indexBefore, "index", index)
                // if (Math.abs(cell.ovalRotation - rotationTgt) > 180) {
                //     if (cell.ovalRotation < rotationTgt) {
                //         cell.ovalRotation += 360
                //     } else {
                //         cell.ovalRotation -= 360
                //     }
                // }
                // let deltaRotation = cell.ovalRotation

                let scale = this.getScaleByAng(rotationTgt)
                if (idx == 0) {
                    egret.Tween.get(cell)
                        .to({ovalRotation: rotationTgt,
                            scaleX: scale,
                            scaleY: scale}
                            , time)
                        .call(() => {
                            this.centerIndex = cIndex
                            this.flushList()
                            this._isActing = false
                        }, this)
                        .call(this.onMoveEnd,this)
                } else {
                    egret.Tween.get(cell)
                        .to({ovalRotation: rotationTgt,
                            scaleX: scale,
                            scaleY: scale}
                            , time)
                }
                // let oldIdx = this.getDataIndexByOvalIndex(cell.ovalIndex)
                // let newIdx = (oldIdx - updateDelta + this.dataArray.length)%this.dataArray.length
            })
            let cnt = Math.floor(time/100)
            let tween = egret.Tween.get(this)
            for (let i = 0; i < cnt;i ++){
                tween.wait(100).call(this.flushChildZorder,this)
                if (i == 0){
                    tween.call(this.onMoveEnd,this)
                }
            }
        }

        rightOneCell(time: number) {
            this.updateCIndex(1, time)
        }

        get isActing() {
            return this._isActing
        }

        set isActing(vue) {
            this._isActing = vue
        }

        set centerIndex(v: number) {
            this._centerIndex = v
        }

        get centerIndex(): number {
            return this._centerIndex
        }

        set dataArray(v: Array<any>) {
            this._dataArray = v
        }

        get dataArray() {
            return this._dataArray
        }

        set angArray(v: Array<number>) {
            this._angleArray = v
        }

        get angArray() {
            return this._angleArray
        }

        setFlushFunc(flushFunc: Function, flushTarget: any,moveEndTopic  = '',touchCenterTopic = '',touchMoveTopic = '') {
            this._flushFunc = flushFunc
            this._flushTarget = flushTarget
            this._moveEndTopic = moveEndTopic
            this._touchCenterTopic = touchCenterTopic
            this._touchMoveTopic = touchMoveTopic
        }

        onMoveEnd(){
            // EZTopic.publish(this._moveEndTopic)
            this.trySendTopic(this._moveEndTopic)
        }
        trySendTopic(topic,params = undefined){
            if (topic){
                EZTopic.publish(topic,params)
            }
        }

        onCellTouch(cell:Pb.DisplayObjectContainer){
            if (this.isActing){
                return
            }            
            let dataIndex = this.getDataIndexByOvalIndex(cell.ovalIndex)
            let delta = dataIndex - this.centerIndex
            if (delta == 0){
                // EZTopic.publish(this._touchCenterTopic,cell)
                this.trySendTopic(this._touchCenterTopic,cell)
            }else{
                if (Math.abs(delta) > this.dataArray.length/2){
                    if (delta > 0){
                        delta -= this.dataArray.length
                    }else{
                        delta += this.dataArray.length
                    }
                }            
                // Logger.log('deltaEnd:',delta)
                let deltaAbs = Math.abs(delta)
                this.updateCIndex(delta,400*Math.sqrt(deltaAbs)) 
                this.trySendTopic(this._touchMoveTopic,this.dataArray[dataIndex])
            }
            // Logger.log('deltaStart:,index,cIndex,oIndex',delta,dataIndex,this.centerIndex,cell.ovalIndex)
        }

        initList(coverNode ?:egret.DisplayObject) {
            if (!this._flushFunc) {
                dialog.showOnlyText(LC.Common.NoCbFunc)
                return
            }
            if (this.dataArray.length < this.angArray.length) {
                Logger.error("Error:角度列表长度大于数据长度")
            }
            this.removeChildren()
            for (let i = 0; i < this.angArray.length; i++) {
                let cell = new Pb.DisplayObjectContainer()
                cell.width = cell.height = 0
                this.addChild(cell)
                cell.ovalHonRadius = this.ovalHonRadius
                cell.ovalVerRadius = this.ovalVerRadius
                cell.ovalRotation = this.angArray[i]
                cell.ovalIndex = i
                let dataIndex = this.getDataIndexByOvalIndex(i)
                this.setCellGrev(cell)
                cell.setTouchCb(this.onCellTouch,this,cell)
                this._flushFunc.call(this._flushTarget, this.dataArray[dataIndex], cell, dataIndex)
                let scale = this.getScaleByAng(cell.ovalRotation)
                cell.scaleX = scale
                cell.scaleY = scale
            }
            this.coverNode = coverNode
            if (coverNode){
                this.addChild(coverNode)
            }
            this.flushChildZorder(true)
        }

        getSelectItem():Pb.DisplayObjectContainer{
            for (let child of this.$children){
                if (child != this.coverNode && (<any>child).ovalIndex == 0){
                    return <any>child
                }
            }
        }

        getSelectData(){
            return this.dataArray[this._centerIndex]
        }

        getDataIndexByOvalIndex(ovalIndex) {
            if (ovalIndex > this.angArray.length / 2) {
                ovalIndex = ovalIndex - this.angArray.length
            }
            let index = ovalIndex + this.centerIndex
            index = index % this.dataArray.length
            if (index < 0) {
                index += this.dataArray.length
            }
            return index
        }

        setCellGrev(cell: Pb.DisplayObjectContainer) {
            cell.filters = this.getFilterByCell(cell)
        }
        getFilterByCell(cell: Pb.DisplayObjectContainer){
            let diff = Math.abs(cell.ovalIndex)
            if (cell.ovalIndex > this.angArray.length / 2) {
                diff = this.angArray.length - cell.ovalIndex
            }
            let grayV = 1 - 0.8 * diff / (this.angArray.length / 2)
            if (grayV != 1) {
                return  [ez.getGrayFilters(grayV)]
            } else {
                return  []
            }
        }

        getNextRoation(cell, updateDelta) {
            let indexBefore = cell.ovalIndex
            let index = (indexBefore - updateDelta) % this.angArray.length
            if (index < 0) {
                index += this.angArray.length
            }
            let rotationTgt = this.angArray[index]
            return rotationTgt
        }

        getScaleByAng(ang) {
            let diff = this.getAngDiff(ang, 270)
            let scale = this.scaleMax - (this.scaleMax - this.scaleMin) * (Math.abs(diff) / 180)
            return scale
        }

        getAngDiff(ang1, ang2) {
            let delta = Math.abs(ang1 - ang2)
            if (delta > 180){
                delta = 360 - delta
            }
            return delta
        }

        flushNextOrder(updateDelta) {
            // let childrenList = this.$children.filter(()=>{
            //     return true
            // })
            // childrenList = childrenList.sort((a:Pb.DisplayObjectContainer,b:Pb.DisplayObjectContainer)=>{
            //     // return Math.abs(b.ovalRotation - 270) - Math.abs(a.ovalRotation - 270)
            //     // return Math.abs(this.getNextRoation(b,updateDelta) - 270) - Math.abs(this.getNextRoation(a,updateDelta)- 270)
            //     return a.y - b.y
            // })
            // this.removeChildren()
            // childrenList.forEach((child:Pb.DisplayObjectContainer)=>{
            //     this.addChild(child)
            // },this)
        }

        flushChildZorder(needFlushShow = false) {
            let childrenList = this.$children.filter((child) => {
                return child != this.coverNode
            })
            childrenList = childrenList.sort((a: Pb.DisplayObjectContainer, b: Pb.DisplayObjectContainer) => {
                return a.y - b.y
            })

            childrenList.forEach((child: Pb.DisplayObjectContainer,idx) => {
                if (needFlushShow){
                    //调用每个函数的刷新函数
                    let dataIndex = this.getDataIndexByOvalIndex(child.ovalIndex)
                    this._flushFunc.call(this._flushTarget, this.dataArray[dataIndex], child, dataIndex)  
                    let hide = false 
                    let delta = Math.abs(dataIndex - this.centerIndex) 
                    if (!this.circle){
                        hide = hide || delta > this.angArray.length/2 
                    }
                    if (this.hideTop){
                        hide = hide || (delta == Math.floor((this.angArray.length + 1)/2) || (delta == (this.angArray.length - Math.floor((this.angArray.length + 1)/2))))
                    }
                    child.visible = !hide
                }
                this.setChildIndex(child,idx)
            }, this)
            if (this.coverNode){
                this.setChildIndex(this.coverNode,this.numChildren - 2)
            }
        }

        flushList() {
            if (this.dataArray.length < this.angArray.length) {
                Logger.error("Error:角度列表长度大于数据长度")
            }
            this.flushChildZorder(true)
        }


        /**滑动切换相关 start*/
        addSliderChange(){
            ez.getStage().addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouchBegan,this)
            ez.getStage().addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onTouchMove,this)
            ez.getStage().addEventListener(egret.TouchEvent.TOUCH_END,this.onTouchEnd,this)            
        }
        removeSliderChange(){
            ez.getStage().removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouchBegan,this)
            ez.getStage().removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.onTouchMove,this)
            ez.getStage().removeEventListener(egret.TouchEvent.TOUCH_END,this.onTouchEnd,this)            
        }
        prePos:ez.Pos
        moveDis:number
        onTouchBegan(evt:egret.TouchEvent){
            if (this.isActing){return}
            this.moveDis = 0
            this.prePos = this.prePos || <any>{}
            ez.setPos(this.prePos,{x:evt.stageX,y:evt.stageY})
        }

        onTouchMove(evt:egret.TouchEvent){
            if (this.isActing){return}
            this.moveDis += evt.stageX - this.prePos.x
            ez.setPos(this.prePos,{x:evt.stageX,y:evt.stageY})
            Logger.log("this.moveDis:",this.moveDis)
        }

        onTouchEnd(evt:egret.TouchEvent){
            if (this.isActing){return}
            if (Math.abs(this.moveDis) > 80){
                this.updateCIndex(this.moveDis > 0 ? -1 : 1, 400)
            }
        }   
        /**滑动切换相关 end*/
    }
}