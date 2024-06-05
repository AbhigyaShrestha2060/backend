const router = require('express').Router();
const productController = require('../controllers/productController');

router.post('/create', productController.createProduct);

//fetch all products

router.get('/get_all_products', productController.getAllProduct);

router.get('/get_single_product/:id', productController.getSingleProduct);

module.exports = router;
