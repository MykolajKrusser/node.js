const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProduct = (req, res, next)=>{
  Product.fetchAll((products)=>{
    res.render('shop/productList', {prods: products, docTitle: 'Products', path: '/products'});
  });
};

exports.getProductDetails = (req, res)=>{
  const prodId = req.params.productId
  Product.findeById(prodId, product => {
    res.render('shop/productDetail', {docTitle: product.title, product: product, path: '/products'})
  })
}

exports.getIndex = (req, res)=>{
  Product.fetchAll((products)=>{
    res.render('shop/index', {prods: products, docTitle: 'Shop', path: '/'});
  });
};

exports.getCart = (req, res)=>{
  res.render('shop/cart', {docTitle: 'Your cart', path: '/cart'});
};

exports.postCart = (req, res)=>{
  const productId = req.body.productId;
  Product.findeById(productId, product=>{
    Cart.addProduct(productId, product.price);
  });
  res.redirect('/cart')
};

exports.getCheckout = (req, res)=>{
  res.render('shop/checkout', {docTitle: 'Your checkout', path: '/checkout'});
};

exports.getOrders = (req, res)=>{
  res.render('shop/orders', {docTitle: 'Your orders', path: '/orders'});
};
