var http = require('http');

var request = http.request(
  {
    host: 'localhost',
    port: 9200,
    method: 'GET',
    path: '/'
  },
  function(response){
    console.log('STATUS: ' + response.statusCode);
    console.log('HEADERS: ' + JSON.stringify(response.headers));
    response.setEncoding('utf8');
    response.on('data', function (chunk) {
      console.log('BODY: ' + chunk);
    });
  }
);

request.on('error', function(e){
  console.log('problem with request: ' + e.message);
});

request.end();
