/* Check that the following program gives the wrong result.
   Correct it using a nested mapping.
   You need to [npm install and-then] (https://github.com/askabt/andthen).
*/

var sage = require('sage')
  , andthen = require('and-then')
  , util = require('./util.js');

var settings = {
  "index" : {
    "number_of_shards" : 1,
    "number_of_replicas" : 0
  }
};

var mappings = {};
mappings.person = {
  "properties" : {
    "name" : { "type" : "string", "index": "not_analyzed"},
    "education" : {
      "type" : "object",
      "properties" : {
        "name" : { "type" : "string", "index": "analyzed" },
        "finished" : { "type" : "boolean" }
      }
    }
  }
};

var person1 = {
  name: "Neo",
  education: [
    { name: "information management", finished: true },
    { name: "elasticsearch course", finished: false }
  ]
};

var person2 = {
  name: "Tow",
  education: [
    { name: "node.js", finished: true },
    { name: "elasticsearch course", finished: true }
  ]
};


var es = sage("http://localhost:9200");
var es_index = es.index("people");
var es_type = es_index.type("person");

var query = {
  "query": {
    "bool": {
      "must": [
        {
          "term": {
            "education.name": "elasticsearch"
          }
        },
        {
          "term": {
            "education.finished": true
          }
        }
      ]
    }
  }
};

util.do(es_index, "exists")
.then(function(exists){
  return exists ? util.do(es_index, "destroy")
                : andthen({}); // Return any value
})
.then(function(){return util.do(es_index, "create", {"settings": settings, "mappings": mappings})})
.then(function(){return util.do(es_type, "post", person1).and(util.do(es_type, "post", person2))})
.then(function(){return util.do(es_index, "refresh")})
.then(function(){return util.do(es_type, "find", query)})
.then(function(result){console.log(JSON.stringify(result, null, 2))});
