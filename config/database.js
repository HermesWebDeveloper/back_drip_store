const { Sequelize, DataTypes } = require('sequelize');
const dbPassword = process.env.DB_PASSWORD;

const sequelize = new Sequelize('banco_de_dados_para_pratica_de_node', 'banco_de_dados_para_pratica_de_node_user', dbPassword, {
    host: 'dpg-cqpb9lbv2p9s73c9bdkg-a.oregon-postgres.render.com',
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false,
        },
    },
    logging: false
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log("Conectado com o banco de dados!");
    } catch (error) {
        console.error("Erro ao conectar com o banco de dados:", error);
    }
})();

module.exports = { sequelize };