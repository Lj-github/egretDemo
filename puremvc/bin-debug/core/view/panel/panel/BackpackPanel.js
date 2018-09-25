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
    var BackpackPanel = (function (_super) {
        __extends(BackpackPanel, _super);
        function BackpackPanel() {
            return _super.call(this) || this;
        }
        BackpackPanel.prototype.getSkinPath = function () {
            return "resource/ui/panel/BackpackSkin.exml";
        };
        return BackpackPanel;
    }(game.BaseLayer));
    game.BackpackPanel = BackpackPanel;
    __reflect(BackpackPanel.prototype, "game.BackpackPanel");
})(game || (game = {}));
