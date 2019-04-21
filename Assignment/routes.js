
const requestHandler = (req, res)=>{
  const url = req.url;
  const method = req.method;
  if( url === '/' ){
    res.write('<html>');
    res.write('<head><title>Enter Message</title></head>');
    res.write('<body>');
    res.write('<h1>Dummy text</h1>');
    res.write('<form action="/create-user" method="POST"><input name="username" type="text"/><button type="submit">Send</button></form>');
    res.write('</body>');
    res.write('</html>');
    return res.end();
  };
  if( url === '/users'){
    res.write('<html>');
    res.write('<head><title>Enter Message</title></head>');
    res.write('<body>');
    res.write('<ul><li>User 123</li><li>User 234</li><li>User 345</li></ul>');
    res.write('</body>');
    res.write('</html>');
    return res.end();
  };
  if( url === '/create-user' && method === 'POST'){
    const reqBody = [];
    req.on('data', (chunk)=>{
      console.log(chunk);
      reqBody.push(chunk);
      const parsReqBody = Buffer.concat(reqBody).toString();
      const user = parsReqBody.split('=')[1]
      console.log(user)
      res.statusCode = 302;
      res.setHeader('Location', '/');
      return res.end();
    });
  };
}

exports.handler = requestHandler;