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
  * 数据读取基类
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved.
  */
var ResourceProxyBase = (function (_super) {
    __extends(ResourceProxyBase, _super);
    function ResourceProxyBase(proxyName) {
        if (proxyName === void 0) { proxyName = ""; }
        var _this = _super.call(this, proxyName) || this;
        _this._dataMap = new Array(); //存储excel数据
        _this._proxyName = ""; //excel名称
        _this._proxyName = proxyName;
        return _this;
    }
    /**
     * 开发状态：json可读
     * TODO
     * 上线状态：加载bin文件，在这里解密【文件小，加密】
     * 是预加载json文件还是到时候使用到再加载
     */
    ResourceProxyBase.prototype.getData = function () {
        var jsonData = RES.getRes(this._proxyName);
        return jsonData;
    };
    return ResourceProxyBase;
}(puremvc.Proxy));
__reflect(ResourceProxyBase.prototype, "ResourceProxyBase", ["puremvc.IProxy", "puremvc.INotifier"]);
