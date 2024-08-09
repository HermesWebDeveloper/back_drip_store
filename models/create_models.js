const { sequelize } = require('../config/database');
const { Model, DataTypes } = require('sequelize');

class Categories extends Model { }
class User extends Model { };

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstname: DataTypes.STRING,
        surname: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
    },
    {
        sequelize,
        modelName: 'User'
    }
);

Categories.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        slug: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        use_in_menu: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    },
    {
        sequelize,
        modelName: 'Categories',
    }
);

(async () => {
    try {
        await sequelize.sync({ force: true });
        console.log("Modelos sincronizados!");
    } catch (error) {
        console.error('Erro na sincronização:', error);
    }
})();

module.exports = { User, Categories };