const Product = require('../models/product');
const db = require('../utils/database');

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
  const product = new Product(title, price, description, imgUrl);
  product
    .save()
    .then(result => {
      //console.log(result)
      res.redirect('add-product')
    })
    .catch(err=> {
      console.log(err)
    })
};

// exports.getEditProduct = (req, res, next)=>{
//   const editMode = req.query.edit
//   if(!editMode){
//     return res.redirect('/')
//   }
//   const prodId = req.params.productId;
//   req.user
//     .getProducts({where: {id: prodId}})
//     .then(products => {
//       const product = products[0];
//       if(!product){
//         return res.redirect('/');
//       };
//       res.render('admin/editProduct', {
//         pageTitle: 'Edit product',
//         path: 'admin/edit-product',
//         editing: editMode,
//         product: product
//       });
//     })
//     .catch(err => console.log(err));
// };

// exports.postEditedProduct = (req, res)=>{
//   const prodId = req.body.productId;
//   const updatedTitle = req.body.title;
//   const updatedImgUrl = req.body.imgUrl;
//   const updatedPrice = req.body.price;
//   const updatedDescription = req.body.description;
//   Product
//     .findByPk(prodId)
//     .then(product => {
//       product.title = updatedTitle;
//       product.imgUrl = updatedImgUrl;
//       product.price = updatedPrice;
//       product.description = updatedDescription;
//       return product.save()
//     })
//     .then(result => {
//       console.log('Updated product!')
//       res.redirect('/products');
//     })
//     .catch(err => {
//       console.log(err)
//     });
 
// };

// exports.getProducts = (req, res)=>{
//   req.user
//   .getProducts()
//   .then(products => {
//     res.render('admin/products', {prods: products, docTitle: 'Admin products', path: '/admin/products'});
//   })
//   .catch(err => console.log(err));
// };

// exports.postDeleteProduct = (req, res)=>{
//   const deletedProductId = req.body.productId;
//   Product
//     .findByPk(deletedProductId)
//     .then(product => {
//       return product.destroy();
//     })
//     .then(result => {
//       console.log('Destroyed product!')
//       res.redirect('/admin/products');
//     })
//     .catch(err => {
//       console.log(err);
//     });
// };