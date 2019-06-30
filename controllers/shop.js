const Product = require('../models/product');

exports.getProduct = (req, res, next)=>{
  Product
    .fetchAll()
    .then(products => {
      res.render('shop/productList', {prods: products, docTitle: 'Products', path: '/products'});
    })
    .catch(err => {
      console.log(err)
    });
};

exports.getProductDetails = (req, res)=>{
  const prodId = req.params.productId
  // Product.findAll({where: {id: prodId}})
  //   .then(product => {
  //     res.render(
  //       'shop/productDetail', 
  //       {docTitle: product[0].title, product: product[0], path: '/products'}
  //     )
  //   })
  //   .catch(err =>{
  //     console.log(err)
  //   })
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
}

exports.getIndex = (req, res)=>{
  Product
    .fetchAll()
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
    .then(product => { 
      res.render('shop/cart', {products: product, docTitle: 'Your cart', path: '/cart'});
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
  // let fetchedCart;
  // let newQuantity = 1;
  // req.user
  //   .getCart()
  //   .then(cart =>{
  //     fetchedCart = cart;
  //     return cart.getProducts({where: {id: productId}});
  //   })
  //   .then(products =>{
  //     let product;
  //     if(products.length > 0){
  //       product = products[0];
  //     };
  //     if(product){
  //       const oldQuantity = product.cartItem.quantity;
  //       newQuantity = oldQuantity + 1;
  //       return product
  //     };
  //     return Product.findByPk(productId)
        
  //   })
  //   .then(product =>{
  //     return fetchedCart.addProduct(product, {
  //       through: {quantity: newQuantity}
  //     })
  //   })
  //   .then(()=>{
  //       res.redirect('/cart')
  //     }
  //   )
  //   .catch(err => {
  //     console.log(err)
  //   })
};

exports.postCartDeleteProduct = (req, res)=>{
  const prodId = req.body.productId;
  req.user
    .getCart()
    .then(cart =>{
      return cart.getProducts({where: {id: prodId}})
    })
    .then(products =>{
      const product = products[0];
      return product.cartItem.destroy();
    })
    .then(result =>{
      res.redirect('/cart');
    })
    .catch(err =>{
      console.log(err)
    });
}

exports.postOrder = (req, res)=>{
  let fetchedCart;
  req.user
    .getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts();
    })
    .then(products => {
      return req.user.createOrder()
        .then(order =>{
          return order.addProduct(products.map(product=>{
            product.orderItem = {quantity: product.cartItem.quantity};
            return product;
          }));
        })
        .catch(err => {
          console.log(err);
        });
    })
    .then(result => {
      return fetchedCart.setProducts(null);
    })
    .then(result=>{
      res.redirect('/orders');
    })
    .catch(err =>{
      console.log(err);
    });
};

exports.getOrders = (req, res)=>{
  req.user.getOrders({include: ['products']})
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

