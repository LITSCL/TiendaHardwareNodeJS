const Sequelize = require('sequelize');

var conexion = new Sequelize(process.env.DB_NOMBRE, process.env.DB_USUARIO, process.env.DB_CLAVE, {
    host: process.env.DB_SERVIDOR,
    dialect: "mariadb",
    port: process.env.DB_PUERTO
});

const db = {
    conexion: conexion,
    conectarDB: async function conectarDB() {
        try {
            await conexion.authenticate();
            console.log("Conexion a la base de datos realizada con exito");
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = db;