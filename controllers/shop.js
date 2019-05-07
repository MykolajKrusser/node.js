const Product = require('../models/product');

exports.getProduct = (req, res, next)=>{
  Product.fetchAll((products)=>{
    res.render('shop/productList', {prods: products, docTitle: 'Products', path: '/products'});
  });
};

exports.getIndex = (req, res)=>{
  Product.fetchAll((products)=>{
    res.render('shop/index', {prods: products, docTitle: 'Shop', path: '/'});
  });
};

exports.getCart = (req, res)=>{
  res.render('shop/cart', {docTitle: 'Your cart', path: '/cart'});
};

exports.getCheckout = (req, res)=>{
  res.render('shop/checkout', {docTitle: 'Your checkout', path: '/checkout'});
};

exports.getOrders = (req, res)=>{
  res.render('shop/orders', {docTitle: 'Your orders', path: '/orders'});
};
