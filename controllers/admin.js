const Product = require('../models/product');

exports.getAddProduct = (req, res, next)=>{
  res.render('admin/editProduct', {docTitle: 'Edit product', path: '/admin/edit-product'});
};

exports.postAddProduct = (req, res, next)=>{
  const title = req.body.title;
  const imgUrl = req.body.imgUrl;
  const description = req.body.description;
  const price = req.body.price;
  const product = new Product(title, imgUrl, description, price);
  product.save();
  res.redirect('/');
};

exports.getEditProduct = (req, res, next)=>{
  const editMode = req.query.edit
  if(!editMode){
    return res.redirect('/')
  }
  res.render('admin/editProduct', {
    docTitle: 'Edit product', 
    path: '/admin/edi-product',
    editing: editMode
  });
};

exports.getProducts = (req, res)=>{
  Product.fetchAll((products)=>{
    res.render('admin/products', {prods: products, docTitle: 'Admin products', path: '/admin/products'});
  });
};