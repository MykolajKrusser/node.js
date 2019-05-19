const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const rootDir = require('./utils/path');
const db = require('./utils/database');

const app = express();

app.set('view engine', 'pug');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shop = require('./routes/shop');
const page404Controller = require('./controllers/404');

app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(rootDir, 'public')));
app.use('/admin', adminRoutes);
app.use(shop);

app.use(page404Controller.get404page);

app.listen(3030);