const db = require('../db/conexion');

const Sequelize = require('sequelize');

const ProductoPedido = db.conexion.define("ProductoPedido", {
    id: {
        type: Sequelize.DataTypes.INTEGER, 
        primaryKey: true,
        autoIncrement: true,
        field: "id"
    },
    unidades: {
        type: Sequelize.DataTypes.INTEGER,
        field: "unidades"
    },
    productoFK: {
        type: Sequelize.DataTypes.INTEGER,
        field: "producto_id"
    },
    pedidoFK: {
        type: Sequelize.DataTypes.INTEGER,
        field: "pedido_id"
    }
}, {
    tableName: "producto_pedido",
    timestamps: false
});

module.exports = ProductoPedido;