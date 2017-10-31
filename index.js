// http is part of core. We need it to run createServer
const http = require('http');
// We need to bring in the Express module so we can use the router, public folder, etc.
const express = require('express');
const socketio = require("socket.io");

// console.log(typeof(express));
var app = express();
app.use(express.static(__dirname + '/public'));	

var users = [];

// run createServer against http like always, but hand it the app (express)
var server = http.createServer(app);
server.listen(8080);
// make a new var called io that is listening to the listener
var io = socketio.listen(server); //ONly listening at ws://localhost:8080
// The way that socket.io works...
// 1. .on to listen
// 2. .emit to send
io.sockets.on('connect', (socket)=>{
	console.log(socket)
	console.log("Someone connected via a socket!!")
	// ADD ALL EVENT LISTENERS
	socket.on('nameToServer',(data)=>{
		var clientInfo = {
			name: data,
			clientId: socket.id
		}
		users.push(clientInfo);
		console.log(data);
		// emit takes 2 args (just like client):
		// 1. Event (we make this up, except for a few)
		// 2. Data to send
		io.sockets.emit('newUser',users);
	});
	socket.on('messageToServer',(messageObject)=>{
		console.log(messageObject);
		io.sockets.emit('messageToClient',messageObject)
	})
});

console.log("The server is lisening on port 8080");
