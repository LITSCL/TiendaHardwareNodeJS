const db = require('../db/conexion');

const Sequelize = require('sequelize');

const Categoria = db.conexion.define("Categoria", {
    id: {
        type: Sequelize.DataTypes.INTEGER, 
        primaryKey: true,
        autoIncrement: true,
        field: "id"
    },
    nombre: {
        type: Sequelize.DataTypes.STRING,
        field: "nombre"
    }
}, {
    tableName: "categoria",
    timestamps: false
});

module.exports = Categoria;