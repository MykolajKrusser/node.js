const Product = require('../models/product');

exports.getAddProduct = (req, res, next)=>{
  res.render('admin/addProduct', {docTitle: 'Add product', path: '/admin/add-product'});
};

exports.postAddProduct = (req, res, next)=>{
  const product = new Product(req.body.title)
  product.save();
  res.redirect('/');
};

exports.getProducts = (req, res)=>{
  Product.fetchAll((products)=>{
    res.render('admin/products', {prods: products, docTitle: 'Admin products', path: '/admin/products'});
  });
};