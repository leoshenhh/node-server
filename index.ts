import * as http from "http";
import {IncomingMessage, ServerResponse} from "http";

const server =  http.createServer()

server.on('request',(request:IncomingMessage,response: ServerResponse) => {
    console.log(request.method,'request.method')
    console.log(request.url,'request.url')
    console.log(request.headers,'request.headers')
    response.end('hi')
})

server.listen(8888)
