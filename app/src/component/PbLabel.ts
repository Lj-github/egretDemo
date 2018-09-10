module Pb {
	export class Label extends eui.Label {
		private bqArr:egret.Bitmap[];
		private tfMap:any;
		private offsetX:number=0;
		private offsetY:number=0;
		private labelStr:string;
		private labelShow:string;

		private cDbId:number;
		private sId:number;
		private parentContainer:any;
		public constructor(text?: string) {
			super(text);
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE,this.onRemove,this);
			this.touchEnabled = true;
			this.addEventListener(egret.TextEvent.LINK,this.onLinkHandler,this);
		}

		private onRemove():void
		{
			this.removeEventListener(egret.TextEvent.LINK,this.onLinkHandler,this);
			this.removeEventListener(egret.Event.REMOVED_FROM_STAGE,this.onRemove,this);
			this.touchEnabled = false;
			this.destroy();
		}

		private destroy():void
		{
			this.labelStr = "";
			this.messageInfoList = null;
			while(this.bqArr　&& this.bqArr.length>0){
				this.parentContainer.removeChild(this.bqArr.shift());
			}
			this.parentContainer = null;
			this.bqArr = null;
			this.tfMap = null;
		}

		private onLinkHandler(e:egret.TextEvent):void
		{
			EZTopic.publish(TopicMsgConstant.Chat.CHAT_MESSAGE_TAP,JSON.parse(e.text),this.cDbId,this.sId);
		}

		
		private messageInfoList:Array<msgObj.ChatMessageInfoUnit>;
		private labelW:number;

		public setMessageInfo(arr:Array<msgObj.ChatMessageInfoUnit>,chatDBId:number,serverId:number){
			this.destroy();
			this.cDbId=chatDBId;
			this.sId=serverId;
			this.messageInfoList = arr;
			this.parentContainer = this.parent;
			this.showLabel();
		}

		private showLabel():void
		{
			this.bqArr = [];
			this.tfMap = {};
			this.text = "";
			this.labelShow = "";this.labelW = 0;

			var len:number = this.messageInfoList.length;
			var temp:msgObj.ChatMessageInfoUnit;
			for(var i:number=0;i<len;i++){
				temp = this.messageInfoList[i];
				if(temp.type ==cz.ChatType.INFO){
					this.refreshLabel(temp);
				}else if(temp.type == cz.ChatType.EXPRESSION){
					this.refreshBq(temp);
				}else{
					this.refreshFlow(temp);
				}
			}
			for(var key in this.tfMap){
				this.labelShow = this.labelShow.replace(key,this.tfMap[key]);
			}

			this.textFlow = Global.getTextFlow(this.labelShow);
		}


		private refreshBq(temp:msgObj.ChatMessageInfoUnit):void
		{
			this.setBq(temp.id);
			var cStr:string ='  ';
			this.labelShow += cStr;
			this.countWidth(cStr);
		}

		private refreshFlow(temp:msgObj.ChatMessageInfoUnit):void
		{
			var str:string = '<font color={0} href=event:{1} ><u>'+temp.strContent+'</u></font>';
			var quality:number;
			// switch(temp.type){
			// 	case cz.ChatType.ITEM:
			// 	quality = DefContainer.mapContainer.itemDefMap[temp.id].grade;
			// 	break;
			// 	case cz.ChatType.PET:
			// 	quality = DefContainer.mapContainer.petDefMap[temp.id].rank;
			// 	break;
			// 	case cz.ChatType.HEROEQUIP:
			// 	quality = DefContainer.mapContainer.userequipDefMap[temp.id].level;
			// 	break;
			// 	case cz.ChatType.PETEQUIP:
			// 	quality = DefContainer.mapContainer.petequipDefMap[temp.id].level;
			// 	break;
			// }
			this.tfMap[temp.strContent] = str;
			this.refreshLabel(temp);
		}

		private refreshLabel(temp:msgObj.ChatMessageInfoUnit):void
		{
			var cStr:string = "";
			var str:string = temp.strContent;
			var len:number = str.length;
			for(var i=0;i<len;i++){
				cStr = str.charAt(i);
				this.countWidth(cStr);
				this.labelShow += cStr;
			}
			
		}

		private countWidth(str:string):void
		{
			var cW:number;
			cW = this.textWidth;
			this.text += str;
			if(cW == this.textWidth){
				this.text = "";
				this.labelW+=this.width - cW;
				this.countWidth(str);
				return;
			}
			this.labelW+=this.textWidth - cW;
		}

		private setBq(id:number):void
		{
			// var bitmap: egret.Bitmap = new egret.Bitmap( RES.getRes(cz.expression[id].icon));
			// bitmap.width = bitmap.height = 16;
			// var nH:number = this.labelW/this.width>>0; 
			// this.offsetX = this.labelW - nH*this.width;
			// this.offsetY = nH*(this.size+this.lineSpacing);
			// if(this.offsetX+this.size>this.width){
			// 	this.offsetX = 0;
			// 	this.offsetY = (nH+1)*this.size
			// }
			// bitmap.x = this.localToGlobal().x-this.parent.localToGlobal().x + this.offsetX
			// bitmap.y = this.localToGlobal().y-this.parent.localToGlobal().y + this.offsetY;
			// this.bqArr.push(bitmap);
			// this.parentContainer.addChild(bitmap);
		}

	}
}