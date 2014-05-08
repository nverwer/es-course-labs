/*
  Dependencies:
    npm install sage

  See http://mikepb.github.io/sage/#sage-type
*/

var util = require('./util.js')
  , fs = require('fs')
  , sage = require('sage');

var es = sage("http://localhost:9200").index('insert-your-index-name').type('insert-your-type-name');

var query = {
  "multi_match": {
    "fields": [
      "name",
      "tags"
    ],
    "query": "do find bird",
    "operator": "or"
  }
};

es.find({
  version: true,
  size: 4,
  fields: ["id", "name", "tags"],
  query: query
}, util.log("find"));
