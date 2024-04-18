const express = require('express');
var axios = require('axios');
var http = require('http');
var https = require('https');
var url = require('url');
var fs = require('fs');
const fsPromises = require('fs').promises;
const { prototype } = require('module');
const app = express();
const PORT = process.env.PORT || 8080;
var path = require('path');

const serveFile = async (filePath, contentType, response) => {
    try {
        const rawData = await fsPromises.readFile(
            filePath,
            !contentType.includes('image') ? 'utf8' : ''
        );
        const data = contentType === 'application/json'
            ? JSON.parse(rawData) : rawData;
        response.writeHead(
            filePath.includes('404.html') ? 404 : 200,
            { 'Content-Type': contentType }
        );
        response.end(
            contentType === 'application/json' ? JSON.stringify(data) : data
        );
    } catch (err) {
        console.log(err);
        // myEmitter.emit('log', `${err.name}: ${err.message}`, 'errLog.txt');
        response.statusCode = 500;
        response.end();
    }
}

const server = http.createServer((req, res) => {
    // console.log(req.url, req.method);
    // myEmitter.emit('log', `${req.url}\t${req.method}`, 'reqLog.txt');

    // if (req.url)
    // console.log(req.method)
    // console.log(req.url)

    if (req.method == "POST" && req.url.split('/')[0] == 'upload') {
        console.log('upload test')
    }

    const extension = path.extname(req.url);

    let contentType;

    switch (extension) {
        case '.css':
            contentType = 'text/css';
            break;
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.jpg':
            contentType = 'image/jpeg';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.txt':
            contentType = 'text/plain';
            break;
        default:
            contentType = 'text/html';
    }

    let filePath =
        contentType === 'text/html' && req.url === '/'
            ? path.join(__dirname, 'views', 'index.html')
            : contentType === 'text/html' && req.url.slice(-1) === '/'
                ? path.join(__dirname, 'views', req.url, 'index.html')
                : contentType === 'text/html'
                    ? path.join(__dirname, 'views', req.url)
                    : path.join(__dirname, req.url);

    // console.log(req.url)
    // console.log(filePath)
    if (req.url.includes("/static/")) {
        filePath = path.join(__dirname, req.url);
    }

    if (req.url == "/weather") {
        

        // axios.get(`api.openweathermap.org/data/2.5/forecast?lat=37.7749&lon=122.4194&appid=94bca9a1175503686db16ec39b95265a`)
        // .then(response => {
        //     console.log(response.data.url);
        //     console.log(response.data.explanation);
        // })
        // .catch(error => {
        //     console.log(error);
        // });

        console.log('test')
        fetch(`api.openweathermap.org/data/2.5/forecast?lat=37.7749&lon=122.4194&appid=94bca9a1175503686db16ec39b95265a`)
            .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
            })
            .then(data => {
            console.log(data);
            })
            .catch(error => {
            console.error('Error:', error);
            });

        res.writeHead(200, {"Content-Type": "text/plain"});
        res.write("Hello World!");
        res.end();
        // get_weather(function (resp, body) {
        //     res.write(resp);
        //     res.end();
        // });

    } else {
        // makes .html extension not required in the browser
        if (!extension && req.url.slice(-1) !== '/') filePath += '.html';
    
        const fileExists = fs.existsSync(filePath);
    
        if (fileExists) {
            serveFile(filePath, contentType, res);
        } else {
            switch (path.parse(filePath).base) {
                case 'old-page.html':
                    res.writeHead(301, { 'Location': '/new-page.html' });
                    res.end();
                    break;
                case 'www-page.html':
                    res.writeHead(301, { 'Location': '/' });
                    res.end();
                    break;
                default:
                    serveFile(path.join(__dirname, 'views', '404.html'), 'text/html', res);
            }
        }
    }//else

});
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

var weather_data = "";
function get_weather(f) {
    request.get(`api.openweathermap.org/data/2.5/forecast?lat=37.7749&lon=122.4194&appid=94bca9a1175503686db16ec39b95265a`, function(err, resp, body) {
        f(resp, body);
    });
    // $.ajax({
    //     url:`api.openweathermap.org/data/2.5/forecast?lat=37.7749&lon=122.4194&appid=94bca9a1175503686db16ec39b95265a`,
    //     success: function (data) {
    //         f(data);
    //     }
    // });

    return "test weather"
}


