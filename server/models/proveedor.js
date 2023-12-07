const db = require('../db/conexion');

const Sequelize = require('sequelize');

const Proveedor = db.conexion.define("Proveedor", {
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
    telefono: {
        type: Sequelize.DataTypes.STRING,
        field: "telefono"
    },
    correo: {
        type: Sequelize.DataTypes.STRING,
        field: "correo"
    }
}, {
    tableName: "proveedor",
    timestamps: false
});

module.exports = Proveedor;