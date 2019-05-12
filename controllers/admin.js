const Product = require('../models/product');

exports.getAddProduct = (req, res, next)=>{
  res.render('admin/editProduct', {
    docTitle: 'Edit product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next)=>{
  const title = req.body.title;
  const imgUrl = req.body.imgUrl;
  const description = req.body.description;
  const price = req.body.price;
  const product = new Product(null, title, imgUrl, description, price);
  product.save();
  res.redirect('/');
};

exports.getEditProduct = (req, res, next)=>{
  const editMode = req.query.edit
  if(!editMode){
    return res.redirect('/')
  }
  const prodId = req.params.productId;
  Product.findeById(prodId, product=>{
    if(!product){
      return redirect('/')
    }
    res.render('admin/editProduct', {
      docTitle: 'Edit product', 
      path: '/admin/edi-product',
      editing: editMode,
      product: product
    });
  })
};

exports.postEditedProduct = (req, res)=>{
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedImgUrl = req.body.imgUrl;
  const updatedPrice = req.body.price;
  const updatedDescription = req.body.description;
  const updatedProduct = new Product(prodId, updatedTitle, updatedImgUrl, updatedDescription, updatedPrice,);
  updatedProduct.save();
  res.redirect('/products')
};

exports.getProducts = (req, res)=>{
  Product.fetchAll((products)=>{
    res.render('admin/products', {prods: products, docTitle: 'Admin products', path: '/admin/products'});
  });
};