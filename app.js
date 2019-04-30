const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const adminRoutes = require('./routes/admin');
const shop = require('./routes/shop')

app.use(bodyParser.urlencoded({extended: false}));

app.use('/admin', adminRoutes);
app.use(shop);

app.use((req, res, next)=>{
  res.status(404).sendFile(path.join(__dirname, 'views', 'page404.html'))
});

app.listen(3030);