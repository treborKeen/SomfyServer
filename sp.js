var fs = require('fs');

var b = require('bonescript');

var SerialPort = require("serialport");
var serialport = require("serialport");
var sp = new SerialPort("/dev/ttyO2", {
    baudrate: 9600,
    parser: serialport.parsers.readline("\r")
 });
 
var io;

function start(ser) {

io = require('socket.io').listen(ser);


 sp.on("open", function () {
    console.log('open');
 })
 
 io.sockets.on('connection', function (socket) {
 
  
  socket.on('update', function (zone, data) {

    console.log("update: "+ zone+' with value '+ data);
    sp.write('01'+zone+data+"\r");
  });
  
  socket.on('updateAll', function (data) {

    console.log("update all called"+data);
    sp.write('0116'+data+'\r');
    //setTimeout(function() {
    sp.write('0110'+data+'\r');
    //}, 2000 );
  });

});//end io.socket.on
} //end start


exports.start = start;
