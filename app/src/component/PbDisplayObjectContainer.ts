// TypeScript file
module Pb{
    //暂时添加跳跃动作 以后会陆续添加椭圆动作等
    interface jumpInfo{
        a:number
        v0:number
        // c:number
        d:number
        // e:number
        sPos:egret.Point
    }

    export class DisplayObjectContainer extends eui.Group{
        order:number
        //动作列表
        public actionArray;
        public frameRateArray;
        shiledTouch:boolean = false //是否屏蔽所有触摸(包括子节点)
        constructor(){
            super()
            this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this)
        }
        onAddToStage(){
            this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this)
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE,this.onRemove,this)
        }

        onRemove(){
            egret.Tween.removeTweens(this)
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchCb,this)
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE,this.onRemove,this)
            EasyResLoad.removeByHasCode(this.hashCode)
        }

        loadRes(resInfo,cb:Function,cbTarget = this,isHide = false,priority ?:number){
            EasyResLoad.loadRes(resInfo,cb,cbTarget,this.hashCode,isHide,priority)
        }

        $hitTest(stageX, stageY){
            return this.shiledTouch ? undefined : super.$hitTest(stageX, stageY)
        }

        cb:Function
        cbTgt:any
        cbParams:any

        setTouchCb(cb:Function,cbTgt:any,cbParams:any){
            this.cb = cb
            this.cbTgt = cbTgt
            this.cbParams = cbParams
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchCb,this)
            this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchCb,this)
        }

        onTouchCb(){
            if (this.cb){
                this.cb.call(this.cbTgt,this.cbParams)
            }
        }

/*                  跳跃动作               */
        _jumpTime:number
        _jumpInfo:jumpInfo = <jumpInfo>{}
        set jumpTime(t:number){
            this._jumpTime = t
            let sPos = this._jumpInfo.sPos
            let deltaX = t*this._jumpInfo.d
            let v0 = this._jumpInfo.v0
            let a = this._jumpInfo.a
            let deltaY = (v0+(v0-a*t))/2*t
            this.x = sPos.x+deltaX
            this.y = sPos.y+deltaY
        }

        get jumpTime():number{
            return this._jumpTime
        }

        get position():egret.Point{
            return new egret.Point(this.x,this.y)
        }

        // let node = new Pb.DisplayObjectContainer()           
        // node.jumpTo(new egret.Point(200,440),-400,2000)
        // node.jumpBy(new egret.Point(400,-100),-400,2000)
        jumpBy(pos:egret.Point,height:number,duration:number,easing ?:Function){
            //v = v0 + a*t
            //s = (v0+(v0-at))/2*t  => v0^2 = 2*h*a  代入结尾点得到  dy = (2v0-a*dua)*dua/2  => v0 = (dy*2/dua + a*dua)/2
            //dua^2*a2 + (4dy-8h)*a + (dy*2/dua)^2 = 0
            //
            this._jumpTime = 0
            this._jumpInfo.sPos = this.position
            this._jumpInfo.d = (pos.x)/duration //计算x随t的增长率
            let a = Math.pow(duration,2)
            let b = 4*pos.y-8*height
            let c = Math.pow((pos.y*2)/duration,2)
            let delta = Math.sqrt(Math.pow(b,2)-4*a*c)
            let ans1 = (-b+delta)/(2*a)
            let ans2 = (-b-delta)/(2*a)                        
            let v01 = (pos.y*2/duration + ans1*duration)/2
            let v02 = (pos.y*2/duration + ans2*duration)/2
            let t01 = v01/ans1
            let t02 = v02/ans2 
            if (t01 > 0 && t01 <= duration){
                this._jumpInfo.a = ans1
                this._jumpInfo.v0 = v01
            }else if (t02 > 0 && t02 <= duration){
                this._jumpInfo.a = ans2
                this._jumpInfo.v0 = v02
            }else{
                Logger.error("参数计算错误")
            }
            return egret.Tween.get(this).to({jumpTime:duration},duration,easing)
        }

        jumpTo(pos:ez.Pos,height:number,duration:number,easing ?:Function){
            return this.jumpBy(new egret.Point(pos.x-this.x,pos.y-this.y),height,duration,easing)
        }


