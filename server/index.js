const googleTrends = require('google-trends-api');

var http = require('http');
var path = require('path');

//
// https://developer.mozilla.org/en-US/docs/Learn/Server-side/Node_server_without_framework

// some hosting services choose the port for you. when running locally you can choose your own port
const PORT = process.env.PORT || 2021;

http
  .createServer((request, response) => {
    console.log('request for data ', request.url);

    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Request-Method', '*');
    response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    response.setHeader('Access-Control-Allow-Headers', '*');

    googleTrends
      .autoComplete({ keyword: 'Back to School' })
      // the results of above get passed into the function
      .then((results) => {
        // data return type
        const json = JSON.parse(results);
        const parseData = json.default;

        console.log(JSON.stringify(parseData, null, 2));

        response.statusCode = 200;
        // send the data
        response.setHeader('Content-Type', 'application/json');
        response.write(JSON.stringify(parseData));
        response.end();
      })
      .catch((error) => {
        console.log('server error', error);
        response.statusCode = 500;
        // send the data
        response.setHeader('Content-Type', 'application/json');
        response.write(JSON.stringify(error));
        response.end();
      });
  })
  .listen(PORT);

console.log('🚀  Server running at http://localhost:' + PORT + '\n\n');
