const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const adminRoutes = require('./routes/admin');
const shop = require('./routes/shop')

app.use(bodyParser.urlencoded({extended: false}));

app.use(adminRoutes);
app.use(shop);

app.use((req, res, next)=>{
  res.status(404).send('<h1>Page Not Found</h1>')
});

app.listen(3030);