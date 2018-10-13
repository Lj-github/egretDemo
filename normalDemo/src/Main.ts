class Main extends egret.DisplayObjectContainer {


    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin

            context.onUpdate = () => {

            }
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        this.runGame().catch(e => {
            console.log(e);
        })


    }

    private async runGame() {
        await this.loadResource()
        this.createGameScene();
        const result = await RES.getResAsync("description_json")
        this.startAnimation(result);
        await platform.login();
        const userInfo = await platform.getUserInfo();
        console.log(userInfo);

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

    private textfield: egret.TextField;

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene() {
        // 自动寻路  例子
        this.addChild( new Game());


        protobuf.load("resource/proto/awesome.proto", function (err, root) {
            if (err)
                throw err;

            // Obtain a message type
            var AwesomeMessage = root.lookupType("awesomepackage.AwesomeMessage");

            // Exemplary payload
            var payload = {awesomeField: "AwesomeString"};

            // Verify the payload if necessary (i.e. when possibly incomplete or invalid)
            var errMsg = AwesomeMessage.verify(payload);
            if (errMsg)
                throw Error(errMsg);

            // Create a new message
            var message = AwesomeMessage.create(payload); // or use .fromObject if conversion is necessary
            console.log('message', message)
            // Encode a message to an Uint8Array (browser) or Buffer (node)
            var buffer = AwesomeMessage.encode(message).finish();
            // ... do something with buffer
            console.log('buffer', buffer)
            // Decode an Uint8Array (browser) or Buffer (node) to a message
            var message = AwesomeMessage.decode(buffer);
            // ... do something with message
            console.log('message', message)
            // If the application uses length-delimited buffers, there is also encodeDelimited and decodeDelimited.

            // Maybe convert the message back to a plain object
            var object = AwesomeMessage.toObject(message, {
                longs: String,
                enums: String,
                bytes: String,
                // see ConversionOptions
            });
            console.log('object', object)
        });


    }

    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    static createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    private startAnimation(result: string[]) {
        let parser = new egret.HtmlTextParser();

        let textflowArr = result.map(text => parser.parse(text));
        let textfield = this.textfield;
        let count = -1;
        let change = () => {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            let textFlow = textflowArr[count];

            // 切换描述内容
            // Switch to described content
            textfield.textFlow = textFlow;
            let tw = egret.Tween.get(textfield);
            tw.to({"alpha": 1}, 200);
            tw.wait(2000);
            tw.to({"alpha": 0}, 200);
            tw.call(change, this);
        };

        change();
    }
}