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
  const product = new Product(title, imgUrl, description, price);
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

exports.getProducts = (req, res)=>{
  Product.fetchAll((products)=>{
    res.render('admin/products', {prods: products, docTitle: 'Admin products', path: '/admin/products'});
  });
};