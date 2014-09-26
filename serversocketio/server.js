var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendfile('index.html');
});

io.on('connection', function(socket){

	socket.on('adduser', function(username){
		socket.username = username;
		io.emit('storename', username);
	});


  socket.on('sendchat', function(msg){
	socket.broadcast.emit('sendchatclient', { message: msg, user:socket.username });
  });
  socket.on('changeslide', function(msg){
    io.emit('changeslideclient', msg);
  });
  
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});