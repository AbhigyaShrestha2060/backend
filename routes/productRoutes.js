const router = require('express').Router();
const productController = require('../controllers/productController');
const { authGuard } = require('../middleware/authGuard');

router.post('/create', productController.createProduct);
router.get('/get_all_products', productController.getAllProducts);
router.get('/get_one_product/:id', productController.getOneProduct);
router.put('/update_product/:id', productController.updateProduct);
router.delete('/delete/:id', productController.deleteProduct);

module.exports = router;
