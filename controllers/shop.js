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
