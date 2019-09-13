jse.chars.Arrow = function(args) {
    this._cons = jse.core.Entity;
    this._cons(args);

    var _p = this;

    this.dotRadius = 5;
    this.length = 30;
    this.color = "yellow";

    this.draw = function() {

        var sin = Math.sin(_p.direction);
        var cos = Math.cos(_p.direction);
        var sin2 = Math.sin(_p.direction +Math.PI/2);
        var cos2 = Math.cos(_p.direction +Math.PI/2);

        _p.context.beginPath();
        _p.context.moveTo(_p.position.x -cos*_p.length/2, _p.position.y +sin*_p.length/2);
        _p.context.lineTo(_p.position.x +cos*_p.length/2, _p.position.y -sin*_p.length/2);
        _p.context.lineTo(_p.position.x +cos*_p.length/3 +cos2*5, _p.position.y -sin*_p.length/3 -sin2*5);
        _p.context.lineTo(_p.position.x +cos*_p.length/2, _p.position.y -sin*_p.length/2);
        _p.context.lineTo(_p.position.x +cos*_p.length/3 -cos2*5, _p.position.y -sin*_p.length/3 +sin2*5);
        _p.context.strokeWidth = 5;
        _p.context.strokeStyle = _p.color;
        _p.context.stroke();

        _p.context.beginPath();
        _p.context.arc(_p.position.x, _p.position.y, _p.dotRadius, 0, Math.PI*2);
        _p.context.strokeStyle = "black";
        _p.context.strokeWidth = 1;
        _p.context.stroke();
        _p.context.fillStyle = _p.color;
        _p.context.fill();

    };

    this.update = function() {

    };
};
