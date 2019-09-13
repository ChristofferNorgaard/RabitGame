var mm2 = {
  chars: {}
};

var sock;
mm2.MeetMe2Mgr = function (canvas) {

  this._cons = jse.core.LoopManager;
  this._cons({
    interval: 30
  });

  var _p = this;
  this.canvas = canvas;
  this.context = this.canvas.getContext("2d");

  this.players = {};
  this.spawns = [];

  this.init = function () {


    _p.player = _p.createObject(mm2.chars.Bunny, {
      position: {x: 360, y: 225},
      direction: Math.PI / 2,
      color: "rgb(" + (Math.floor(Math.random() * 255)) + "," + (Math.floor(Math.random() * 255)) + "," + (Math.floor(Math.random() * 255)) + ")"
    });
    /*
            _p.player = _p.createObject(mm2.chars.Gunner, {
                position: { x:360, y:225 },
                direction: Math.PI/2
            });
            */
    /*
    _p.player = _p.createObject(jse.chars.Arrow, {
        position: { x:360, y:225 },
        direction: Math.PI/2
    });
    */

  };

  this._startLM = this.start;

  this.startSP = function() {
    _p.player.id = 1;

    var listOfNames = ["Duhec", "Jaka", "David", "Tadej"];
      _p.player.name = prompt("Enter your name", listOfNames[Math.floor(Math.random() * listOfNames.length)]);
      _p._startLM();
  }

  this.start = function () {

    _p.sock = new jse.core.Socket({port: 1234, autoReconnect: false});
    //_p.sock = new WebSocket("ws://localhost:1234/");
    _p.sock.onReceive(function (msg) {

      try {
        var obj = JSON.parse(msg.data);

        // --- packetType: serverInit ---
        if (obj.packetType == "serverInit") {
          //console.log(obj);
          if (!_p.player.id && _p.player.name == obj["playerName"]) {
            _p.player.id = obj["playerId"];
            _p.player.points = 0;
            console.log("You joined, playerId: " + _p.player.id);
          } else {
            var newPlayer = _p.createObject(mm2.chars.Bunny);
            //var newPlayer = _p.createObject(mm2.chars.Gunner);
            newPlayer.id = obj["playerId"];
            newPlayer.name = obj["playerName"];
            newPlayer.color = obj["playerColor"];
            newPlayer.points = 0;
            _p.players[newPlayer.id] = newPlayer;
            console.log("Player joined: " + newPlayer.id + " (" + newPlayer.name + ")");
          }
        }

        // --- packetType: serverUpdate ---
        else if (obj.packetType == "serverUpdate") {
          for (var i in obj.players) {
            var packPlayer = obj.players[i];
            if (!packPlayer) continue;
            if (packPlayer.id == _p.player.id){
              _p.player.points = packPlayer.points;
              continue;
            };

            // TODO: Smooth values interpolation
            _p.players[packPlayer.id].position.x = packPlayer.x;
            _p.players[packPlayer.id].position.y = packPlayer.y;
            _p.players[packPlayer.id].aniI = packPlayer.aniI;
            _p.players[packPlayer.id].direction = packPlayer.dir;
            _p.players[packPlayer.id].points = packPlayer.points;
          }
        }

        // --- packetType: serverQuit ---
        else if (obj.packetType == "serverQuit") {

          var idx = _p.objects.indexOf(_p.players[obj["playerId"]]);
          delete _p.objects[idx];
          delete _p.players[obj["playerId"]];
          console.log("Removed " + obj["playerId"]);
        }

        // --- packetType: serverSpawn ---
        else if (obj.packetType == "serverSpawn") {
          var spawn = _p.createObject(mm2.chars.Carrot, {
            position: {x: obj["x"], y: obj["y"]}
          });
          spawn.id = obj["spawnId"];
          spawn.type = obj["spawnType"];

          _p.spawns.push(spawn);
        }

        // --- packetType: serverPick ---
        else if (obj.packetType == "serverPick") {
          console.log("pick")
          var spawnId = obj["spawnId"];
          console.log("spawnId", spawnId);
          for (var i = 0; i < _p.spawns.length; i++) {
            if (_p.spawns[i].id == spawnId) {
              if (_p.spawns[i].type == "carrot") {
                // Carrot picked ...
              }
              _p.deleteObject(_p.spawns[i])
              _p.spawns.splice(i, 1);
              break;
            }
          }
        }

      }
      catch (ex) {
        console.log(ex);
      }
    });

    _p.sock.onConnect(function (e) {
      // TODO: random default name from predefined list of names
      var listOfNames = ["Duhec", "Jaka", "David", "Tadej"];
      _p.player.name = prompt("Enter your name", listOfNames[Math.floor(Math.random() * listOfNames.length)]);
      _p.sock.send(JSON.stringify({
        packetType: "init",
        name: _p.player.name,
        color: _p.player.color
      }));
      _p._startLM();
    });
    _p.sock.onDisconnect(function (e) {
      _p.stop();
    });

    _p.sock.connect();

    sock = _p.sock;
  };

  this._stopLM = this.stop;
  this.stop = function () {
    _p._stopLM();
    _p.sock.close();
    console.log("Game stopped");
  };

  this._updateLM = this.update;
  this.update = function () {

    //if (jse.input.isKeyDown(32)) console.log("space is down");
    if (jse.input.isKeyDown(37)) { // Left Arrow
      _p.player.turn(Math.PI / 30);
    } else if (jse.input.isKeyDown(39)) { // Right Arrow
      _p.player.turn(-Math.PI / 30);
    }

    //var aniD = Math.sin(_p.bunny.aniI/_p.bunny.aniIMax*Math.PI*2*3)*2.5 +3;
    if (jse.input.isKeyDown(38)) { // Up Arrow
      var speed = Math.sin(_p.player.aniI / _p.player.aniIMax * Math.PI * 2 * 3) * 3.5 + 4;
      //var speed = 3;
      _p.player.move(speed);
      _p.player.aniI += 1.5;
    } else if (jse.input.isKeyDown(40)) { // Down Arrow
      _p.player.move(-2);

      _p.player.aniI -= 0.7;
    } else {
    }

    //if (_p.player.position.x > _p.)

    //if (jse.input.isKeyDown(32)) {
    //}

    _p._updateLM();

    if (_p.sock) {
      _p.sock.send(JSON.stringify({
        packetType: "update",
        x: _p.player.position.x,
        y: _p.player.position.y,
        dir: _p.player.direction,
        aniI: _p.player.aniI
      }));
    }

  };

  this._drawLM = this.draw;
  this.draw = function () {
    _p._drawLM();

    for (var i in _p.players) {
      _p.context.strokeStyle = _p.players[i].color;
      _p.context.font = "14px monospace";
      _p.context.strokeText(_p.players[i].name + " " + _p.players[i].points, _p.players[i].position.x - 30, _p.players[i].position.y - 30);
    }
    for(var s in _p.spawns){
      _p.context.font = "14px monospace";
      _p.context.strokeText("carrot", _p.spawns[s].position.x, _p.spawns[s].position.y - 30);
    }
    var x = 10;
    var y = 20;
    var yd = 20;
    _p.context.strokeStyle = "black";
    _p.context.lineWidth = 1;
    _p.context.font = "14px monospace";
    _p.context.strokeText("updateT: " + _p.loopStats.updateTime, x, y);
    y += yd;
    _p.context.strokeText("drawT: " + _p.loopStats.drawTime, x, y);
    y += yd;
    _p.context.strokeText("sleepT: " + _p.loopStats.sleepTime, x, y);
    y += yd;
    _p.context.strokeText("frameTime: " + _p.loopStats.frameTime, x, y);
    y += yd;
    _p.context.strokeText("FPS: " + _p.loopStats.FPS, x, y);
    y += yd;
    _p.context.strokeText("POINTS: " + _p.player.points, x, y);
    y += yd;
  };

  _p.bgImg = document.createElement("img");
  _p.bgImg.src = "client/img/grass.jpg";
  _p.bgPos = {x: 0, y: 0};
  this.drawBackground = function () {
    _p.context.drawImage(_p.bgImg, _p.bgPos.x, _p.bgPos.y);
  };

};