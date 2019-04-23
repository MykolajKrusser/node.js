const express = require('express')

const app = express();
app.use((req, res, next)=>{
  console.log('hello from first middleware')
  next();
})
app.use((req, res, next)=>{
  console.log('hello from second middleware')
  res.send('<h1>Hello Express!!</h1>')
})

app.listen(3030)