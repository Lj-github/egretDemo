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
    var LayerType;
    (function (LayerType) {
        LayerType[LayerType["Scene"] = 1] = "Scene";
        LayerType[LayerType["MainLayer"] = 2] = "MainLayer";
        LayerType[LayerType["HomeBar"] = 3] = "HomeBar";
        LayerType[LayerType["TopBar"] = 4] = "TopBar";
        LayerType[LayerType["FirstLayer"] = 5] = "FirstLayer";
        LayerType[LayerType["NormalLayer"] = 6] = "NormalLayer";
        LayerType[LayerType["NormalForm"] = 7] = "NormalForm";
        LayerType[LayerType["Dialog"] = 8] = "Dialog";
        LayerType[LayerType["Effect"] = 9] = "Effect";
        LayerType[LayerType["Guide"] = 10] = "Guide";
    })(LayerType = game.LayerType || (game.LayerType = {}));
    var FocusHomeType;
    (function (FocusHomeType) {
        FocusHomeType[FocusHomeType["Guaji"] = 0] = "Guaji";
        FocusHomeType[FocusHomeType["HomeCity"] = 1] = "HomeCity";
    })(FocusHomeType = game.FocusHomeType || (game.FocusHomeType = {}));
    var BaseLayer = (function (_super) {
        __extends(BaseLayer, _super);
        function BaseLayer() {
            var _this = _super.call(this) || this;
            // skinNamePath:string
            _this.showDark = false;
            _this.createComplete = false;
            _this.closeMsg = undefined; //用于页面的关闭与开启
            _this.openMsg = undefined;
            _this.hideMsg = undefined; //隐藏页面的消息暂时预留
            _this._showCommonBanner = true;
            _this.showHomeBar = true;
            _this._layerType = LayerType.NormalLayer;
            _this.sceneMap = undefined;
            _this.addEventListener(eui.UIEvent.COMPLETE, _this.onCreateComplete, _this);
            var skinPath = _this.getSkinPath();
            if (skinPath && skinPath.length > 0) {
                _this.skinName = skinPath;
                // this.registerResBySkinPath(skinPath)
            }
            else {
                _this.onCreateComplete();
            }
            var gameLayerManager = GameLayerManager.getInstance();
            if (gameLayerManager) {
                //gameLayerManager.hasLayerMap[this["__class__"]] = true
            }
            _this.tryUpdateGuajiState();
            return _this;
        }
        BaseLayer.prototype.$onAddToStage = function (stage, nestLevel) {
            // ez.tryUpdateMusicWhenClassChange(this["__class__"])
            // Logger.log(ez.getClassName(this),"is add")
            _super.prototype.$onAddToStage.call(this, stage, nestLevel);
        };
        BaseLayer.prototype.$onRemoveFromStage = function () {
            _super.prototype.$onRemoveFromStage.call(this);
            // ez.tryUpdateMusicWhenClassChange(this["__class__"])
        };
        BaseLayer.prototype.tryUpdateGuajiState = function () {
            // if (cz.guajiShiledClass[this["__class__"]]) {
            //     GameLayerManager.getInstance().setSceneShow()
            // }
        };
        //resize 处理可以自己传入函数也可以自己重载adjustPos
        BaseLayer.prototype.addResizeHandle = function (resizeCb, resizeTgt) {
            this.resizeCb = resizeCb;
            this.resizeTgt = resizeTgt;
            GameLayerManager.getInstance().addEventListener(egret.FocusEvent.RESIZE, this.onResizeDelay, this);
            this.adjustPos();
        };
        BaseLayer.prototype.onResizeDelay = function () {
            egret.setTimeout(function () {
                this.adjustPos();
            }, this, 1);
        };
        BaseLayer.prototype.adjustPos = function () {
            if (this.resizeCb) {
                this.resizeCb.call(this.resizeTgt);
            }
        };
        BaseLayer.prototype.onRemove = function () {
            GameLayerManager.getInstance().hasLayerMap[this["__class__"]] = false;
            //EZTopic.publish(TopicMsgConstant.ComMsg.DeleteBaseLayer,ez.getClassName(this))
            GameLayerManager.getInstance().removeEventListener(egret.FocusEvent.RESIZE, this.onResizeDelay, this);
            //super.onRemove()
            this.tryUpdateGuajiState();
        };
        BaseLayer.prototype.publish = function (msg, params) {
            //EZTopic.publish(msg,params,this)
        };
        BaseLayer.prototype.subscribe = function (msg, callback) {
            //EZTopic.subscribe(msg,callback,this)
        };
        Object.defineProperty(BaseLayer.prototype, "layerType", {
            get: function () {
                return this._layerType;
            },
            set: function (layerType) {
                this._layerType = layerType;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseLayer.prototype, "isFirstLayer", {
            get: function () {
                return this._layerType == LayerType.FirstLayer;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseLayer.prototype, "showCommonBanner", {
            get: function () {
                return this._showCommonBanner;
            },
            set: function (vue) {
                this._showCommonBanner = vue;
            },
            enumerable: true,
            configurable: true
        });
        BaseLayer.prototype.getSkinPath = function () {
            return '';
        };
        BaseLayer.prototype.afterCreateComplete = function () {
        };
        BaseLayer.prototype.onCreateComplete = function () {
            this.createComplete = true;
            this.removeEventListener(eui.UIEvent.COMPLETE, this.onCreateComplete, this);
            this.afterCreateComplete();
            //this.tryAfterCreateAndAddFinish()
        };
        BaseLayer.prototype.jumpToProject = function (projectID) {
            // ez.jumpToProject(projectID)
        };
        return BaseLayer;
    }(eui.Component));
    game.BaseLayer = BaseLayer;
    __reflect(BaseLayer.prototype, "game.BaseLayer");
})(game || (game = {}));
