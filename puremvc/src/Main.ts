
class Main extends eui.UILayer {
    protected createChildren() {
        super.createChildren();

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
            context.onUpdate = () => {

            }
        })

        // egret.lifecycle.onPause = () => {
        //     egret.ticker.pause();
        // }
        //
        // egret.lifecycle.onResume = () => {
        //     egret.ticker.resume();
        // }

        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        this.runGame().catch(e => {
            console.log(e);
        })

    }

    private async runGame() {
        await this.loadResource()
        this.createGameScene();
    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }
    /**
     * 创建游戏场景
     */
    private createGameScene():void {
        game.AppFacade.getInstance().startUp(GameLayerManager.gameLayer());
        this.stage.addChild(GameLayerManager.gameLayer());

        game.AppFacade.getInstance().startUp(GameLayerManager.gameLayer());
        game.AppFacade.getInstance().sendNotification(MainNotify.OPEN_MAIN);

        //game.AppFacade.getInstance().registerMediator(new game.LoaderSceneMediator);

    }



}

