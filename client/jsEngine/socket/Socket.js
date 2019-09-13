jse.core.Socket = function(args){

    // Init
    var _p = this;
    this.socket = null;

    // Settings
    this.port = jse.util.getArg(args, "port", 1234);
    this.host = jse.util.getArg(args, "host", "ws://"+window.location.hostname)+":"+this.port+"/";

    this.autoReconnect = jse.util.getArg(args, "autoReconnect", true);
    this.reconnectTime = jse.util.getArg(args, "reconnectTime", 500);

    this.reconnectTimeCur = this.reconnectTime;
    this.lastSentMessage = null;

    this.onConnect = function(f) { $(_p).on("socket:connect", function(_,e){ f(e); }); };
    this.onDisconnect = function(f) { $(_p).on("socket:disconnect", function(_,e){ f(e);}); };
    this.onReceive = function(f) { $(_p).on("socket:receive", function(_,e){ f(e);}); };
    this.onSend = function(f) { $(_p).on("socket:send", function(_,e){ f(e); }); };

    this.connect = function() {
        _p.socket = new WebSocket(_p.host);
        _p.socket.onopen = function(e){
            $(_p).trigger("socket:connect", e);
        };
        _p.socket.onmessage = function(e){
            $(_p).trigger("socket:receive", e);
        };
        _p.socket.onclose = function(e){
            $(_p).trigger("socket:disconnect", e);
        };

        _p.onConnect(function(e, arg){
            _p.reconnectTimeCur = _p.reconnectTime;
        });
        _p.onDisconnect(function(e, arg){
            if (!_p.isConnected() && _p.autoReconnect){
                setTimeout(_p.connect, _p.reconnectTimeCur);
                if (_p.reconnectTimeCur < _p.reconnectTime *32) _p.reconnectTimeCur *= 2;
            }
        });
    };

    this.isConnected = function(){
        return _p.socket && _p.socket.readyState == WebSocket.OPEN;
    };

    // Functions
    this.send = function(msg) {
        if(!msg) return false;

        if (typeof(msg) == "object"){
            msg = JSON.stringify(msg);
        } else
        if (typeof(msg) == "string"){
        } else {
            return false;
        }

        _p.lastSentMessage = msg;
        var success = _p.socket.send(msg);
        $(_p).trigger("socket:send", msg);
        return success;
    };

    this.close = function(){
        if (!_p.isConnected()) return;
        _p.socket.close();
        _p.socket = null;
    };

    this.readyStateToStr = function(val){
        if (typeof(val) == "undefined" && _p.socket != null) val = _p.socket.readyState;
        switch (val){
            case WebSocket.CONNECTING: return "Connecting";
            case WebSocket.OPEN: return "Open";
            case WebSocket.CLOSING: return "Closing";
            case WebSocket.CLOSED: return "Closed";
            default: return "Unknown";
        }
    };

};
