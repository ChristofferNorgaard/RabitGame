jse.core.LoopManager = function (args) {

  var _p = this;
  this.interval = jse.util.getArg(args, "interval", 50);

  this.intervalHandle = null;

  this.loopStats = {
    FPS: 0,
    updateTime: 0, // Time to execute updates
    drawTime: 0, // Time drawing
    sleepTime: 0, // Time asleep
    frameTime: 0, // Total frame time

    _curFPS: 0,
    _FPSSecondsTimer: 0.0,
    _lastTime: new Date().getTime()
  };
  this.objects = [];

  this.tick = function () {
    _p.loopStats._sleepTime = (new Date().getTime() - _p.loopStats._sleepTimeStart) / 1000;
    _p.update();
    _p.draw();
    _p.loopStats._sleepTimeStart = new Date().getTime();
  };

  // *** Update ***
  this.update = function () {
    var startTime = new Date().getTime();
    _p.updateLoopStats();
    for (var i in _p.objects) {
      if (_p.objects[i].update) _p.objects[i].update();
    }
    _p.loopStats.updateTime = (new Date().getTime() - startTime) / 1000;
  };
  this.updateLoopStats = function () {
    _p.loopStats.frameTime = (new Date().getTime() - _p.loopStats._lastTime) / 1000;

    _p.loopStats._curFPS += 1;
    _p.loopStats._FPSSecondsTimer += _p.loopStats.frameTime;

    if (_p.loopStats._FPSSecondsTimer > 1) {
      _p.loopStats._FPSSecondsTimer -= 1;
      _p.loopStats.FPS = _p.loopStats._curFPS;
      _p.loopStats._curFPS = 0;
    }

    _p.loopStats._lastTime = new Date().getTime();
  };

  // *** Draw ***
  this.draw = function () {
    var startTime = new Date().getTime();
    _p.drawBackground();
    _p.drawObjects();
    _p.loopStats.drawTime = (new Date().getTime() - startTime) / 1000;
  };

  this.drawBackground = function () {
    _p.context.fillStyle = "white";
    _p.context.clearRect(0, 0, _p.canvas.width, _p.canvas.height);
  };

  this.drawObjects = function () {
    for (var i in _p.objects) {
      if (_p.objects[i].draw) _p.objects[i].draw();
    }
  };

  // *** Scene ***
  this.createObject = function (consClass, args) {
    if (typeof(consClass) != "function") consClass = jse.core.Entity;
    args = jse.util.mergeObjects(args, {
      loopManager: _p
    });
    var obj = new consClass(args);
    _p.objects.push(obj);
    return obj;
  };
  this.deleteObject = function(object){
    var index = _p.objects.indexOf(object);
    _p.objects.splice(index, 1);
  }
  // *** Controls ***
  this.start = function () {
    if (_p.intervalHandle) _p.stop();
    _p.intervalHandle = setInterval(_p.tick, _p.interval);
  };

  this.stop = function () {
    clearInterval(_p.intervalHandle);
    _p.intervalHandle = null;
  };

};