/*                  椭圆旋转动作               */
        // protected _ovalHonRadius;
        // protected _ovalVerRadius;
        static r2a = 180/Math.PI
        protected _ovalRotation : number = 0;
        public ovalIndex:number = 0
        public get ovalRotation() : number {
            return this._ovalRotation;
        }
        public set ovalRotation(v : number) {
            this._ovalRotation = v;
            this.x = this.ovalHonRadius*Math.cos(this.ovalRotation/DisplayObjectContainer.r2a)
            this.y = -this.ovalVerRadius*Math.sin(this.ovalRotation/DisplayObjectContainer.r2a)
        }
        
        protected _ovalHonRadius : number = 155;
        public get ovalHonRadius() : number {
            return this._ovalHonRadius;
        }
        public set ovalHonRadius(v : number) {
            this._ovalHonRadius = v;
        }   
        
        private _ovalVerRadius : number = 31;
        public get ovalVerRadius() : number {
            return this._ovalVerRadius;
        }
        public set ovalVerRadius(v : number) {
            this._ovalVerRadius = v;
        }
        


        _bezierTime:number
        _bezierEnd:egret.Point
        protected _bezierList:Array<egret.Point>
        getBezierParams(){

        }
        static PascalTriangle:Array<Array<number>> = []
        static getPascalList(i){
            if (i > 20){
                Logger.error("参数过大")
                return []
            }
            if (DisplayObjectContainer.PascalTriangle[i]){
                return DisplayObjectContainer.PascalTriangle[i]
            }
            if (i == 1){
                DisplayObjectContainer.PascalTriangle[i] = [1]
            }else if (i == 2){
                return DisplayObjectContainer.PascalTriangle[i] = [1,1]
            }else{
                let preList = DisplayObjectContainer.getPascalList(i-1)
                let nowList = []
                nowList.push(1)
                for (let j = 0;j < preList.length - 1;j++){
                    nowList.push(preList[j]+preList[j+1])
                }
                nowList.push(1)
                return DisplayObjectContainer.PascalTriangle[i] = nowList
            }
            return DisplayObjectContainer.PascalTriangle[i]

            
        }

        set bezierTime(time){
            this._bezierTime = time
            let length = this._bezierList.length
            let x = 0
            let y = 0
            let paList = DisplayObjectContainer.getPascalList(this._bezierList.length)
            for (let i = 0;i < length;i++){
                let pTotal = paList[i]*Math.pow(1-this._bezierTime,length-i-1)*Math.pow(this._bezierTime,i)
                 x += pTotal*this._bezierList[i].x
                 y += pTotal*this._bezierList[i].y
            }
            this.x = x 
            this.y = y 
        }

        get bezierTime(){
            return this._bezierTime
        }

        bezierTo(bezierList:Array<egret.Point>,duration:number,easing ?:Function){
            this._bezierList = bezierList
            this.bezierTime = 0
            return egret.Tween.get(this).to({bezierTime:1},duration,easing)
        }

        registerResSingle(key){
            EasyResLoad.registerResSingle(key,this.hashCode)
        }
        registerResList(keyList:string[]){
            EasyResLoad.registerRes(keyList,this.hashCode)
        }
        removeSelf(){
            if (this.parent){
                this.parent.removeChild(this)
            }
        }

        getPosition() {
            return new egret.Point(this.x, this.y)
        }

        setPosition(newPosOrxValue, yValue?) {
            if (yValue === undefined) {
                this.x = newPosOrxValue.x
                this.y = newPosOrxValue.y
            } else {
                this.x = newPosOrxValue
                this.y = yValue
            }
        }

        setRotation(rot) {
            this.rotation = rot
        }

        setScale(scale:number, scaleY ?:number) {
            this.scaleX = scale
            this.scaleY = (scaleY || scaleY === 0) ? scaleY : scale;
        }

        setAnchorPoint(newPosOrxValue, yValue?) {
            if (yValue === undefined) {
                this.anchorOffsetX = newPosOrxValue.x * this.width
                this.anchorOffsetY = newPosOrxValue.y * this.height
            } else {
                this.anchorOffsetX = newPosOrxValue * this.width
                this.anchorOffsetY = yValue * this.width
            }
        }

        setVisible(value) {
            this.visible = value
        }

        

    }
}