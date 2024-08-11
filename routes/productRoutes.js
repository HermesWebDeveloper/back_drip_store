const express = require('express');
const router = express.Router();
const productControllers = require('../controllers/productControllers');

router.get('/search', productControllers.listarProdutos);
router.get('/:id', productControllers.obterProduto);

module.exports = router;