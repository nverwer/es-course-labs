/*
  Dependencies:
    npm install sage

  Create a JSON file with some data, and modify the code below to index it.

  See http://mikepb.github.io/sage/

  Warning: Do not use 0 as a document.id, because javascript thinks that it is false, and thus missing.
*/

var util = require('./util.js')
  , fs = require('fs')
  , sage = require('sage');

var es = sage("http://localhost:9200").index('insert-your-index-name').type('insert-your-type-name');

function index(document) {
  es.put(document, util.log("index"))
}

// Read the JSON data and index it.
fs.readFile('data.json', 'utf8', function(err, data){
  if (err) throw err;
  var documents = JSON.parse(data);
  documents.forEach(index);
});

