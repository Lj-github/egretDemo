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
 * 功能条
 */
var game;
(function (game) {
    var FunctionBar = (function (_super) {
        __extends(FunctionBar, _super);
        function FunctionBar() {
            return _super.call(this) || this;
        }
        return FunctionBar;
    }(eui.Component));
    game.FunctionBar = FunctionBar;
    __reflect(FunctionBar.prototype, "game.FunctionBar");
})(game || (game = {}));
