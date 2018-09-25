// log输出控制
var Logger;
(function (Logger) {
    var _level = 0;
    var _isCollect = false;
    var _uuid = undefined;
    var isToNet = false;
    function isDebugEnabled() {
        return _level >= 0;
    }
    ;
    function log() {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (_level > 0) {
            return;
        }
        else {
            console.log.apply(console, arguments);
        }
    }
    Logger.log = log;
    ;
    function logf() {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        console.log.apply(console, arguments);
    }
    Logger.logf = logf;
    function warn() {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        console.warn.apply(console, arguments);
    }
    Logger.warn = warn;
    ;
    function isInfoEnabled() {
        return _level >= 1;
    }
    ;
    function getFunctionName(func) {
        if (typeof func == 'function' || typeof func == 'object') {
            var name = ('' + func).match(/function\s*([\w\$]*)\s*\(/);
        }
        return name && name[1];
    }
    function error() {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (_level > 2) {
            return;
        }
        else {
            console.error.apply(console, arguments);
            var stack = {};
            var errBake = Error;
            if (errBake.captureStackTrace && this.touchReachTgt instanceof Function) {
                var obj = {};
                errBake.captureStackTrace(obj);
                stack = obj.stack;
            }
            else {
                try {
                    throw new Error();
                }
                catch (e) {
                    // e.stack 中包含了堆栈数据，可以进行处理从而忽略不感兴趣的堆栈信息
                    stack = e.stack;
                }
            }
            // (<any>window).reportError({ message: arguments[0], ezStack: stack })
        }
    }
    Logger.error = error;
    ;
})(Logger || (Logger = {}));
