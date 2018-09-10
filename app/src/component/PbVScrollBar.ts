// TypeScript file
module Pb{
    export class VScrollBar extends eui.ScrollBarBase{
        updateDisplayList (unscaledWidth, unscaledHeight) {
            super.updateDisplayList(unscaledWidth, unscaledHeight)
            var thumb = this.thumb;
            var viewport = this.$viewport;
            if (!thumb || !viewport) {
                return;
            }
            var bounds = egret.$TempRectangle;
            thumb.getPreferredBounds(bounds);
            var thumbHeight = viewport.height/(viewport.contentHeight || 100)*viewport.height  
            if (thumbHeight < 15){
                thumbHeight = 15 //防止过小显示不清
            }
            var thumbX = bounds.x;
            var vsp = viewport.scrollV;
            var contentHeight = viewport.contentHeight;
            var height = viewport.height;
            if (contentHeight <= height){
                //内容比窗口小直接到最大
                thumb.setLayoutBoundsSize(NaN, viewport.height);
                thumb.setLayoutBoundsPosition(thumbX, 0);                
            }else if (vsp <= 0) {
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
            }else {
                var thumbY = (unscaledHeight - thumbHeight) * vsp / (contentHeight - height);
                thumb.setLayoutBoundsSize(NaN, thumbHeight);
                thumb.setLayoutBoundsPosition(thumbX, thumbY);
            }                        
        }

        onPropertyChanged  (event) {
            switch (event.property) {
                case "scrollV":
                case "contentHeight":
                    this.invalidateDisplayList();
                    break;
            }
        };
    }
}
