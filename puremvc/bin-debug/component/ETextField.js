/**
  * 多颜色文本类
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved.
  * 使用方法：this.textTF.setText("haa<font size='60' color='0x2bff00' i='true' b='false'>aaaa</font>aaaaaa<i>aaaa</i>aaaaaaaa");
  */
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
var ETextField = (function (_super) {
    __extends(ETextField, _super);
    function ETextField() {
        return _super.call(this) || this;
    }
    //demo
    //"haa<font size='60' color='0x2bff00' i='true' b='false'>aaaa</font>aaaaaa<i>aaaa</i>aaaaaaaa"
    ETextField.prototype.setText = function (str) {
        if (str === void 0) { str = ""; }
        var styleParser = new egret.HtmlTextParser();
        this.textFlow = styleParser.parser(str);
    };
    return ETextField;
}(egret.TextField));
__reflect(ETextField.prototype, "ETextField");
