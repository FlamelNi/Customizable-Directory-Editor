const express = require('express');
var http = require('http');
var url = require('url');
var fs = require('fs');
const { prototype } = require('module');
const app = express();
const PORT = process.env.PORT || 8080;

// app.get('/', (req, res) => {
//   res
//     .status(200)
//     .send('Hello server is running')
//     .end();
// });


http.createServer(function (req, res) {
  var q = url.parse(req.url, true);
  
  var filename = "./static/view/404.html";
  if (q.pathname=="" || q.pathname=="/") {
    filename = "./view/index.html";
  } else {

  }
  console.log(q.pathname)
  
  fs.readFile(filename, function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
}).listen(PORT);




