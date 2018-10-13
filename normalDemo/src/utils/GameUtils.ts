/**
 * Created by husong on 4/9/17.
 */
class GameUtils {
    public static handleHeadImg(img: eui.Image) {
        let mask = new egret.Shape;
        mask.graphics.lineStyle(0);
        mask.graphics.beginFill(16777215, 1);
        mask.graphics.drawRoundRect(2, 2, img.width - 4, img.height - 4, 30, 30);
        mask.graphics.endFill();
        mask.x = img.x;
        mask.y = img.y;
        img.parent.addChild(mask);
        img.mask = mask;
    }

    // private static shareView: ShareView;
    //
    // public static showShare() {
    //     let layer = Api.Layers.getLayer(LayerType.ALERT);
    //     if (!this.shareView) {
    //         this.shareView = new ShareView();
    //         this.shareView.width = layer.stage.stageWidth;
    //         this.shareView.height = layer.stage.stageHeight;
    //     }
    //     layer.addChild(this.shareView);
    // }

    public static timer(handler: Function, time: number, count: number) {
        let id = setInterval(handler, time);
        clear(id, time * count);
        function clear(id, time) {
            setTimeout(() => {
                clearInterval(id)
            }, time)
        }
    }

    public static createImgButton(img: eui.Image, label?: eui.Label): ImgButton {
        let parent = img.parent;
        let imgButton = new ImgButton(img);
        if (label) {
            label.x = label.x - img.x;
            label.y = label.y - img.y;
            imgButton.addLabel(label);
        }
        if (parent) {
            parent.addChild(imgButton);
        }
        imgButton.x = img.x + img.width / 2;
        imgButton.y = img.y + img.height / 2;
        img.x = 0;
        img.y = 0;
        return imgButton;
    }
}