const express = require('express');
const router = express.Router();
const { User } = require('../models/create_models');

router.get('/', (req, res) => {
    res.send('Olá, Usuários!');
});

router.post('/', async (req, res) => {
    try {
        const {firstname, surname, email, password} = req.body;
        const newUser = await User.create({firstname, surname, email, password});
        res.status(201).json(newUser);
    } catch (error) {
        console.log('Erro ao criar usuário: ', error);
    };
});

module.exports = router;