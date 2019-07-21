const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const rootDir = require('./utils/path');


const app = express();

app.set('view engine', 'pug');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shop = require('./routes/shop');
const auth = require('./routes/auth');


const page404Controller = require('./controllers/404');
const mongoose = require('mongoose');

const User = require('./models/user');

app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(rootDir, 'public')));

app.use((req, res, next)=>{
  User.findById('5d1ca45f0f711118b4696c75')
    .then(user =>{
      req.user = user;
      next();
    })
    .catch(err => {
      console.log(err);
    });
});

// Routes use
app.use('/admin', adminRoutes);
app.use(shop);
app.use(auth);

app.use(page404Controller.get404page);

mongoose.connect(
  'mongodb+srv://nicko:nicko123@cluster0-zfaem.mongodb.net/shop?retryWrites=true&w=majority'
).then(result => {
  User.findOne().then(user => {
    if(!user){
      const user = new User({
        name: 'Nicko',
        email: 'nicko@gmai.com',
        cart: {
          items: []
        }
      })
      user.save()
    }
  })
  app.listen(3000)
}).catch(err => {
  console.log(err)
});
