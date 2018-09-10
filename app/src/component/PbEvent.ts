// TypeScript file
module Pb{
    export class event extends egret.Event{
        static OvalBeforeMoveToNext = "event_OvalBeforeMoveToNext"
        params:any[] = []
        constructor(type:string, bubbles:boolean=false, cancelable:boolean=false)
        {
            super(type,bubbles,cancelable);
        }        
    }
}