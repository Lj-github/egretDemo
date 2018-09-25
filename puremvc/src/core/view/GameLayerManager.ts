  /**
   * 每次换界面时候 都要清理
   *
   */
class GameLayerManager extends eui.UILayer{
  // 场景层 如 战场、主城、副本战场之类的
    public sceneLayer: eui.Group = new eui.Group();
    public battleSceneELayer: eui.Group = new eui.Group();  //战斗场景
    // 主UI层 如 底部功能栏
    public mainLayer: eui.Group = new eui.Group();
    // 弹窗层 如 设置、背包、装备之类的
    public panelLayer: eui.Group = new eui.Group();
    //上下bar层
    public barLayer: eui.Group = new eui.Group();

    public broadLayer: eui.Group = new eui.Group()

    public formLayer: eui.Group = new eui.Group();
    // 特效层 如 闪烁、飘字之类的
    public effectLayer: eui.Group = new eui.Group();
    //点击屏蔽层
    public shiledLayer: eui.Group = new eui.Group();
    // 通讯遮罩层 和服务器通讯UI
    public maskLayer: eui.Group = new eui.Group();
    //dialog 所在层
    public dialogLayer: eui.Group = new eui.Group();
    //引导 所在层
    public guideLayer: eui.Group = new eui.Group();
    public advLayer:eui.Group
    //上方盖的黑底
    public coverLayer: eui.Group = new eui.Group
    public isGuajing: boolean = false
    public isBattleing: boolean = false
    private static _instance: GameLayerManager;
    public spDark: eui.Group; //Layer黑底
    public spDark1: eui.Group
    public spDark2: eui.Group
    public posCenter: eui.Group;
    posGroup:eui.Group
    public hasLayerMap = {}
    public focusHomeType: game.FocusHomeType = undefined
    isClearAllLayer = false

    //构造方法
    public constructor(){
        super();
        this.init();
    }

    //游戏容器管理器单例
    public static gameLayer():GameLayerManager  
    {  
        if(!this._instance)  
            this._instance = new GameLayerManager();  
        return this._instance;  
    }  
    public static getInstance(): GameLayerManager {
        return this._instance
    }
    //初始化场景类
    public init():void {

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
    }
    private cleanLayerGroup(group:eui.Group){

        let children = group.$children
        children.forEach((bLayer: game.BaseLayer) => {
            if (bLayer && bLayer.closeMsg) {
                // if (firstLayer.isDelayBake) {
                //     //页面恢复时延迟删除的界面直接删除
                //     //ez.removeObj(firstLayer)
                // } else {
                //     game.AppFacade.getInstance().sendNotification(firstLayer.closeMsg);
                // }
                game.AppFacade.getInstance().sendNotification(bLayer.closeMsg);
                Logger.log(bLayer.closeMsg)

            }
        })


    }

    addLayer(layer: game.BaseLayer) {

        switch (layer.layerType) {
            case game.LayerType.Scene: {
                //this.addScene(layer)
                break
            }
            case game.LayerType.MainLayer: {
                this.mainLayer.addChild(layer);
                break
            }
            case game.LayerType.NormalForm: {
                if (layer.isBottomForm){
                    this.formLayer.addChildAt(layer,1)
                }else{
                    this.cleanLayerGroup(this.formLayer)
                    this.formLayer.addChild(layer)
                }
                break
            }
            case game.LayerType.Dialog: {
                this.dialogLayer.addChild(layer);
                //this.formLayerShow(layer)
                break
            }
            case game.LayerType.Guide: {
                this.guideLayer.addChild(layer);
                break
            }
            case game.LayerType.FirstLayer: {
                //this.firstLayer = layer
                //清除所有页面
                //this.clearForm()
                //this.clearAllLayer()
                this.panelLayer.addChild(layer)
                //this.addDarkBg(layer)
                //EZTopic.publish(TopicMsgConstant.ComMsg.FirstLayerAdd, (<any>layer).__class__)
                break
            }
            case game.LayerType.NormalLayer: {
                this.panelLayer.addChild(layer)
                //this.addDarkBg(layer)
                break
            }
            case game.LayerType.Effect:
                layer.horizontalCenter = layer.verticalCenter = 0
                //this.addEffectLayer(layer)
                break
        }
        // game.GuideMgr.instance.addUI(layer);
        //this.layerChange()
    }

     recoveryToLayer(uiLayer: game.BaseLayer) {
        if (uiLayer && uiLayer.parent && (uiLayer.parent == this.panelLayer || uiLayer.parent == this.formLayer)) {
            //暂时只对form和layer处理
            switch (uiLayer.layerType) {
                case game.LayerType.NormalLayer:
                case game.LayerType.FirstLayer:
                    //删除所有form
                    this.cleanLayerGroup(this.formLayer)
                case game.LayerType.NormalForm:
                    let nowIdx = uiLayer.parent.getChildIndex(uiLayer)
                    let childList = uiLayer.parent.$children
                    childList.forEach((obj, idx) => {
                        if (idx > nowIdx) {
                            this.tryRemoveBaseLayer(obj)
                        }
                    })
                    break
            }
        } else {
            Logger.warn('no layer to recovery')
        }
    }

     tryRemoveBaseLayer(layer) {
        if (layer && layer.closeMsg) {
            game.AppFacade.getInstance().sendNotification(layer.closeMsg);
        }
    }



}

