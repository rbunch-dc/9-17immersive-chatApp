// http is part of core. We need it to run createServer
const http = require('http');
// We need to bring in the Express module so we can use the router, public folder, etc.
const express = require('express');
// console.log(typeof(express));
var app = express();

app.get('/', (req,res,next)=>{
	res.send("Hello, World");
});

// run createServer against http like always, but hand it the app (express)
var server = http.createServer(app);
server.listen(8080);
console.log("The server is lisening on port 8080");


// setTimeout(wait,1000)
// function wait(){
// 	console.log("Test")
// 	return 
// }