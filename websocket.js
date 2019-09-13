var express = require('express'),
    path = require('path'),
    app = express();
var http = require('http').createServer(app);

app.use('/client', express.static(__dirname +'/client'))
app.get('/', function(req, res){
    console.log("index", __dirname + '/client/index.html');
    res.sendFile(__dirname + '/client/index.html')
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});

const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 1234 });
CARROTS = [];
Isready = false;
function carrotSpawn(id){
    var carrot = {
        x: 0,
        y: 0,
        id: id,
    
    }
    carrot.x = Math.floor(Math.random()*(1440));
    carrot.y = Math.floor(Math.random()*(900));
    carrot.id = i;
    CARROTS.push(carrot);
    return carrot;

}
for(i = 0; i<10; i++){
    carrotSpawn(i);
}
carrotID = 10;
CLIENT = [];
IdCount = 0;
wss.on('connection', function connection(ws, request) {
    ws.on('message', function incoming(message) {
        var obj = JSON.parse(message);
        if(obj.packetType == "init"){
            console.log(`received: ${message}`);
            ws.name = obj.name;
            ws.id = IdCount;
            ws.color = obj.color;
            ws.points = 0;
            var ObjJson = JSON.stringify({
                packetType: "serverInit",
                playerName: obj.name,
                playerColor: obj.color,
                playerId: IdCount
                
            });
            ws.send(ObjJson);
            CLIENT.push(ws);
            (CLIENT).forEach(element => {
                if(element.id == ws.id){return}
                element.send(ObjJson);
                ws.send(
                    JSON.stringify({
                        packetType: "serverInit",
                        playerName: element.name,
                        playerColor: element.color,
                        playerId: element.id
                    })
                )

            })
            CARROTS.forEach(element => {
                var carmsg = JSON.stringify({
                    packetType: "serverSpawn",
                    x: element.x,
                    y: element.y,
                    spawnId: element.id,
                    spawnType: "Carrot"
                })
                ws.send(carmsg);
            });
            Isready = true;
            };
            if(obj.packetType === "update"){
                let x = CLIENT.findIndex(z => z.id == ws.id);
                CLIENT[x].x = obj.x;
                CLIENT[x].y = obj.y;
                CLIENT[x].dir = obj.dir;
                CLIENT[x].aniI = obj.aniI;
                CARROTS.forEach(carrot => {
                    var difx = Math.abs(carrot.x - Number(obj.x));
                    var dify = Math.abs(carrot.y - Number(obj.y));
                    if(difx < 30 && dify < 30){
                        console.log("pick")
                        ws.points += 1;
                        CLIENT.forEach(dd => {
                            
                            dd.send(JSON.stringify({
                                packetType: "serverPick",
                                spawnId: carrot.id
                            }))
                        });
                        CARROTS.splice(CARROTS.indexOf(carrot), 1);
                        var newcarrot = carrotSpawn(carrotID += 1);
                        CLIENT.forEach(element => {
                            element.send(JSON.stringify({
                                packetType: "serverSpawn",
                                x: newcarrot.x,
                                y: newcarrot.y,
                                spawnId: newcarrot.id,
                                spawnType: "Carrot"
                            }))
                        })
                        
                    }
                })
                var sendmsg = ServerUpdate();
                ws.send(sendmsg);

            IdCount += 1;
        }
        
    });
});

var ServerUpdate = function(){
    if(CLIENT.length > 0){
        if(CLIENT[0].hasOwnProperty('x')){
            var sendObject = {
                packetType: "serverUpdate",
                players: []
            };
            CLIENT.map(function(item){
                sendObject.players.push({
                    id: item.id,
                    x: item.x,
                    y: item.y,
                    aniI: item.aniI,
                    dir: item.dir,
                    points: item.points
                })
            });

            var json = JSON.stringify(sendObject);
            
            return json;
    }
}



}

setInterval(function(){
    
    for(j = 0; j<CLIENT.length; j++){
        if(CLIENT[j].readyState === WebSocket.CLOSED){
            console.log("player disconected")
            var msg = JSON.stringify({
                packetType: "serverQuit",
                playerId: CLIENT[j].id
            })
            CLIENT.forEach(element =>{
                element.send(msg);
            })
            CLIENT.splice(j, 1);
        }
    }
        //CLIENT.splice(j, 1);

    
}, 500);
