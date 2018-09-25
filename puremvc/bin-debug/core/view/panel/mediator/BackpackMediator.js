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
    var BackpackMediator = (function (_super) {
        __extends(BackpackMediator, _super);
        function BackpackMediator(viewComponent) {
            if (viewComponent === void 0) { viewComponent = null; }
            var _this = _super.call(this, BackpackMediator.NAME, viewComponent) || this;
            _this.openMessage = MainNotify.OPEN_MAIN;
            _this.closeMessage = MainNotify.CLOSE_MAIN;
            return _this;
        }
        /**
         * 初始化面板ui
         */
        BackpackMediator.prototype.initUI = function () {
            _super.prototype.initUI.call(this);
            this.uiLayer.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeButtonClick, this);
            this.uiLayer.readProxy.addEventListener(egret.TouchEvent.TOUCH_TAP, this.readProxyButtonClick, this);
            this.uiLayer.saveProxy.addEventListener(egret.TouchEvent.TOUCH_TAP, this.saveProxyButtonClick, this);
        };
        BackpackMediator.prototype.getUILayerAnsyc = function (cb, cbTarget, body) {
            this.data = body;
            var layer = new game.BackpackPanel();
            layer.layerType = game.LayerType.NormalForm;
            cb.call(cbTarget, layer);
        };
        /**
         * 初始化面板数据
         */
        BackpackMediator.prototype.initData = function () {
        };
        BackpackMediator.prototype.saveProxyButtonClick = function (event) {
            P.getGameDataProxy().setGameName(this.uiLayer.input1.text);
            this.uiLayer.showText.text += "保存成功...\n" + P.getGameDataProxy().getGameName() + "\n";
        };
        BackpackMediator.prototype.readProxyButtonClick = function (event) {
            this.uiLayer.showText.text += P.getGameDataProxy().getGameName() + "\n";
        };
        BackpackMediator.prototype.closeButtonClick = function (event) {
            this.closePanel(1);
        };
        BackpackMediator.NAME = "BackpackMediator";
        return BackpackMediator;
    }(game.BaseLayerMediator));
    game.BackpackMediator = BackpackMediator;
    __reflect(BackpackMediator.prototype, "game.BackpackMediator");
})(game || (game = {}));
