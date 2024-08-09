const express = require('express');
const PORT = 10000;
const app = express();
const users = require('../routes/users');

app.use('/v1/user/', users)

app.get('/', (req, res) => {
    res.send('Olá, Mundo!');
});

app.listen(PORT, () => {
    console.log('Servidor rodando em: http://localhost:' + PORT)
})

module.exports = { app };