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
    var AppFacade = (function (_super) {
        __extends(AppFacade, _super);
        function AppFacade(facade) {
            return _super.call(this, facade) || this;
        }
        AppFacade.getInstance = function () {
            if (this.instance == null)
                this.instance = new AppFacade('facade');
            return (this.instance);
        };
        AppFacade.prototype.initializeController = function () {
            _super.prototype.initializeController.call(this, 'facade');
            this.registerCommand(AppFacade.STARTUP, game.StartupCommand);
        };
        /**
         * 启动PureMVC，在应用程序中调用此方法，并传递应用程序本身的引用
         * @param	rootView	-	PureMVC应用程序的根视图root，包含其它所有的View Componet
         */
        AppFacade.prototype.startUp = function (rootView) {
            this.sendNotification(AppFacade.STARTUP, rootView);
            this.removeCommand(AppFacade.STARTUP); //PureMVC初始化完成，注销STARUP命令
        };
        AppFacade.STARTUP = "startup";
        return AppFacade;
    }(puremvc.Facade));
    game.AppFacade = AppFacade;
    __reflect(AppFacade.prototype, "game.AppFacade", ["puremvc.IFacade", "puremvc.INotifier"]);
})(game || (game = {}));
