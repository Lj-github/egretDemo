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
 * 角色信息
 */
var game;
(function (game) {
    var RoleInfo = (function (_super) {
        __extends(RoleInfo, _super);
        function RoleInfo() {
            return _super.call(this) || this;
        }
        return RoleInfo;
    }(eui.Component));
    game.RoleInfo = RoleInfo;
    __reflect(RoleInfo.prototype, "game.RoleInfo");
})(game || (game = {}));
