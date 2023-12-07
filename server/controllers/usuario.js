const Usuario = require('../models/usuario');
const db = require('../db/conexion');
const bcryptjs = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const AutorizacionHelper = require('../helpers/AutorizacionHelper');
const ImagenHelper = require('../helpers/ImagenHelper');

var autorizacionHelper = new AutorizacionHelper();
var imagenHelper = new ImagenHelper();

var sql = "";

var controlador = {};

//Funciones Test (Comprobación inicial del controlador).
controlador.testGet = async function(request, response) {
    return response.status(200).send({
        mensaje: "SERVIDOR: Soy Test-Get del controlador Usuario" 
    });
}

controlador.testPost = async function(request, response) {
    return response.status(200).send({
        mensaje: "SERVIDOR: Soy Test-Post del controlador Usuario"
    });
}

//Funciones Vista (Renderizan vistas).
controlador.registrarse = async function(request, response) {
    if (autorizacionHelper.validarUsuario(request.session.usuario)) {
        return response.redirect(process.env.URL);
    }

    return response.render("views/models/usuario/registrarse.ejs");
}

controlador.iniciarSesion = async function(request, response) {
    if (autorizacionHelper.validarUsuario(request.session.usuario)) {
        return response.redirect(process.env.URL);
    }
    
    return response.render("views/models/usuario/iniciar_sesion.ejs");
}

controlador.editarPerfil = async function(request, response) {
    if (!autorizacionHelper.validarUsuario(request.session.usuario)) {
        return response.redirect(process.env.URL);
    }

    return response.render("views/models/usuario/editar_perfil.ejs", {
       usuario: request.session.usuario
    });
}

//Funciones Acción (Procesan datos).
controlador.save = async function(request, response) {
    if (autorizacionHelper.validarUsuario(request.session.usuario)) {
        return response.redirect(process.env.URL);
    }

    var body = request.body;

    var correo = body.correo;

    var clave = body.clave;
    var claveEncriptada = await bcryptjs.hash(clave, 8);

    var primerNombre = body.primerNombre;
    var segundoNombre = body.segundoNombre;
    var apellidoPaterno = body.apellidoPaterno;
    var apellidoMaterno = body.apellidoMaterno;

    if (correo && clave && primerNombre && segundoNombre && apellidoPaterno && apellidoMaterno) {
        try {
            var usuario = await Usuario.create({
                correo: correo,
                clave: claveEncriptada,
                tipo: "Cliente",
                primerNombre: primerNombre,
                segundoNombre: segundoNombre,
                apellidoPaterno: apellidoPaterno,
                apellidoMaterno: apellidoMaterno,
                imagen: "Default.png"
            });
            request.session.registro = "Exitoso"; 
        } catch (error) {
            request.session.registro = "Fallido";
        }
    }
    else {
        return response.redirect(process.env.URL);
    }
    return response.redirect(process.env.URL + "/usuario/registrarse");
}

controlador.login = async function(request, response) {
    if (autorizacionHelper.validarUsuario(request.session.usuario)) {
        return response.redirect(process.env.URL);
    }
    
    var body = request.body;

    var correo = body.correo;
    var clave = body.clave;

    var clausulas = {
        where: {
            correo: correo
        }
    }

    if (correo && clave) {
        var usuario = await Usuario.findOne(clausulas);

        if (usuario && await bcryptjs.compare(clave, JSON.parse(JSON.stringify(usuario)).clave)) {
            request.session.usuario = JSON.parse(JSON.stringify(usuario));
            return response.redirect(process.env.URL);
        }
        else {
            request.session.errorLogin = "Credenciales incorrectas";
            return response.redirect(process.env.URL + "/usuario/iniciar-sesion");
        }
    }
    else {
        return response.redirect(process.env.URL);
    }
}

controlador.logout = async function(request, response) {
    delete request.session.usuario;
    return response.redirect(process.env.URL);
}

controlador.update = async function(request, response) {
    if (!autorizacionHelper.validarUsuario(request.session.usuario)) {
        return response.redirect(process.env.URL);
    }
    
    var body = request.body;
    var file = request.file;

    var correo = body.correo;

    var clave = body.clave;
    if (clave) {
        var claveEncriptada = await bcryptjs.hash(clave, 8);
    }

    var primerNombre = body.primerNombre;
    var segundoNombre = body.segundoNombre;
    var apellidoPaterno = body.apellidoPaterno;
    var apellidoMaterno = body.apellidoMaterno;

    var nuevaImagen = false;
    if (file) {
        nuevaImagen = true;
        var rutaArchivo = file.path;
        var splitArchivo = rutaArchivo.split("\\");
        var nombreArchivo = splitArchivo[4];
        var splitExtension = nombreArchivo.split(".");
        var extensionArchivo = splitExtension[1];
    }

    if (correo && clave && primerNombre && segundoNombre && apellidoPaterno && apellidoMaterno) {
        if (nuevaImagen) {
            if (imagenHelper.validarExtension(extensionArchivo)) {
                try {
                    var usuario = await Usuario.findByPk(request.session.usuario.id);
    
                    if (clave != "Clave no cambiada") {
                        usuario = await usuario.update({
                            correo: correo,
                            clave: claveEncriptada,
                            primerNombre: primerNombre,
                            segundoNombre: segundoNombre,
                            apellidoPaterno: apellidoPaterno,
                            apellidoMaterno: apellidoMaterno,
                            imagen: nombreArchivo
                        });
                    }
                    else {
                        usuario = await usuario.update({
                            correo: correo,
                            primerNombre: primerNombre,
                            segundoNombre: segundoNombre,
                            apellidoPaterno: apellidoPaterno,
                            apellidoMaterno: apellidoMaterno,
                            imagen: nombreArchivo
                        }); 
                    }
                    request.session.usuario = usuario;
                    request.session.editarPerfil = "Exitoso"; 
                } catch (error) {
                    request.session.editarPerfil = "Fallido";
                }
            }
            else {
                request.session.editarPerfil = "Fallido";
            }
        }
        else {
            try {
                var usuario = await Usuario.findByPk(request.session.usuario.id);
    
                if (clave != "Clave no cambiada") {
                    usuario = await usuario.update({
                        correo: correo,
                        clave: claveEncriptada,
                        primerNombre: primerNombre,
                        segundoNombre: segundoNombre,
                        apellidoPaterno: apellidoPaterno,
                        apellidoMaterno: apellidoMaterno
                    });
                }
                else {
                    usuario = await usuario.update({
                        correo: correo,
                        primerNombre: primerNombre,
                        segundoNombre: segundoNombre,
                        apellidoPaterno: apellidoPaterno,
                        apellidoMaterno: apellidoMaterno
                    });
                }
                request.session.usuario = usuario;
                request.session.editarPerfil = "Exitoso"; 
            } catch (error) {
                request.session.editarPerfil = "Fallido";
            }
        }
    }
    else {
        return response.redirect(process.env.URL);
    }
    return response.redirect(process.env.URL + "/usuario/editar-perfil");
}

//Funciones Archivo (Retornan archivos).
controlador.getFileImagen = async function(request, response) {
    var params = request.params;

    var archivo = params.imagen;
    var rutaArchivo = "./uploads/models/usuario/images/" + archivo;

    fs.exists(rutaArchivo, function(existe) {
        if (existe) {
            return response.sendFile(path.resolve(rutaArchivo));
        }
        else {
            return response.status(200).send({
                mensaje: "SERVIDOR: No existe la imagen"
            });
        }
    });
}

module.exports = controlador;