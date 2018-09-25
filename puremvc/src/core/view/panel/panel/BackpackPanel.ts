module game {
    export class BackpackPanel extends BaseLayer {
        public constructor() {
            super();
        }
        public closeBtn: eui.Button;
        public readProxy: eui.Button;
        public saveProxy: eui.Button;
        public input1: eui.Label;
        public showText: eui.Label;
        getSkinPath(): string {

            return "resource/ui/panel/BackpackSkin.exml"
        }
    }
}