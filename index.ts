import * as http from "http";
import {IncomingMessage, ServerResponse} from "http";
import * as fs from "fs";
import * as path from "path";
import * as url from "url";

const server = http.createServer()

server.on('request', (request: IncomingMessage, response: ServerResponse) => {
    const {method, headers} = request
    const obj = url.parse(request.url)
    console.log(obj)
    switch (request.url) {
        case '/index.html':
            fs.readFile(path.resolve(__dirname, 'public', 'index.html'), (err, data) => {
                if (err) throw err
                response.end(data.toString())
            })
            break;
        case '/style.css':
            response.setHeader('Content-Type', 'text/css;charset=utf-8')
            fs.readFile(path.resolve(__dirname, 'public', 'style.css'), (err, data) => {
                if (err) throw err
                response.end(data.toString())
            })
            break;
        case '/main.js':
            response.setHeader('Content-Type','text/javascript;charset=utf-8')
            fs.readFile(path.resolve(__dirname, 'public', 'main.js'), (err, data) => {
                if (err) throw err
                response.end(data.toString())
            })
            break;
    }
})

server.listen(8888)
