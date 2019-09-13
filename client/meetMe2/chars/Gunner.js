mm2.chars.Gunner = function(args) {
    this._cons = jse.core.Entity;
    this._cons(args);

    var _p = this;

    this.aniI = 0;
    this.aniIMax = 100;

    _p.blueprint = {
        head: {
            radius: 12,
            strokeStyle: "",
            fillGrad1: "#AA91AA",
            fillGrad2: "#FAF1EA"
        },
        hair: {
            radius: 12,
            strokeStyle: "",
            fillGrad1: "brown",
            fillGrad2: "transparent"
        },
        gun: {
            armLength: 12,
            armRadius: 4,
            gunStrokeStyle: "black",
            fillGrad1: "#FAF1EA",
            fillGrad2: "#AA91AA"
        }
    };

    this.draw = function() {

        var sin = Math.sin(_p.direction);
        var cos = Math.cos(_p.direction);
        var part, aniD, gradX, gradY;
        _p.context.fillStyle = "";


        // *** Head ***

        part = _p.blueprint.head;
        //aniD = Math.sin(_p.aniI/_p.aniIMax*Math.PI*2*3)*2 -7;
        _p.context.beginPath();
        _p.context.arc(
            //_p.position.x +cos * part.neckLength + cos * aniD,
            //_p.position.y -sin * part.neckLength - sin * aniD,
            _p.position.x,
            _p.position.y,
            part.radius, 0, Math.PI*2
        );
        if (part.strokeStyle) {
            _p.context.strokeStyle = part.strokeStyle;
            _p.context.stroke();
        }

        gradX = _p.position.x +cos *part.radius*1.1;
        gradY = _p.position.y -sin *part.radius*1.1;
        var headGrad = _p.context.createRadialGradient(gradX, gradY, 0, gradX, gradY, part.radius);
        headGrad.addColorStop(0, part.fillGrad1);
        headGrad.addColorStop(1, part.fillGrad2);

        //_p.context.fillStyle = part.fillStyle;
        _p.context.fillStyle = headGrad;
        _p.context.fill();


        // *** Gun ***

        // ** Gun: Right hand **
        part = _p.blueprint.gun;
        //aniD = Math.sin(_p.aniI/_p.aniIMax*Math.PI*2*3)*2 -7;
        _p.context.beginPath();
        var rArmX = _p.position.x +( cos + sin)/4*3 * part.armLength;
        var rArmY = _p.position.y +(-sin + cos)/4*3 * part.armLength;
        _p.context.arc(rArmX, rArmY, part.armRadius, 0, Math.PI*2);
        if (part.strokeStyle) {
            _p.context.strokeStyle = part.strokeStyle;
            _p.context.stroke();
        }

        gradX = _p.position.x +( cos + sin)/4*3 * (part.armLength -part.armRadius+2);
        gradY = _p.position.y +(-sin + cos)/4*3 * (part.armLength -part.armRadius+2);
        var armGrad = _p.context.createRadialGradient(gradX, gradY, 0, gradX, gradY, part.armRadius);
        armGrad.addColorStop(0, part.fillGrad1);
        armGrad.addColorStop(1, part.fillGrad2);

        //_p.context.fillStyle = part.fillStyle;
        _p.context.fillStyle = armGrad;
        _p.context.fill();


        // ** Gun: Gun **
        _p.context.beginPath();

        _p.context.moveTo(rArmX, rArmY);
        _p.context.lineTo(rArmX +cos*11, rArmY -sin*11);
        _p.context.lineWidth = 3;
        _p.context.strokeStyle = part.gunStrokeStyle;
        _p.context.stroke();

        /*
        gradX = _p.position.x +( cos + sin)/4*3 * (part.armLength -part.armRadius+2);
        gradY = _p.position.y +(-sin + cos)/4*3 * (part.armLength -part.armRadius+2);
        var armGrad = _p.context.createRadialGradient(gradX, gradY, 0, gradX, gradY, part.armRadius);
        armGrad.addColorStop(0, part.fillGrad1);
        armGrad.addColorStop(1, part.fillGrad2);

        //_p.context.fillStyle = part.fillStyle;
        _p.context.fillStyle = armGrad;
        _p.context.fill();
        */

        // *** Hair ***

        part = _p.blueprint.hair;
        //aniD = Math.sin(_p.aniI/_p.aniIMax*Math.PI*2*3)*2 -7;
        _p.context.beginPath();
        _p.context.arc(
            _p.position.x +cos*0,
            _p.position.y -sin*0,
            part.radius, 0, Math.PI*2
        );
        if (part.strokeStyle) {
            _p.context.strokeStyle = part.strokeStyle;
            _p.context.stroke();
        }

        gradX = _p.position.x -cos*5;
        gradY = _p.position.y +sin*5;
        var hairGrad = _p.context.createRadialGradient(gradX, gradY, 0, gradX, gradY, part.radius);
        hairGrad.addColorStop(0, part.fillGrad1);
        hairGrad.addColorStop(1, part.fillGrad2);

        _p.context.fillStyle = hairGrad;
        _p.context.fill();

    };

    this.update = function() {
        //_p.aniI += 1;
        if (_p.aniI >= _p.aniIMax) _p.aniI = 0;
        if (_p.aniI < 0) _p.aniI = _p.aniIMax -1;
    };
};
