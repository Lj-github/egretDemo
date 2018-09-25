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
/**
  * 背包面板
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved.
  */
var game;
(function (game) {
    var ChuangDangMediator = (function (_super) {
        __extends(ChuangDangMediator, _super);
        function ChuangDangMediator(viewComponent) {
            if (viewComponent === void 0) { viewComponent = null; }
            var _this = _super.call(this, ChuangDangMediator.NAME, viewComponent) || this;
            _this.openMessage = MainNotify.OPEN_ROLE;
            _this.closeMessage = MainNotify.CLOSE_ROLE;
            return _this;
        }
        ChuangDangMediator.prototype.getUILayerAnsyc = function (cb, cbTarget, body) {
            var layer = new game.ChuangDangPanel();
            layer.layerType = game.LayerType.NormalForm;
            cb.call(cbTarget, layer);
        };
        ChuangDangMediator.prototype.initUI = function () {
            _super.prototype.initUI.call(this);
            this.uiLayer.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeButtonClick, this);
        };
        ChuangDangMediator.prototype.closeButtonClick = function (event) {
            this.closePanel(1);
        };
        ChuangDangMediator.NAME = "ChuangDangMediator";
        return ChuangDangMediator;
    }(game.BaseLayerMediator));
    game.ChuangDangMediator = ChuangDangMediator;
    __reflect(ChuangDangMediator.prototype, "game.ChuangDangMediator");
})(game || (game = {}));
