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
  * 数据读取模板
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved.
  */
var TemplateProxy = (function (_super) {
    __extends(TemplateProxy, _super);
    function TemplateProxy() {
        return _super.call(this, TemplateProxy.NAME) || this;
    }
    /**
     * 获取excel数据
     */
    TemplateProxy.prototype.getGameData = function () {
        return this.getData();
    };
    TemplateProxy.NAME = "template_json"; //必须和excel导出文件一致
    return TemplateProxy;
}(ResourceProxyBase));
__reflect(TemplateProxy.prototype, "TemplateProxy");
