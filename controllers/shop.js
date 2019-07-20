const Product = require('../models/product');
const Orders = require('../models/orders');

exports.getProduct = (req, res, next)=>{
  Product
    .find()
    .then(products => {
      res.render('shop/productList', {prods: products, docTitle: 'Products', path: '/products'});
    })
    .catch(err => {
      console.log(err)
    });
};

exports.getProductDetails = (req, res)=>{
  const prodId = req.params.productId
  Product.findById(prodId)
    .then( product => {
      res.render(
        'shop/productDetail', 
        {docTitle: product.title, product: product, path: '/products'}
      )
    })
    .catch(err =>{
      console.log(err)
    });
};

exports.getIndex = (req, res)=>{
  Product
    .find()
    .then(products => {
      console.log(products)
      res.render('shop/index', {prods: products, docTitle: 'Shop', path: '/'});
    })
    .catch(err => {
      console.log(err)
    });
};

exports.getCart = (req, res)=>{
  req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user => {
      const product = user.cart.items;
      res.render('shop/cart', {
        products: product, 
        docTitle: 'Your cart', 
        path: '/cart'
      });
    })
    .catch(err=>{
      console.log(err)
    });
};

exports.postCart = (req, res)=>{
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then(product => {
      return req.user.addToCart(product);
    })
    .then(result =>{
      console.log(result)
      res.redirect('/cart')
    });
};

exports.postCartDeleteProduct = (req, res)=>{
  const prodId = req.body.productId;
  req.user
    .deleteItemfromCart(prodId)
    .then(result =>{
      res.redirect('/cart');
    })
    .catch(err =>{
      console.log(err)
    });
}

exports.postOrder = (req, res)=>{
  req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user => {
      const products = user.cart.items.map(item => {
        return {
          quantity: item.quantity,
          product: item.productId._doc
        }
      });
      const order = new Orders({
        user: {
          name: req.user.name,
          userId: req.user
        },
        products: products
      });
      return order.save();
    })
    .then(result=>{
      return req.user.clearCart();
    })
    .then(result => {
      res.redirect('/orders');
    })
    .catch(err =>{
      console.log(err);
    });
};

exports.getOrders = (req, res)=>{
  req.user
  .getOrders()
  .then(orders => {
    res.render('shop/orders', {orders: orders ,docTitle: 'Your orders', path: '/orders'});
  })
  .catch(err => {
    console.log(err)
  });
};

exports.getCheckout = (req, res)=>{
  res.render('shop/checkout', {docTitle: 'Your checkout', path: '/checkout'});
};

