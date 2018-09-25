var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var ImgButton = (function (_super) {
    __extends(ImgButton, _super);
    function ImgButton(source) {
        var _this = _super.call(this) || this;
        _this._onClick = function () {
        };
        _this.touchChildren = false;
        _this.init(source);
        return _this;
    }
    Object.defineProperty(ImgButton.prototype, "source", {
        set: function (value) {
            var _this = this;
            if (value instanceof eui.Image) {
                this.img = value;
            }
            else {
                if (!this.img)
                    this.img = new eui.Image();
                this.img.source = value;
                this.img.validateNow();
                this.validateNow();
            }
            egret.callLater(function () {
                _this.anchorOffsetX = _this.width / 2;
                _this.anchorOffsetY = _this.height / 2;
            }, this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImgButton.prototype, "onClick", {
        set: function (value) {
            this._onClick = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImgButton.prototype, "label", {
        set: function (value) {
            if (this._label) {
                this._label.text = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    ImgButton.prototype.setLabel = function (label, verticalCenter, horizontalCenter) {
        if (verticalCenter === void 0) { verticalCenter = 0; }
        if (horizontalCenter === void 0) { horizontalCenter = 0; }
        label.verticalCenter = verticalCenter;
        label.horizontalCenter = horizontalCenter;
        this._label = label;
        this.addChild(label);
    };
    ImgButton.prototype.addLabel = function (label) {
        this._label = label;
        this.addChild(label);
    };
    ImgButton.prototype.init = function (source) {
        var _this = this;
        this.source = source;
        this.addChild(this.img);
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this._onClick();
        }, this);
    };
    ImgButton.prototype.onTouchBegin = function () {
        this.scaleX = 0.95;
        this.scaleY = 0.95;
        this.$stage.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchCancel, this);
        this.$stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onStageTouchEnd, this);
    };
    ImgButton.prototype.onTouchCancel = function () {
        this.scaleX = 1;
        this.scaleY = 1;
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchCancel, this);
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onStageTouchEnd, this);
    };
    ImgButton.prototype.onStageTouchEnd = function () {
        this.scaleX = 1;
        this.scaleY = 1;
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchCancel, this);
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onStageTouchEnd, this);
    };
    return ImgButton;
}(eui.Group));
__reflect(ImgButton.prototype, "ImgButton");
