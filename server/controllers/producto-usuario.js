const ProductoUsuario = require('../models/producto-usuario');
const db = require('../db/conexion');

var sql = "";

var controlador = {};

//Funciones Test (Comprobación inicial del controlador).
controlador.testGet = async function(request, response) {
    return response.status(200).send({
        mensaje: "SERVIDOR: Soy Test-Get del controlador ProductoUsuario" 
    });
}

controlador.testPost = async function(request, response) {
    return response.status(200).send({
        mensaje: "SERVIDOR: Soy Test-Post del controlador ProductoUsuario"
    });
}

//Funciones Asincronas (API).
controlador.save = async function(request, response) {
    if (request.session.usuario && request.session.usuario.tipo == "Cliente") {
        var params = request.params;

        var id = params.id;

        var clausulas = {
            where: {
                usuarioFK: request.session.usuario.id,
                productoFK: id
            }
        }

        var productoUsuario = await ProductoUsuario.findOne(clausulas);

        if (!productoUsuario) {
            productoUsuario = await ProductoUsuario.create({
                usuarioFK: request.session.usuario.id,
                productoFK: id
            });

            return response.status(200).send({
                mensaje: "SERVIDOR: Has dado like correctamente"
            });
        }
        else {
            return response.status(200).send({
                mensaje: "SERVIDOR: No has podido dar like correctamente"
            });
        }
    }
    else if (request.session.usuario && request.session.usuario.tipo == "Administrador") {
        return response.status(200).send({
            mensaje: "SERVIDOR: Eres administrador"
        });
    }
    else {
        return response.status(200).send({
            mensaje: "SERVIDOR: No estas logeado"
        });
    }
}

controlador.delete = async function(request, response) {
    if (request.session.usuario && request.session.usuario.tipo == "Cliente") {
        var params = request.params;

        var id = params.id;

        var clausulas = {
            where: {
                usuarioFK: request.session.usuario.id,
                productoFK: id
            }
        }

        var productoUsuario = await ProductoUsuario.findOne(clausulas);

        if (productoUsuario) {
            productoUsuario = await productoUsuario.destroy();

            return response.status(200).send({
                mensaje: "SERVIDOR: Has dado dislike correctamente"
            });
        }
        else {
            return response.status(200).send({
                mensaje: "SERVIDOR: No has podido dar dislike correctamente"
            });
        }
    }
    else if (request.session.usuario && request.session.usuario.tipo == "Administrador") {
        return response.status(200).send({
            mensaje: "SERVIDOR: Eres administrador"
        });
    }
    else {
        return response.status(200).send({
            mensaje: "SERVIDOR: No estas logeado"
        });
    }
}

module.exports = controlador;