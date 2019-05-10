const express = require('express');

const router = express.Router();

const adminController = require('../controllers/admin');

router.get( '/edit-product' , adminController.getAddProduct);

router.get( '/products', adminController.getProducts);

router.post('/edit-product', adminController.postAddProduct);

router.get('/edit-product/:productId', adminController.getEditProduct);

module.exports = router;
