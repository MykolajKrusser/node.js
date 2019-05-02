const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const rootDir = require('./utils/path');

const app = express();

app.set('view engine', 'pug');
app.set('views', 'views');

const adminData = require('./routes/admin');
const shop = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(rootDir, 'public')));
app.use('/admin', adminData.routes);
app.use(shop);

app.use((req, res, next)=>{
  res.status(404).sendFile(path.join(rootDir, 'views', 'page404.html'));
});

app.listen(3030);