class ImgButton extends eui.Group {
    private img: eui.Image;
    private _label: eui.Label;
    private _onClick: Function = () => {
    };

    set source(value: any) {
        if (value instanceof eui.Image) {
            this.img = value;
        } else {
            if (!this.img) this.img = new eui.Image();
            this.img.source = value;
            this.img.validateNow();
            this.validateNow();
        }
        egret.callLater(() => {
            this.anchorOffsetX = this.width / 2;
            this.anchorOffsetY = this.height / 2;
        }, this);
    }

    set onClick(value: Function) {
        this._onClick = value;
    }

    set label(value: string) {
        if (this._label) {
            this._label.text = value;
        }
    }

    setLabel(label: eui.Label, verticalCenter = 0, horizontalCenter = 0) {
        label.verticalCenter = verticalCenter;
        label.horizontalCenter = horizontalCenter;
        this._label = label;
        this.addChild(label);
    }

    addLabel(label: eui.Label) {
        this._label = label;
        this.addChild(label);
    }

    constructor(source: string | eui.Image) {
        super();
        this.touchChildren = false;
        this.init(source);
    }

    private init(source) {
        this.source = source;
        this.addChild(this.img);
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            this._onClick()
        }, this);
    }

    protected onTouchBegin(): void {
        this.scaleX = 0.95;
        this.scaleY = 0.95;
        this.$stage.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchCancel, this);
        this.$stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onStageTouchEnd, this);
    }

    private onTouchCancel() {
        this.scaleX = 1;
        this.scaleY = 1;
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchCancel, this);
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onStageTouchEnd, this);
    }

    private onStageTouchEnd() {
        this.scaleX = 1;
        this.scaleY = 1;
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchCancel, this);
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onStageTouchEnd, this);
    }
}