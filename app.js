const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const adminRoutes = require('./routes/admin');
const shop = require('./routes/shop')

app.use(bodyParser.urlencoded({extended: false}));

app.use(adminRoutes);
app.use(shop);



app.listen(3030);