const { Product } = require('../models/create_models');

exports.listarProdutos = async (req, res) => {
    try {
        const products = await Product.findAll({ order: [['id', 'ASC']]});
        res.status(200).json(products);
    } catch (error) {
        console.log('Erro ao listar produtos: ', error);
    }
};

exports.obterProduto = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);

        if (!product) {
            return res.status(404).send("Produto não encontrado!");
        };

        res.status(200).json(product);
    } catch (error) {
        console.log('Erro ao obter produto: ', error);
    }
};