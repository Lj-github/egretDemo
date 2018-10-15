var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by husong on 4/9/17.
 */
var GameUtils = (function () {
    function GameUtils() {
    }
    GameUtils.handleHeadImg = function (img) {
        var mask = new egret.Shape;
        mask.graphics.lineStyle(0);
        mask.graphics.beginFill(16777215, 1);
        mask.graphics.drawRoundRect(2, 2, img.width - 4, img.height - 4, 30, 30);
        mask.graphics.endFill();
        mask.x = img.x;
        mask.y = img.y;
        img.parent.addChild(mask);
        img.mask = mask;
    };
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
    GameUtils.timer = function (handler, time, count) {
        var id = setInterval(handler, time);
        clear(id, time * count);
        function clear(id, time) {
            setTimeout(function () {
                clearInterval(id);
            }, time);
        }
    };
    GameUtils.createImgButton = function (img, label) {
        var parent = img.parent;
        var imgButton = new ImgButton(img);
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
    };
    return GameUtils;
}());
__reflect(GameUtils.prototype, "GameUtils");
