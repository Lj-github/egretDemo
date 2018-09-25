  /**
    * 注册mediator
    * by dily
    * (c) copyright 2014 - 2035
    * All Rights Reserved. 
    */
module game {

	export class ViewPrepCommand extends puremvc.SimpleCommand implements puremvc.ICommand{
           
		public constructor(){
			super();
		}
		public registerMediator(CLASSNAME) {
            this.facade.registerMediator(new CLASSNAME());
        }

		public execute(notification:puremvc.INotification):void{
			this.registerMediator( RoleMediator );
            this.registerMediator(BackpackMediator);
            this.registerMediator( QianghuaMediator);
            this.registerMediator( ZhaoXianMediator);
            this.registerMediator( ChuangDangMediator);
            this.registerMediator( ShopMediator);
            this.registerMediator( MapMediator);
		}
	}
}