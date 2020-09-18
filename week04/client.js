const net = require('net');

class Request {
  constructor(options){
    this.method = options.method || 'GET';
    this.host = options.host;
    this.port = options.port || 80;
    this.path = options.path || '/';
    this.headers = options.headers || {};
    this.body = options.body || {};
    if(!this.headers['Content-Type']){
      this.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    }
    if(this.headers['Content-Type']==='application/json'){
      this.bodyText = JSON.stringify(body);
    }
    if(this.headers['Content-Type']==='application/x-www-form-urlencoded'){
      this.bodyText = Object.keys(this.body).map(key=>`${key}=${encodeURIComponent(this.body[key])}`).join('&');
    }
    this.headers["Content-lenght"] = this.bodyText.length;
  }
  send(connection){
    return new Promise((res,rej)=>{
      const parser = new ResponseParser;
      if(connection){
        connection.write(this.toString());
      }else{
        connection = net.createConnection({
          host:this.host,
          port:this.port
        },()=>{
          connection.write(this.toString());
        })
      }
      connection.on('data',(data)=>{
        console.log(data.toString());
        parser.receive(data.toString());
        if(parser.isFinished){
          res(parser.response);
          connection.end();
        }
      });
      connection.on('error',err=>{
        rej(err);
        connection.end();
      })
    })
  }
  toString(){
    return `${this.method} ${this.path} HTTP/1.1\r
    ${Object.keys(this.headers).map(key=>`${key}: ${this.headers[key]}`).join('\r\n')}\r
    \r
    ${this.bodyText}`
  }
}

class ResponseParser{
  constructor(){
    this.WAITING_STATUS_LINE = 0;
    this.WAITING_STATUS_LINE_END = 1;
    this.WAITING_HEADER_NAME = 2;
    this.WAITING_HEADER_SPACE = 3;
    this.WAITING_HEADER_VALUE = 4;
    this.WAITING_HEADER_LINE_END = 5;
    this.WAITING_HEADER_BLOCK_END = 6;
    this.WAITING_BODY = 7;

    this.current = this.WAITING_STATUS_LINE;
    this.statusLine = '';
    this.headers = {};
    this.headerName = '';
    this.headerValue = '';
    this.bodyParser = null;
  }
  receive(string){
    for(let i = 0;i<string.length;i++){
      this.receiveChar(string.charAt(i));
    }
  }
  receiveChar(char){
    if(this.current===this.WAITING_STATUS_LINE){
      if(char==='\r'){
        this.current = this.WAITING_STATUS_LINE_END;
      }else{
        this.statusLine+=char;
      }
    }else if(this.current===this.WAITING_STATUS_LINE_END){
      if(char==='\n'){
        this.current = this.WAITING_HEADER_NAME;
      }
    }else if(this.current === this.WAITING_HEADER_NAME){
      if(char===':'){
        this.current = this.WAITING_HEADER_SPACE;
      }else if(char==='\r'){
        this.current = this.WAITING_HEADER_BLOCK_END;
      }else{
        this.headerName+=char;
      }
    }else if(this.current===this.WAITING_HEADER_VALUE)
  }
}


void async function(){
  let request = new Request({
    method:'POST',
    host:'127.0.0.1',
    port:'9999',
    path:'/',
    headers:{
      ['X-Foo2']:'customed'
    },
    body:{
      name:'winter'
    }
  })
  let response = await request.send();
  console.log(response);
}();