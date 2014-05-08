/*
  Install dependencies:
  * npm install request

  Generate data and put it in data.json.
  Change the name of the index and type below, before you run this exercise.
*/

var fs = require('fs');
var request = require('request');

var url = 'http://localhost:9200/insert-your-index-name/insert-your-type-name';

var callback = function(error, response, result){
  if (error) {
    console.log("ERROR: "+error);
  } else {
    console.log("Response code: "+response.statusCode);
    console.log(JSON.stringify(JSON.parse(result), null, 2));
  }
};


// Read the data.
fs.readFile('data.json', 'utf8', function(err, data){
  // Handle error or index the data
  if (err) throw err;
  var documents = JSON.parse(data);
  for (var i in documents) {
    request.post({
        url: url,
        body: JSON.stringify(documents[i], null, 0)
      }, callback);
  }
});

