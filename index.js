let http    = require('http');
let fs      = require('fs');
const {parse} = require('querystring');
let db = [];


let coso = () => {
        let content = "";
        let size = db.length;
        for(let i = 0; i < size; i++){
            content+= "<h2>" + db[i] + "</h2>"; 
        }
        return content;
    }

let server = http.createServer((req, res) => {
    
    res.writeHead(200, {"content-type":"text/html"});
    
    if (req.url=='/') fs.readFile('./index.html', (err, data) => res.end(data));
    
    if(req.url=='/keep') res.end(`<!DOCTYPE html><html><head><meta http-equiv="refresh" content="1"></head><body>${coso()}</body></html>`);
    if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk.toString());
        req.on('end', () => db.unshift(Object.values(body).join('')));
    } 

});
    
server.listen(3000, function(){console.log("server on");});
