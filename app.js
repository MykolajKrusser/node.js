const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const rootDir = require('./utils/path');


const app = express();

app.set('view engine', 'pug');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
//const shop = require('./routes/shop');
const page404Controller = require('./controllers/404');
const mongoConnect = require('./utils/database');

app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(rootDir, 'public')));
app.use((req, res, next)=>{
  // User.findByPk(1)
  //   .then(user =>{
  //     req.user = user
  //     next()
  //   })
  //   .catch(err => {
  //     console.log(err)
  //   })
});

app.use('/admin', adminRoutes);
//app.use(shop);

app.use(page404Controller.get404page);

mongoConnect(() => {
  app.listen(3000);
})
