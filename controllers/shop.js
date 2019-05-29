const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProduct = (req, res, next)=>{
  Product
    .findAll()
    .then(products => {
      res.render('shop/productList', {prods: products, docTitle: 'Products', path: '/products'});
    })
    .catch(err => {
      console.log(err)
    });
};

exports.getProductDetails = (req, res)=>{
  const prodId = req.params.productId
  Product.findAll({where: {id: prodId}})
    .then(product => {
      res.render(
        'shop/productDetail', 
        {docTitle: product[0].title, product: product[0], path: '/products'}
      )
    })
    .catch(err =>{
      console.log(err)
    })
  // Product.findByPk(prodId)
  //   .then( product => {
  //     res.render(
  //       'shop/productDetail', 
  //       {docTitle: product.title, product: product, path: '/products'}
  //     )
  //   })
  //   .catch(err =>{
  //     console.log(err)
  //   });
}

exports.getIndex = (req, res)=>{
  Product
    .findAll()
    .then(products => {
      res.render('shop/index', {prods: products, docTitle: 'Shop', path: '/'});
    })
    .catch(err => {
      console.log(err)
    });
};

exports.getCart = (req, res)=>{
  req.user
    .getCart()
    .then(cart => {
      return cart
        .getProducts()
        .then(products => {
          console.log(products)
          res.render('shop/cart', {products: products, docTitle: 'Your cart', path: '/cart'});
        })
        .catch(err =>{
          console.log(err)
        })
    })
    .catch(err=>{
      console.log(err)
    });
};

exports.postCart = (req, res)=>{
  const productId = req.body.productId;
  let fetchedCart;
  req.user
    .getCart()
    .then(cart =>{
      fetchedCart = cart;
      return cart.getProducts({where: {id: productId}});
    })
    .then(products =>{
      let product;
      if(products.length > 0){
        product = products[0];
      };
      let newQuantity = 1;
      if(product){

      };
      return Product.findByPk(productId)
        .then(product =>{
          return fetchedCart.addProduct(product, {through: {
            quantity: newQuantity
          }})
        })
        .then(
          res.redirect('/cart')
        )
        .catch(err => {
          console.log(err)
        });

    })
    .catch(err => {
      console.log(err)
    })
};

exports.postCartDeleteProduct = (req, res)=>{
  const prodId = req.body.productId;
  Product.findeById(prodId, product => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect('/cart');
  });
}

exports.getCheckout = (req, res)=>{
  res.render('shop/checkout', {docTitle: 'Your checkout', path: '/checkout'});
};

exports.getOrders = (req, res)=>{
  res.render('shop/orders', {docTitle: 'Your orders', path: '/orders'});
};
