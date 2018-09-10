// TypeScript file
module Pb{
    export class Image extends eui.Image{
        order:number = 0
        shiledTouch:boolean = false
 
        $hitTest(stageX, stageY){
            return this.shiledTouch ? undefined : super.$hitTest(stageX, stageY)
        }        
    }
}