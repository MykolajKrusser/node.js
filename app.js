const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const rootDir = require('./utils/path');
const sequelize = require('./utils/database');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-items');

const app = express();

app.set('view engine', 'pug');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shop = require('./routes/shop');
const page404Controller = require('./controllers/404');

app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(rootDir, 'public')));
app.use((req, res, next)=>{
  User.findByPk(1)
    .then(user =>{
      req.user = user
      next()
    })
    .catch(err => {
      console.log(err)
    })
});

app.use('/admin', adminRoutes);
app.use(shop);

app.use(page404Controller.get404page);

//Table Relations
Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, {through: CartItem});
Product.belongsToMany(Cart, {through: CartItem});

sequelize
  //.sync({force: true})
  .sync()
  .then( result =>{
      return User.findByPk(1)
      //console.log(result);
    }
  )
  .then(user => {
    if(!user){
      return User.create({name: 'Nick', email: 'nick@n.n'})
    }
    return user
  })
  .then(user =>{
    return user.createCart({})
  })
  .then(user =>{
    app.listen(3030);
  })
  .catch(err => console.log(err))

