/*
  This uses https://github.com/mikeal/request.
  Go to your command prompt and type "npm install request".
*/

var request = require('request');

var data = {
    "isActive": false,
    "age": 25,
    "name": "Wendi Armstrong",
    "gender": "female",
    "company": "ZOLAREX",
    "email": "wendiarmstrong@zolarex.com",
    "phone": "+1 (916) 592-3282",
    "latitude": 17.845702,
    "longitude": 69.974373,
    "tags": [
        "deserunt",
        "cillum",
        "consectetur",
        "enim",
        "aliquip",
        "irure",
        "amet"
    ]
};

var indexRequest = request.post({
    url: 'http://localhost:9200/test-index/test-type',
    body: JSON.stringify(data, null, 0)
  },
  function(error, response, result) {
    if (!error && response.statusCode == 200) {
      console.log(JSON.stringify(JSON.parse(result), null, 2))
    }
  }
);
