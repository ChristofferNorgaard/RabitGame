/*
    Notes:
    speed should be
    Math.sin(bunny.aniI/bunny.aniIMax*Math.PI*6)*3.5 +4;
*/
mm2.chars.Bunny = function(args) {
    this._cons = jse.core.Entity;
    this._cons(args);

    var _p = this;

    this.color = jse.util.getArg(args, "color", "silver");

    this.aniI = 0;
    this.aniIMax = 100;

    _p.blueprint = {
        head: {
            radius: 9,
            neckLength: 18,
            strokeStyle: "black",
            fillStyle: "white"
        },
        body: {
            radius: 12,
            strokeStyle: "black",
            fillStyle: "white"
        },
        tail: {
            radius: 3,
            strokeStyle: "black",
            fillStyle: "white"
        },
        leg: {
            radius: 3,
            length: 17,
            strokeStyle: "black",
            fillStyle: "white",
            angles: [-Math.PI/5.2, Math.PI/5.2, -Math.PI*4.2/5, Math.PI*4.2/5]
        },
        ear: {
            angles: [0],
            length: 20,
            strokeStyle: "gray",
            fillStyle: ""
        }
    };

    this.draw = function() {

        var sin = Math.sin(_p.direction);
        var cos = Math.cos(_p.direction);
        var part, aniD;

        _p.context.fillStyle = "";

        part = _p.blueprint.leg;
        for (var i in part.angles) {

            var aniD;
            if (i <= 1)
                aniD = Math.sin(_p.aniI/_p.aniIMax*Math.PI*2*3)*5 -12;
            else
                aniD = -Math.sin(_p.aniI/_p.aniIMax*Math.PI*2*3)*6 +7;

            _p.context.beginPath();
            _p.context.arc(
                _p.position.x +Math.cos(_p.direction +part.angles[i]) * part.length + cos * aniD,
                _p.position.y -Math.sin(_p.direction +part.angles[i]) * part.length - sin * aniD,
                part.radius, 0, Math.PI*2
            );
            _p.context.strokeStyle = part.strokeStyle;
            //_p.context.stroke();
            _p.context.fillStyle = part.fillStyle;
            _p.context.fill();
        }

        part = _p.blueprint.tail;
        aniD = Math.sin(_p.aniI/_p.aniIMax*Math.PI*2*3)*(-1) -1;
        _p.context.beginPath();
        _p.context.arc(
            _p.position.x -cos * _p.blueprint.body.radius + cos * aniD,
            _p.position.y +sin * _p.blueprint.body.radius - sin * aniD,
            part.radius, 0, Math.PI*2
        );
        _p.context.strokeStyle = part.strokeStyle;
        //_p.context.stroke();
        _p.context.fillStyle = part.fillStyle;
        _p.context.fill();

        part = _p.blueprint.body;
        aniD = - Math.sin(_p.aniI/_p.aniIMax*Math.PI*2*3)*2 -1;
        _p.context.beginPath();
        _p.context.arc(
            _p.position.x + cos * aniD,
            _p.position.y - sin * aniD,
            part.radius, 0, Math.PI*2);
        _p.context.strokeStyle = part.strokeStyle;
        //_p.context.stroke();

        var bx = _p.position.x + cos * aniD;
        var by = _p.position.y - sin * aniD;
        var bodyGrad = _p.context.createRadialGradient(bx+5, by+5, 0, bx+5, by+5, part.radius+10);
        bodyGrad.addColorStop(0, 'white');
        bodyGrad.addColorStop(1, _p.color);

        _p.context.fillStyle = bodyGrad; //part.fillStyle;
        _p.context.fill();

        part = _p.blueprint.head;
        aniD = Math.sin(_p.aniI/_p.aniIMax*Math.PI*2*3)*2 -7;
        _p.context.beginPath();
        _p.context.arc(
            _p.position.x +cos * part.neckLength + cos * aniD,
            _p.position.y -sin * part.neckLength - sin * aniD,
            part.radius, 0, Math.PI*2
        );
        _p.context.strokeStyle = part.strokeStyle;
        //_p.context.stroke();
        //_p.context.fillStyle = part.fillStyle;

        bx = _p.position.x +cos * part.neckLength + cos * aniD;
        by = _p.position.y -sin * part.neckLength - sin * aniD;
        var headGrad = _p.context.createRadialGradient(bx+4, by+4, 0, bx+4, by+4, part.radius+4);
        headGrad.addColorStop(0, 'white');
        headGrad.addColorStop(1, _p.color);

        _p.context.fillStyle = headGrad; //part.fillStyle;
        _p.context.fill();

        part = _p.blueprint.ear;

        for (var i in part.angles) {
            _p.context.beginPath();


            //_p.context.arc(
            //    _p.position.x +cos * (_p.blueprint.head.neckLength -part.length),
            //    _p.position.y -sin * (_p.blueprint.head.neckLength -part.length),
            //    part.length, Math.PI*3/2 +_p.direction, Math.PI*2 +_p.direction
            //);
            //_p.context.arc(
            //    _p.position.x +Math.cos(_p.direction +part.angles[i]) * part.length,
            //    _p.position.y -Math.sin(_p.direction +part.angles[i]) * part.length,
            //    part.length, 0, Math.PI*2
            //);

            _p.context.moveTo(
                _p.position.x +cos * _p.blueprint.head.neckLength,
                _p.position.y -sin * _p.blueprint.head.neckLength
            );
            /*
            _p.context.bezierCurveTo(
                _p.position.x +cos * 30 +Math.cos(_p.direction +Math.PI/2 +_p.i/5) *20,
                _p.position.y -sin * 30 -Math.sin(_p.direction +Math.PI/2 +_p.i/5) *20,
                _p.position.x +cos * 60 +Math.cos(_p.direction +Math.PI/2 -_p.i/5) *20,
                _p.position.y -sin * 60 -Math.sin(_p.direction +Math.PI/2 -_p.i/5) *20,
                _p.position.x +cos * 90,
                _p.position.y -sin * 90
            );
            */

            _p.context.strokeStyle = part.strokeStyle;
            _p.context.stroke();
            //_p.context.fillStyle = _p.blueprint.body.fillStyle;
            //_p.context.fill();
        }
    };

    this.update = function() {
        //_p.aniI += 1;
        if (_p.aniI >= _p.aniIMax) _p.aniI = 0;
        if (_p.aniI < 0) _p.aniI = _p.aniIMax -1;
    };
};
