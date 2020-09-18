const http = require('http');

let server = http.createServer((request,response)=>{
  let body = [];
  request.on('error',err=>console.log(err))
  .on('connect',()=>{
    console.log(arguments)
  })
  .on('data',chunk=>{
    console.log(1231);
    body.push(chunk.toString());
  })
  .on('end',()=>{
    body = Buffer.concat(body);
    console.log('body',body);
    response.writeHead(200,{'Content-Type':'text-xml'});
    response.end('Hello world');
  })
}).listen(9999);

