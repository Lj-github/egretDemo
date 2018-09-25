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
//预计封装监听函数，触摸，添加与删除等
var Pb;
(function (Pb) {
    var Component = (function (_super) {
        __extends(Component, _super);
        function Component() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Component;
    }(eui.Component));
    Pb.Component = Component;
    __reflect(Component.prototype, "Pb.Component");
})(Pb || (Pb = {}));
