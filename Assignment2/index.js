const express = require('express');
const path = require('path');
const app = express();
const rootDir = require('./utils/path');

app.use(express.static(path.join(rootDir, 'public')));

app.use('/Second', (res, req, next)=>{
  req.sendFile(path.join(__dirname, "views", "second.html"))
})

app.use('/', (res, req, next)=>{
  req.sendFile(path.join(__dirname, "views", "first.html"))
})

app.listen(3000);