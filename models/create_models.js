const { sequelize } = require('../config/database');
const { Model, DataTypes } = require('sequelize');

class Category extends Model { };
class User extends Model { };
class Product extends Model { };
class ImagesProduct extends Model { };
class OptionsProduct extends Model { };

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

Category.init(
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
        modelName: 'Category',
    }
);

Product.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        enabled: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        slug: {
            type: DataTypes.STRING,
            allowNull: false
        },
        use_in_menu: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        description: {
            type: DataTypes.STRING,
            defaultValue: ""
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        price_with_discount: {
            type: DataTypes.FLOAT,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'Product'
    }
);

ImagesProduct.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        product_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Product',
                key: 'id'
            },
            allowNull: false
        },
        enabled: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        path: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'ImagesProduct'
    }
);

OptionsProduct.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        product_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Product',
                key: 'id'
            }
        },
        title: {
            type: DataTypes.STRING, 
            allowNull: false
        },
        shape: {
            type: DataTypes.ENUM('square', 'cicle'),
            defaultValue: 'square'
        },
        radius: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        type: {
            type: DataTypes.ENUM('text', 'color'),
            defaultValue: 'text'
        },
        values: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'OptionsProduct'
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

module.exports = { User, Category, Product, ImagesProduct, OptionsProduct };