/*
  Install dependencies:
  * npm install request

  Before you run this exercise:
  Change the name of the index and type.
  Change the fieldname and value in the query.

  See also:
  http://www.elasticsearch.org/guide/en/elasticsearch/reference/current/query-dsl-multi-match-query.html
*/

var fs = require('fs');
var request = require('request');

var url = 'http://localhost:9200/insert-your-index-name/insert-your-type-name';

var callback = function(error, response, result){
  if (error) {
    console.log("ERROR: "+error);
  } else if (response.statusCode >= 400) {
    console.log("Response code: "+response.statusCode);
    console.log("ERROR: "+result);
  } else {
    console.log("Response code: "+response.statusCode);
    console.log(JSON.stringify(JSON.parse(result), null, 2));
  }
};

var query = {
  "multi_match" : {
  }
};

request.post(
  {
    url: url+"/_search",
    body: JSON.stringify({
      "query" : query
    })
  },
  callback
);
