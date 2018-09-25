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
// TypeScript file
var Pb;
(function (Pb) {
    var VScrollBar = (function (_super) {
        __extends(VScrollBar, _super);
        function VScrollBar() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        VScrollBar.prototype.updateDisplayList = function (unscaledWidth, unscaledHeight) {
            _super.prototype.updateDisplayList.call(this, unscaledWidth, unscaledHeight);
            var thumb = this.thumb;
            var viewport = this.$viewport;
            if (!thumb || !viewport) {
                return;
            }
            var bounds = egret.$TempRectangle;
            thumb.getPreferredBounds(bounds);
            var thumbHeight = viewport.height / (viewport.contentHeight || 100) * viewport.height;
            if (thumbHeight < 15) {
                thumbHeight = 15; //防止过小显示不清
            }
            var thumbX = bounds.x;
            var vsp = viewport.scrollV;
            var contentHeight = viewport.contentHeight;
            var height = viewport.height;
            if (contentHeight <= height) {
                //内容比窗口小直接到最大
                thumb.setLayoutBoundsSize(NaN, viewport.height);
                thumb.setLayoutBoundsPosition(thumbX, 0);
            }
            else if (vsp <= 0) {
                //拉到顶部
                var scaleHeight = thumbHeight * (1 - (-vsp) / (height * 0.5));
                scaleHeight = Math.max(5, Math.round(scaleHeight));
                thumb.setLayoutBoundsSize(NaN, scaleHeight);
                thumb.setLayoutBoundsPosition(thumbX, 0);
            }
            else if (vsp >= contentHeight - height) {
                //拉到底部
                var scaleHeight = thumbHeight * (1 - (vsp - contentHeight + height) / (height * 0.5));
                scaleHeight = Math.max(5, Math.round(scaleHeight));
                thumb.setLayoutBoundsSize(NaN, scaleHeight);
                thumb.setLayoutBoundsPosition(thumbX, unscaledHeight - scaleHeight);
            }
            else {
                var thumbY = (unscaledHeight - thumbHeight) * vsp / (contentHeight - height);
                thumb.setLayoutBoundsSize(NaN, thumbHeight);
                thumb.setLayoutBoundsPosition(thumbX, thumbY);
            }
        };
        VScrollBar.prototype.onPropertyChanged = function (event) {
            switch (event.property) {
                case "scrollV":
                case "contentHeight":
                    this.invalidateDisplayList();
                    break;
            }
        };
        ;
        return VScrollBar;
    }(eui.ScrollBarBase));
    Pb.VScrollBar = VScrollBar;
    __reflect(VScrollBar.prototype, "Pb.VScrollBar");
})(Pb || (Pb = {}));
