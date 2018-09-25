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
  * 游戏数据读取模板
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved.
  * 注意：
  * 不能直接操作vo数据，只能通过gameProxy操作
  */
var GameProxy = (function (_super) {
    __extends(GameProxy, _super);
    function GameProxy() {
        var _this = _super.call(this, GameProxy.NAME) || this;
        _this.vo = new GameVO();
        return _this;
    }
    /**
     * 获取游戏名称
     */
    GameProxy.prototype.getGameName = function () {
        if (!this.vo) {
            this.vo = new GameVO();
        }
        return this.vo.gameName;
    };
    /**
     * 设置游戏名称
     */
    GameProxy.prototype.setGameName = function (name) {
        if (!this.vo) {
            this.vo = new GameVO();
        }
        this.vo.gameName = name;
    };
    GameProxy.NAME = "GameProxy"; //必须和excel导出文件一致
    return GameProxy;
}(ResourceProxyBase));
__reflect(GameProxy.prototype, "GameProxy");
