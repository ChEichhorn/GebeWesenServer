var ws = null;
var host = "Christophs-MacBook-Air.local"
var port = 8080
var socket = "p5websocket"

var initSocket = function(target){
	console.log("trying to open a websocket... target is:",target)
	var _socket = (undefined==socket)?"":"/"+socket
	
	_url = "ws://"+host+":"+port+_socket
	
	if ('MozWebSocket' in window) ws = new MozWebSocket (_url);
else ws = new WebSocket (_url);
	
	// When the connection is open, send some data to the server
	ws.onopen = function () {
	  console.log("opened")
	  ws.send('Ping'); // Send the message 'Ping' to the server
	};

	// oh, it did close
	ws.onclose = function (e) {
	  console.log('WebSocket did close ',e);
	};
	
	// Log errors
	ws.onerror = function (error) {
	  console.log('WebSocket Error ' + error);
	};

	ws.onmessage = function (e) {
		console.log("RAW: ",e.data);
		var message = e.data.split(":");
		if (message.length < 2) return;
		
		var target = message[0];
		if ( target != target) return;
		
	  	console.log('Message: ' + message[1], "Target: "+target);
		$('*').trigger(message[1]);
	};
}