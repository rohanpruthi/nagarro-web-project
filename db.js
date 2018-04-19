const Sequelize = require('sequelize')

const db = new Sequelize('ngrwssb', 'ngrusr', 'ngrpass', {
    dialect: 'sqlite',
    host: 'localhost',
    storage: './webassn.db'
})
//db.authenticate().then(() => console.log("Success"))
const Product = db.define('product', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0.0
    },
    vendorId: {
        type: Sequelize.INTEGER
    }

})
const Vendor = db.define('vendor', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
})
//Product.hasMany(Vendor)
//Vendor.belongsTo(Product)

const Cart = db.define('cart', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    productId: {
        type:Sequelize.INTEGER,
        allowNull:false
    },
    productName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
})
db.sync().then(() => console.log("Database has been updated"))
    .catch((err) => console.error("Error updating database"))

exports = module.exports = {
    Product, Vendor, Cart
}