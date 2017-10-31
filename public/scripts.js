// console.log("Sanity Check");
// setup the route to piggyback on
$(document).ready(()=>{
	var socketUrl = 'http://10.150.51.252:8080';
	// console.log(io);
	var socketio = io.connect(socketUrl);
	var name = prompt("What is your name?");
	// Take the users name and send it to the server
	// emit takes 2 args:
	// 1. Event (we make this up)
	// 2. Data to send via ws
	socketio.emit('nameToServer',name)
	socketio.on('newUser',(users)=>{
		// console.log(`${userName} just joined`);
		// $('#users').append(`<div class="col-sm-12">${userName}</div>`)
		var usersHTML = "";
		users.map((user)=>{
			usersHTML += `<div class="col-sm-12">${user.name}</div>`;
		});
		$('#users').html(usersHTML);
	});
	// Use jQuery to listen for form submit
	$('#submit-message').submit((event)=>{
		// stop the page from submitting
		event.preventDefault();
		// Get the value from the input box
		var newMessage = $('#new-message').val();
		// use socketio, to send data to the server
		socketio.emit('messageToServer',{
			name: name,
			message: newMessage
		});
	});
	socketio.on('messageToClient',(messageObject)=>{
		$('#messages').prepend(`<p>${messageObject.message} -- ${messageObject.name}</p>`);
	})
});