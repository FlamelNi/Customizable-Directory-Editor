const express = require('express');
var http = require('http');
var fs = require('fs'); 
const app = express();

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
}).listen(8080);



// Start the server
// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => {
//   console.log(`App listening on port ${PORT}`);
//   console.log('Press Ctrl+C to quit.');
// });


