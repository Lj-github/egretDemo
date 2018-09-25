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
 * 每次换界面时候 都要清理
 *
 */
var GameLayerManager = (function (_super) {
    __extends(GameLayerManager, _super);
    //构造方法
    function GameLayerManager() {
        var _this = _super.call(this) || this;
        // 场景层 如 战场、主城、副本战场之类的
        _this.sceneLayer = new eui.Group();
        _this.battleSceneELayer = new eui.Group(); //战斗场景
        // 主UI层 如 底部功能栏
        _this.mainLayer = new eui.Group();
        // 弹窗层 如 设置、背包、装备之类的
        _this.panelLayer = new eui.Group();
        //上下bar层
        _this.barLayer = new eui.Group();
        _this.broadLayer = new eui.Group();
        _this.formLayer = new eui.Group();
        // 特效层 如 闪烁、飘字之类的
        _this.effectLayer = new eui.Group();
        //点击屏蔽层
        _this.shiledLayer = new eui.Group();
        // 通讯遮罩层 和服务器通讯UI
        _this.maskLayer = new eui.Group();
        //dialog 所在层
        _this.dialogLayer = new eui.Group();
        //引导 所在层
        _this.guideLayer = new eui.Group();
        //上方盖的黑底
        _this.coverLayer = new eui.Group;
        _this.isGuajing = false;
        _this.isBattleing = false;
        _this.hasLayerMap = {};
        _this.focusHomeType = undefined;
        _this.isClearAllLayer = false;
        _this.init();
        return _this;
    }
    //游戏容器管理器单例
    GameLayerManager.gameLayer = function () {
        if (!this._instance)
            this._instance = new GameLayerManager();
        return this._instance;
    };
    GameLayerManager.getInstance = function () {
        return this._instance;
    };
    //初始化场景类
    GameLayerManager.prototype.init = function () {
        this.touchThrough = true;
        this.sceneLayer.touchThrough = true;
        this.mainLayer.touchThrough = true;
        this.panelLayer.touchThrough = true;
        this.effectLayer.touchThrough = true;
        this.maskLayer.touchThrough = true;
        this.formLayer.touchThrough = true;
        this.addChild(this.sceneLayer);
        this.addChild(this.mainLayer);
        this.addChild(this.panelLayer);
        this.addChild(this.effectLayer);
        this.addChild(this.maskLayer);
        this.addChild(this.formLayer);
    };
    GameLayerManager.prototype.cleanLayerGroup = function (group) {
        var children = group.$children;
        children.forEach(function (bLayer) {
            if (bLayer && bLayer.closeMsg) {
                // if (firstLayer.isDelayBake) {
                //     //页面恢复时延迟删除的界面直接删除
                //     //ez.removeObj(firstLayer)
                // } else {
                //     game.AppFacade.getInstance().sendNotification(firstLayer.closeMsg);
                // }
                game.AppFacade.getInstance().sendNotification(bLayer.closeMsg);
                Logger.log(bLayer.closeMsg);
            }
        });
    };
    GameLayerManager.prototype.addLayer = function (layer) {
        switch (layer.layerType) {
            case game.LayerType.Scene: {
                //this.addScene(layer)
                break;
            }
            case game.LayerType.MainLayer: {
                this.mainLayer.addChild(layer);
                break;
            }
            case game.LayerType.NormalForm: {
                if (layer.isBottomForm) {
                    this.formLayer.addChildAt(layer, 1);
                }
                else {
                    this.cleanLayerGroup(this.formLayer);
                    this.formLayer.addChild(layer);
                }
                break;
            }
            case game.LayerType.Dialog: {
                this.dialogLayer.addChild(layer);
                //this.formLayerShow(layer)
                break;
            }
            case game.LayerType.Guide: {
                this.guideLayer.addChild(layer);
                break;
            }
            case game.LayerType.FirstLayer: {
                //this.firstLayer = layer
                //清除所有页面
                //this.clearForm()
                //this.clearAllLayer()
                this.panelLayer.addChild(layer);
                //this.addDarkBg(layer)
                //EZTopic.publish(TopicMsgConstant.ComMsg.FirstLayerAdd, (<any>layer).__class__)
                break;
            }
            case game.LayerType.NormalLayer: {
                this.panelLayer.addChild(layer);
                //this.addDarkBg(layer)
                break;
            }
            case game.LayerType.Effect:
                layer.horizontalCenter = layer.verticalCenter = 0;
                //this.addEffectLayer(layer)
                break;
        }
        // game.GuideMgr.instance.addUI(layer);
        //this.layerChange()
    };
    GameLayerManager.prototype.recoveryToLayer = function (uiLayer) {
        var _this = this;
        if (uiLayer && uiLayer.parent && (uiLayer.parent == this.panelLayer || uiLayer.parent == this.formLayer)) {
            //暂时只对form和layer处理
            switch (uiLayer.layerType) {
                case game.LayerType.NormalLayer:
                case game.LayerType.FirstLayer:
                    //删除所有form
                    this.cleanLayerGroup(this.formLayer);
                case game.LayerType.NormalForm:
                    var nowIdx_1 = uiLayer.parent.getChildIndex(uiLayer);
                    var childList = uiLayer.parent.$children;
                    childList.forEach(function (obj, idx) {
                        if (idx > nowIdx_1) {
                            _this.tryRemoveBaseLayer(obj);
                        }
                    });
                    break;
            }
        }
        else {
            Logger.warn('no layer to recovery');
        }
    };
    GameLayerManager.prototype.tryRemoveBaseLayer = function (layer) {
        if (layer && layer.closeMsg) {
            game.AppFacade.getInstance().sendNotification(layer.closeMsg);
        }
    };
    return GameLayerManager;
}(eui.UILayer));
__reflect(GameLayerManager.prototype, "GameLayerManager");
