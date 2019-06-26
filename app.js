const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const rootDir = require('./utils/path');


const app = express();

app.set('view engine', 'pug');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shop = require('./routes/shop');
const page404Controller = require('./controllers/404');
const mongoConnect = require('./utils/database').mongoConnect;

const User = require('./models/user');

app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(rootDir, 'public')));
app.use((req, res, next)=>{
  User.findById('5d0f83917dfa931adcc38608')
    .then(user =>{
      req.user = new User(user.name, user.email, user.cart, user._id)
      next()
    })
    .catch(err => {
      console.log(err)
    })
});

app.use('/admin', adminRoutes);
app.use(shop);

app.use(page404Controller.get404page);

mongoConnect(() => {
  app.listen(3000);
})
