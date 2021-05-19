const router = require('express').Router();
let Product = require('../models/product.model');
let fs = require('fs')
const ProductController = require('../controllers/products.controller');

router.route('/').get(ProductController.getAllProducts)

router.route('/add').post(ProductController.addProduct)

router.route('/:id').get(ProductController.getOneProduct)

router.route('/edit/:id').post(ProductController.editProduct);

router.route('/:id').delete(ProductController.deleteProduct)

module.exports = router;