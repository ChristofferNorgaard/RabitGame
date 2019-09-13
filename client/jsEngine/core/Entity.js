jse.core.Entity = function(args) {

    var _p = this;
    this._drawable = jse.core.Drawable;
    this._drawable(args);

    this._updatable = jse.core.Updatable;
    this._updatable(args);

    this.position = jse.util.getArg(args, "position", { x:0, y:0 });
    this.direction = jse.util.getArg(args, "direction", 0);
    this.scale = jse.util.getArg(args, "scale", 1);

    this.move = function(lengthLength) {
        _p.position.x += Math.cos(_p.direction) * lengthLength;
        _p.position.y -= Math.sin(_p.direction) * lengthLength;
    };

    this.turn = function(deltaRad) {
        _p.direction += deltaRad;
    };

};