var gt;
(function (gt) {
    gt.lan_cn = "ch"; // 当前先写为中文
    gt.lan_en = "en"; // 当前先写为中文
    var lan = gt.lan_en;
    var isDebug = true;
    gt.size = {};
    function getLocalContex(id) {
        if (!LC[id]) {
            console.error("没有定义 id = " + id + " 的文字");
            return;
        }
        return LC[id][lan];
    }
    gt.getLocalContex = getLocalContex;
    function log() {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (isDebug) {
            return;
        }
        else {
            console.log.apply(console, arguments);
        }
    }
    gt.log = log;
    var Color;
    (function (Color) {
        Color[Color["GREEN"] = 2412844] = "GREEN";
        Color[Color["GRAY"] = 9737364] = "GRAY";
        Color[Color["RED"] = 16000797] = "RED";
        Color[Color["WHITE"] = 16777204] = "WHITE";
        Color[Color["GRAY1"] = 6184542] = "GRAY1";
        Color[Color["PURPLE"] = 13967350] = "PURPLE";
        Color[Color["PURPLE1"] = 14876860] = "PURPLE1";
        Color[Color["ORANGE"] = 16078601] = "ORANGE";
        Color[Color["BLUE"] = 8569855] = "BLUE";
        Color[Color["BLACK"] = 1391940] = "BLACK";
        Color[Color["BROWN_DEEP"] = 6043427] = "BROWN_DEEP";
        Color[Color["BROWN_SHALLOW"] = 5980705] = "BROWN_SHALLOW";
        Color[Color["YEL_SHALLOW"] = 16707779] = "YEL_SHALLOW";
        Color[Color["YELLOW"] = 16379410] = "YELLOW";
    })(Color = gt.Color || (gt.Color = {}));
    /**
     * 判断是否安装 MetaMask   通过他的 js 文件 判断
     */
    gt.metaMaskUrl = "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en";
    function isInstallMetaMask() {
        // 检查web3是否已经注入到(Mist/MetaMask)
        if (typeof window["web3"] !== 'undefined') {
            // 使用 Mist/MetaMask 的提供者
            // web3js = new Web3(web3.currentProvider);
        }
        else {
            alert("没有安装 MetaMask");
        }
        // // 现在你可以启动你的应用并自由访问 Web3.js:
        // startApp()
    }
    gt.isInstallMetaMask = isInstallMetaMask;
    function setProp(tgt, props) {
        if (!tgt || !props) {
            return;
        }
        for (var key in props) {
            tgt[key] = props[key];
        }
    }
    gt.setProp = setProp;
    function arrayWeighting(arr) {
        var hasMap = {};
        var list1 = [];
        arr.forEach(function (item) {
            if (!hasMap[item]) {
                list1.push(item);
                hasMap[item] = true;
            }
        });
        return list1;
    }
    gt.arrayWeighting = arrayWeighting;
    function isHttps() {
        return window.location.href.indexOf('https://') == 0;
    }
    gt.isHttps = isHttps;
    gt.getFnName = function (callee) {
        var _callee = callee.toString().replace(/[\s\?]*/g, ""), comb = _callee.length >= 50 ? 50 : _callee.length;
        _callee = _callee.substring(0, comb);
        var name = _callee.match(/^function([^\(]+?)\(/);
        if (name && name[1]) {
            return name[1];
        }
        var caller = callee.caller, _caller = caller.toString().replace(/[\s\?]*/g, "");
        var last = _caller.indexOf(_callee), str = _caller.substring(last - 30, last);
        name = str.match(/var([^\=]+?)\=/);
        if (name && name[1]) {
            return name[1];
        }
        return "anonymous";
    };
})(gt || (gt = {}));
