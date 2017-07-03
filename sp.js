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

    
  socket.on('zvol', function (zone, data) {

    console.log('zone: '+zone+'  level: '+data);
    sp.write("&AH66,VOL,"+zone+','+data+"\r");
  });
  
  
  socket.on('zoneSelect', function(zone, data) {
  
    console.log("Audio for: " + zone + ' with value ' + data);
    if (data[0] == 'R') {
      sp.write("&AH66,AUD," + zone + ',' + data + "\r");
    }
    else {
      sp.write("&AH66,AUD," + zone + ',' + data.substring(1) + "\r");
    }
  
  });
  socket.on('trebelSelect', function(zone, data) {
  
    console.log("Trebel for: " + zone + ' with value ' + data);
     if(data >0)
      sp.write("&AH66,TRE," + zone  + ',' + '+' + ','+Math.abs(data)+"\r");
    else if(data < 0)
      sp.write("&AH66,TRE," + zone  + ',' + '-' + ','+Math.abs(data)+"\r");
    else
      sp.write("&AH66,TRE," + zone  + ',' + ','+data+"\r");
    
  
  });
  socket.on('bassSelect', function(zone, data) {
  
    console.log("Bass for: " + zone + ' with value ' + data);
    if(data >0)
      sp.write("&AH66,BAS," + zone  + ',' + '+' + ','+Math.abs(data)+"\r");
    else if(data < 0)
      sp.write("&AH66,BAS," + zone  + ',' + '-' + ','+Math.abs(data)+"\r");
    else
      sp.write("&AH66,BAS," + zone  + ',' + ','+data+"\r");
  });
  
  socket.on('updateZone', function (data) {
 
    console.log('zone selected: '+data);
    sp.write('&AH66,ZQRY,'+data+',?\r');
    
 });
 
  socket.on('page', function (data) {

    console.log("Page: "+' with value '+ data);
    sp.write("01"+data+"\r");
  });
  
  socket.on('page2', function (zone, data) {

    console.log("page: "+ zone+' with value '+ data);
    sp.write('01'+zone+data+"\r");
  });
  
  socket.on('allDown', function () {

    console.log("All Down");
    sp.write('0116D\r');
  });

});//end io.socket.on
} //end start


exports.start = start;
