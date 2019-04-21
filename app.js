const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res)=>{
  const url = req.url;
  const method = req.method;
  if (url === '/') {
    res.write('<html>');
    res.write('<head><title>Enter Message</title></head>')
    res.write('<body>')
    res.write('<form action="/message" method="POST"><input name="message" type="text"/><button type="submit">Submit</button></form>')
    res.write('</body>')
    res.write('</html>')
    return res.end()
  } 
  if (url === '/message' && method === 'POST'){
    fs.writeFileSync('message.txt', "Dummy");
    res.statusCode = 302;
    res.setHeader('Location', '/');
    return res.end();
  }
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>Helllo  Node.js</title></head>')
  res.write('<body>')
  res.write('<h1>Helllo from Node.js server</h1>')
  res.write('</body>')
  res.write('</html>')
  res.end()
});

server.listen(3030)