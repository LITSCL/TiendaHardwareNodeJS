const db = require('../db/conexion');

const Sequelize = require('sequelize');

const ProductoUsuario = db.conexion.define("ProductoUsuario", {
    id: {
        type: Sequelize.DataTypes.INTEGER, 
        primaryKey: true,
        autoIncrement: true,
        field: "id"
    },
    productoFK: {
        type: Sequelize.DataTypes.INTEGER,
        field: "producto_id"
    },
    usuarioFK: {
        type: Sequelize.DataTypes.INTEGER,
        field: "usuario_id"
    }
}, {
    tableName: "producto_usuario",
    timestamps: false
});

module.exports = ProductoUsuario;