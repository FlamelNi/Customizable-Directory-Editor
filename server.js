const express = require('express');
var http = require('http');
var fs = require('fs'); 
const { prototype } = require('module');
const app = express();
const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res
    .status(200)
    .send('Hello server is running')
    .end();
});
 

http.createServer(function (req, res) {
  fs.readFile('index.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
}).listen(PORT);




