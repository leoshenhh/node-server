import * as http from "http";
import {IncomingMessage, ServerResponse} from "http";
import * as fs from "fs";
import * as path from "path";
import * as url from "url";

const server = http.createServer()
let cacheTime = 3600 * 24

server.on('request', (request: IncomingMessage, response: ServerResponse) => {
    const {method, headers} = request
    let {pathname, search} = url.parse(request.url)

    if(method !== 'GET') {
        response.statusCode = 405
        response.end()
        return
    }

    if (pathname === '/') {
        pathname = '/index.html'
    }
    fs.readFile(path.resolve(__dirname + '/public' + pathname), (err, data) => {
        if (err) {
            if (err.errno === -4058) {
                response.statusCode = 404
                fs.readFile(path.resolve( './public/404.html'), (err, data) => {
                    response.end(data)
                })
            } else if (err.errno === -4068) {
                response.statusCode = 403
                response.end('无权查看目录')
            } else {
                response.statusCode = 500
                response.end('server error')
            }
        }else{
            response.setHeader('Cache-Control',`public, max-age=${cacheTime}`)
            response.end(data)
        }

    })
})

server.listen(8888)
