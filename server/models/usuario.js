const db = require('../db/conexion');

const Sequelize = require('sequelize');

const Usuario = db.conexion.define("Usuario", {
    id: {
        type: Sequelize.DataTypes.INTEGER, 
        primaryKey: true,
        autoIncrement: true,
        field: "id"
    },
    correo: {
        type: Sequelize.DataTypes.STRING, 
        unique: true,
        field: "correo"
    },
    clave: {
        type: Sequelize.DataTypes.STRING,
        field: "clave"
    },
    tipo: {
        type: Sequelize.DataTypes.STRING,
        field: "tipo"
    },
    primerNombre: {
        type: Sequelize.DataTypes.STRING,
        field: "primer_nombre"
    },
    segundoNombre: {
        type: Sequelize.DataTypes.STRING,
        field: "segundo_nombre"
    },
    apellidoPaterno: {
        type: Sequelize.DataTypes.STRING,
        field: "apellido_paterno"
    },
    apellidoMaterno: {
        type: Sequelize.DataTypes.STRING,
        field: "apellido_materno"
    },
    imagen: {
        type: Sequelize.DataTypes.STRING,
        field: "imagen"
    }
}, {
    tableName: "usuario",
    timestamps: false
});

module.exports = Usuario;