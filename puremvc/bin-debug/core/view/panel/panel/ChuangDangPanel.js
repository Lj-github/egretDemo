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
var game;
(function (game) {
    var ChuangDangPanel = (function (_super) {
        __extends(ChuangDangPanel, _super);
        function ChuangDangPanel() {
            return _super.call(this) || this;
        }
        ChuangDangPanel.prototype.getSkinPath = function () {
            return "resource/ui/panel/ChuangDangSkin.exml";
        };
        return ChuangDangPanel;
    }(game.BaseLayer));
    game.ChuangDangPanel = ChuangDangPanel;
    __reflect(ChuangDangPanel.prototype, "game.ChuangDangPanel");
})(game || (game = {}));
