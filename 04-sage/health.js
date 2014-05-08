/*
  Dependencies:
    npm install sage
*/
var util = require('./util.js');
var sage = require('sage');

var es = sage("http://localhost:9200");
es.health({level: "indices"}, util.log("health"));
