module Pb {
    export class OvalCell<T> extends game.BaseLayer{
        data:T
        constructor(){
            super()
        }     

        setData(data:T){
            this.data = data
            this.tryFlushCell()
        }

        aferCreateAndAddFinish(){
            super.aferCreateAndAddFinish()
            this.tryFlushCell()
        }

        tryFlushCell(){
            if (this.createComplete && this.parent && this.data){
                this.flushCell()
            }
        }   

        flushCell(){

        }
    }    
}