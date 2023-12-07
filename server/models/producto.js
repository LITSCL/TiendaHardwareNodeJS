const db = require('../db/conexion');

const Sequelize = require('sequelize');

const Producto = db.conexion.define("Producto", {
    id: {
        type: Sequelize.DataTypes.INTEGER, 
        primaryKey: true,
        autoIncrement: true,
        field: "id"
    },
    nombre: {
        type: Sequelize.DataTypes.STRING,
        field: "nombre"
    },
    descripcion: {
        type: Sequelize.DataTypes.STRING,
        field: "descripcion"
    },
    precio: {
        type: Sequelize.DataTypes.DOUBLE,
        field: "precio"
    },
    stock: {
        type: Sequelize.DataTypes.INTEGER,
        field: "stock"
    },
    imagen: {
        type: Sequelize.DataTypes.STRING,
        field: "imagen"
    },
    categoriaFK: {
        type: Sequelize.DataTypes.INTEGER,
        field: "categoria_id"
    }
}, {
    tableName: "producto",
    timestamps: false
});

module.exports = Producto;