jse.core.JseObject = function(args) {

    var _p = this;
    this.loopManager = jse.util.getArg(args, "loopManager", null);

    if (!this.loopManager) console.log("No loopManager for JseObject!");
};