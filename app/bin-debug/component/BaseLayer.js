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
//与mediator绑定的页面
var game;
(function (game) {
    var BaseLayer = (function (_super) {
        __extends(BaseLayer, _super);
        function BaseLayer() {
            var _this = _super.call(this) || this;
            _this.createComplete = false;
            _this.shiledTouch = false; //是否屏蔽所有触摸(包括子节点)
            //一些公共函数的赋值
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            return _this;
        }
        BaseLayer.prototype.$hitTest = function (stageX, stageY) {
            return this.shiledTouch ? undefined : _super.prototype.$hitTest.call(this, stageX, stageY);
        };
        BaseLayer.prototype.$onAddToStage = function (stage, nestLevel) {
            this.onAddToStage();
            _super.prototype.$onAddToStage.call(this, stage, nestLevel);
        };
        BaseLayer.prototype.$onRemoveFromStage = function () {
            this.onRemove();
            _super.prototype.$onRemoveFromStage.call(this);
        };
        BaseLayer.prototype.tryAfterCreateAndAddFinish = function () {
            if (this.parent && this.createComplete) {
                this.aferCreateAndAddFinish();
            }
        };
        BaseLayer.prototype.aferCreateAndAddFinish = function () {
        };
        BaseLayer.prototype.onAddToStage = function () {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
            this.tryAfterCreateAndAddFinish();
        };
        BaseLayer.prototype.publish = function (msg, params) {
        };
        BaseLayer.prototype.subscribe = function (msg, callback) {
        };
        BaseLayer.prototype.afterCreateComplete = function () {
        };
        BaseLayer.prototype.onCreateComplete = function () {
            this.createComplete = true;
            this.removeEventListener(eui.UIEvent.COMPLETE, this.onCreateComplete, this);
            this.afterCreateComplete();
            this.tryAfterCreateAndAddFinish();
        };
        BaseLayer.prototype.onRemove = function () {
        };
        return BaseLayer;
    }(Pb.Component));
    game.BaseLayer = BaseLayer;
    __reflect(BaseLayer.prototype, "game.BaseLayer");
})(game || (game = {}));
