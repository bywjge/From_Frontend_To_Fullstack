// http-simple.js

const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    // console.log(req.url);
    // console.log(url.parse(`http://${req.headers.host}${req.url}`))
    const {pathname} = url.parse(`http://${req.headers.host}${req.url}`);
    if(pathname === '/') {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end('<h1>Hello world</h1>');
        // res.end();
    } else {
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end('<h1>Not Found</h1>');
    }
});

server.on('clientError', (err, socket) => {
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

server.listen(8080, () => {
    console.log('opened server on', server.address());
});
