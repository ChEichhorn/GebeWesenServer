/*
  Simple WebSocketServer Example
  http://github.com/muthesius/WebSocketP5
 */

import processing.serial.*;

import muthesius.net.*;
import org.webbitserver.*;

Serial port;
WebSocketP5 socket;

void setup() {
  socket = new WebSocketP5(this,8080);
  
  String portNames[] = Serial.list();
  println(portNames);
  
  port = new Serial(this, portNames[4], 9600);
}

void draw() {}

void stop(){
  socket.stop();
}

void mousePressed(){
  socket.broadcast("hello from processing!");
}

void keyPressed() {
  if (key == 'p') {
    socket.broadcast("ipad:hallo ipad");
  }
  else if (key == 'v') {
    socket.broadcast("video:hallo video");
  }
}


void websocketOnMessage(WebSocketConnection con, String msg){
  String commands[] = msg.split(":");
  if(commands.length > 1 && commands[0].equals("arduino")) {
    char arduino_cmd = commands[1].charAt(0);
    println(arduino_cmd);
    port.write(arduino_cmd);
  } else {
    socket.broadcast(msg);
  }
}

void websocketOnOpen(WebSocketConnection con){
  println("A client joined");
}

void websocketOnClosed(WebSocketConnection con){
  println("A client left");
}


