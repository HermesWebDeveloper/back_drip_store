const express = require('express');
const router = express.Router();
const { Category } = require('../models/create_models');

router.get('/search', async (req, res) => {
    try {
        const categories = await Category.findAll({ order: [['id', 'ASC']]});
        res.json(categories);
    } catch (error) {
        console.log('Erro ao buscar categorias: ', error);
    }
});

router.post('/', async (req, res) => {
    try {
        const { name, slug, use_in_menu } = req.body;
        const category = await Category.create({ name, slug, use_in_menu });
        res.status(201).json(category);
    } catch (error) {
        console.log('Erro ao criar categoria: ', error);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);

        if (!category) {
            return res.status(404).send("Categoria não encontrada!");
        };

        res.status(200).json(category);
    } catch (error) {
        console.log('Erro ao buscar categoria: ', error);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);

        if (!category) {
            return res.status(404).send("Categoria não encontrada!");
        };

        const { name, slug, use_in_menu } = req.body;

        if (name) category.name = name;
        if (slug) category.slug = slug;
        if (use_in_menu) category.use_in_menu = use_in_menu;

        await category.save();
        res.status(200).json(category);
    } catch (error) {
        console.log('Erro ao atualizar categoria: ', error);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);

        if (!category) {
            return res.status(404).send("Categoria não encontrada!");
        };

        category.destroy();
        res.status(200).json(category);
    } catch (error) {
        console.log('Erro ao deletar categoria: ', error);
    }
});

module.exports = router;