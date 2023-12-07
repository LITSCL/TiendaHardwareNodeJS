const db = require('../db/conexion');

const Sequelize = require('sequelize');

const Pedido = db.conexion.define("Pedido", {
    id: {
        type: Sequelize.DataTypes.INTEGER, 
        primaryKey: true,
        autoIncrement: true,
        field: "id"
    },
    ciudad: {
        type: Sequelize.DataTypes.STRING,
        field: "ciudad"
    },
    comuna: {
        type: Sequelize.DataTypes.STRING,
        field: "comuna"
    },
    calle: {
        type: Sequelize.DataTypes.STRING,
        field: "calle"
    },
    coste: {
        type: Sequelize.DataTypes.DOUBLE,
        field: "coste"
    },
    estado: {
        type: Sequelize.DataTypes.STRING,
        field: "estado"
    },
    fecha: {
        type: Sequelize.DataTypes.STRING,
        field: "fecha"
    },
    hora: {
        type: Sequelize.DataTypes.STRING,
        field: "hora"
    },
    usuarioFK: {
        type: Sequelize.DataTypes.INTEGER,
        field: "usuario_id"
    }
}, {
    tableName: "pedido",
    timestamps: false
});

module.exports = Pedido;