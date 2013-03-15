var ws = null;
var host = "wesen.local"
var port = 8080
var socket = "p5websocket"

var initSocket = function(target,onready,triggerElements,debug){
  
	console.log("trying to open a websocket... target is:",target)
	var _socket = (undefined==socket)?"":"/"+socket
	
	_url = "ws://"+host+":"+port+_socket
	
	if ('MozWebSocket' in window) ws = new MozWebSocket (_url);
  else ws = new WebSocket (_url);
	
	// When the connection is open, send some data to the server
	ws.onopen = function () {
	  console.log("opened")
	  // ws.send('Ping'); // Send the message 'Ping' to the server
    if (onready!=undefined) onready(); 
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
		if (debug) console.log("RAW: ",e.data);

    var message = e.data.split(":");
		if (!(message instanceof Array) && message.length < 2) return;

		var currentTarget = message.shift();
		if ( target != currentTarget) return;
		
	  if (debug) console.log('Message: ' + message[0], "Target: "+currentTarget);
    var te = $.Event(message.shift(), message);
		$(triggerElements || '*').trigger(te);
	};
  
  return ws;
}
