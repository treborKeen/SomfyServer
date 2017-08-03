//Copy of index in autorun
var server = require("../SomfyServer/server");
var router = require("../SomfyServer/router");
var requestHandlers = require("../SomfyServer/requestHandlers");
var serport = require("../SomfyServer/sp");
//var io = require('socket.io');

var handle = {};
handle["/"] = requestHandlers.main;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/main"] = requestHandlers.main;
handle["/greatRm"] = requestHandlers.greatRm;
handle["/mBed"] = requestHandlers.mBed;
handle["/public/css/styles.css"]=requestHandlers.styles;
handle["/public/js/control.js"]=requestHandlers.control;
handle["/public/images/favicon.ico"]=requestHandlers.favicon;
handle["/favicon.ico"]=requestHandlers.favicon;
handle["/apple-touch-icon.png"]=requestHandlers.touchicon;
handle["/apple-touch-icon-120x120.png"]=requestHandlers.touchicon;
handle["/favicon.svg"]=requestHandlers.svgfavicon;

var serv = server.start(router.route, handle);
serport.start(serv);