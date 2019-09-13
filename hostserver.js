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
