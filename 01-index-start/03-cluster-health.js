/*
  This uses https://github.com/mikeal/request.
  Go to your command prompt and type "npm install request".
*/

var request = require('request');

request('http://localhost:9200/_cluster/health',
  function(error, response, result) {
    if (!error && response.statusCode == 200) {
      console.log(JSON.stringify(JSON.parse(result), null, 2))
    }
  });
