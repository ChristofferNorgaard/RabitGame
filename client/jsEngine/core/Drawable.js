jse.core.Drawable = function(args) {

    this._cons = jse.core.JseObject;
    this._cons(args);

    this.canvas = this.loopManager.canvas;
    this.context = this.loopManager.context;

    this.draw = function() {
    };
};