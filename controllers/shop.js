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
  Product.findeById(prodId)
    .then(([product])=>{
      res.render(
        'shop/productDetail', 
        {docTitle: product[0].title, product: product[0], path: '/products'}
      )
    })
    .catch(err =>{
      console.log(err)
    })

  product => {
    
  }
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
  Cart.getCart(cart =>{
    Product.fetchAll(products=>{
      const cartProducts = [];
      for(product of products){
        const cartProductData = cart.products.find(prod => prod.id === product.id);
        if(cartProductData){
          cartProducts.push({productData: product, qty: cartProductData.qty});
        };
      };
      res.render('shop/cart', {products: cartProducts, docTitle: 'Your cart', path: '/cart'});
    });
  });
};

exports.postCart = (req, res)=>{
  const productId = req.body.productId;
  Product.findeById(productId, product=>{
    Cart.addProduct(productId, product.price);
  });
  res.redirect('/cart')
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
