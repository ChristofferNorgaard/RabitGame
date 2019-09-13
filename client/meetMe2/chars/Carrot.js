mm2.chars.Carrot = function(args) {
    this._cons = jse.core.Entity;
    this._cons(args);

    var _p = this;

    this.aniI = 0;
    this.aniIMax = 100;

    this.radius = 8;

    this.draw = function() {
        _p.context.beginPath();
        _p.context.arc(
            _p.position.x,
            _p.position.y,
            _p.radius, 0, Math.PI, true
        );
        _p.context.lineTo(_p.position.x, _p.position.y +4*_p.radius);

        _p.context.strokeStyle = "#DDAA33";
        _p.context.stroke();

        var grad = _p.context.createLinearGradient(_p.position.x -_p.radius, 0,
            _p.position.x +_p.radius, 0);
        grad.addColorStop(0, "#DDAA33");
        grad.addColorStop(1, "#FFCC66");
        _p.context.fillStyle = grad;
        _p.context.fill();
        //_p.context.fillStyle = part.fillStyle;
        //_p.context.fill();

    };

    this.update = function() {
        if (_p.aniI >= _p.aniIMax) _p.aniI = 0;
        if (_p.aniI < 0) _p.aniI = _p.aniIMax -1;
    };
};
