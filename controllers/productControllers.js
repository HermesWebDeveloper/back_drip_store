const { Product, ImagesProduct, Product_Category, Category, OptionsProduct } = require('../models/create_models');

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

exports.criarProduto = async (req, res) => {
    try {
        const { enabled, name, slug, stock, description, price, price_with_discount, category_ids, images, options } = req.body;
        const newProduct = await Product.create({ enabled, name, slug, stock, description, price, price_with_discount });

        for (var i in images) {
            await ImagesProduct.create({ path: images[i].content, product_id: newProduct.id, enabled: newProduct.enabled });
        };
        
        for (var i in category_ids) {
            await Product_Category.create({ product_id: newProduct.id, category_id: category_ids[i] });
        };

        for (var i in options) {

            if (options[i].radius){
                await OptionsProduct.create({ product_id: newProduct.id, title: options[i].title, shape: options[i].shape, radius: options[i].radius, type: options[i].type, values: options[i].values });
            } else {
                await OptionsProduct.create({ product_id: newProduct.id, title: options[i].title, shape: options[i].shape, type: options[i].type, values: options[i].values });
            };
        };

        res.status(201).json(newProduct);
    } catch (error) {
        console.log('Erro ao criar produto: ', error);
    }
}