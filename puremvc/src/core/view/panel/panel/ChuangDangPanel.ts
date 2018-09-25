module game {

    export class ChuangDangPanel extends BaseLayer {

        public constructor() {
            super();
        }
        public closeBtn: eui.Button;
        public readExcel: eui.Button;
        public input1: eui.Label;

        getSkinPath(): string {
            return "resource/ui/panel/ChuangDangSkin.exml";
        }

    }
}