const Producto = require('../models/producto');
const Categoria = require('../models/categoria');
const ProductoUsuario = require('../models/producto-usuario');
const db = require('../db/conexion');
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
        mensaje: "SERVIDOR: Soy Test-Get del controlador Producto" 
    });
}

controlador.testPost = async function(request, response) {
    return response.status(200).send({
        mensaje: "SERVIDOR: Soy Test-Post del controlador Producto"
    });
}

//Funciones Vista (Renderizan vistas).
controlador.crear = async function(request, response) {
    if (!autorizacionHelper.validarAdministrador(request.session.usuario)) {
        return response.redirect(process.env.URL);
    }
    
    try {
        var categorias = await Categoria.findAll();

        return response.render("views/models/producto/crear.ejs", {
            categorias: JSON.parse(JSON.stringify(categorias))
        });
    } catch (error) {
        return response.render("index.ejs");
    }
}

controlador.listar = async function(request, response) {
    if (!autorizacionHelper.validarAdministrador(request.session.usuario)) {
        return response.redirect(process.env.URL);
    }

    var params = request.params;

    var pagina = params.pagina != undefined ? (params.pagina) : (1);

    if (!Number(pagina)) {
        request.session.errorPaginaInexistente = true;
        return response.redirect(process.env.URL + "/producto/listar");
    }

    try {
        var totalResultados = await Producto.count();
        var resultadosPorPagina = 15;
        var totalPaginas = Math.ceil(totalResultados / resultadosPorPagina);
        var paginaActual = pagina;
        var indice = (paginaActual - 1) * (resultadosPorPagina);

        if (totalResultados == 0) {
            request.session.errorSinResultados = true;
            return response.render("views/models/producto/listar.ejs");
        }

        if (paginaActual > totalPaginas) {
            request.session.errorPaginaInexistente = true;
            return response.redirect(process.env.URL + "/producto/listar/" + totalPaginas);
        }

        var clausulas = {
            limit: resultadosPorPagina,
            offset: indice
        };

        var productos = await Producto.findAll(clausulas);

        return response.render("views/models/producto/listar.ejs", {
            productos: JSON.parse(JSON.stringify(productos)),
            formato: "tabla",
            totalPaginas: totalPaginas,
            paginaActual: paginaActual,
            vista: `producto/listar`
        });
    } catch (error) {
        return response.redirect(process.env.URL);
    }
}

controlador.modificar = async function(request, response) {
    if (!autorizacionHelper.validarAdministrador(request.session.usuario)) {
        return response.redirect(process.env.URL);
    }

    var params = request.params;

    var id = params.id;

    if (!Number(id)) {
        return response.redirect(process.env.URL);
    }

    try {
        var producto = await Producto.findByPk(id);
        var categorias = await Categoria.findAll();
        
        if (producto) {
            return response.render("views/models/producto/modificar.ejs", {
                producto: producto,
                categorias: JSON.parse(JSON.stringify(categorias))
            });
        }
        else {
            return response.redirect(process.env.URL)
        }
    } catch (error) {
        return response.redirect(process.env.URL);
    }
}

controlador.favoritos = async function(request, response) {
    if (!autorizacionHelper.validarCliente(request.session.usuario)) {
        return response.redirect(process.env.URL);
    }

    var params = request.params;

    var pagina = params.pagina != undefined ? (params.pagina) : (1);

    if (!Number(pagina)) {
        request.session.errorPaginaInexistente = true;
        return response.redirect(process.env.URL + "/producto/favoritos");
    }

    try {
        var clausulas = {
            where: {
                usuarioFK: request.session.usuario.id
            }
        }
        
        var totalResultados = await ProductoUsuario.count(clausulas);
        var resultadosPorPagina = 15;
        var totalPaginas = Math.ceil(totalResultados / resultadosPorPagina);
        var paginaActual = pagina;
        var indice = (paginaActual - 1) * (resultadosPorPagina);

        if (totalResultados == 0) {
            request.session.errorSinResultados = true;
            return response.render("views/models/producto/favoritos.ejs");
        }

        if (paginaActual > totalPaginas) {
            request.session.errorPaginaInexistente = true;
            return response.redirect(process.env.URL + "/producto/favoritos/" + totalPaginas);
        }

        sql = await db.conexion.query(`SELECT p.* FROM producto p INNER JOIN producto_usuario pu ON p.id = pu.producto_id AND pu.usuario_id = ${request.session.usuario.id} LIMIT ${indice}, ${resultadosPorPagina}`);
        var productos = sql[0];

        if (productos) {
            return response.render("views/models/producto/favoritos.ejs", {
                productos: JSON.parse(JSON.stringify(productos)),
                formato: "tarjeta",
                totalPaginas: totalPaginas,
                paginaActual: paginaActual,
                vista: `producto/favoritos`
            });
        }
        else {
            return response.redirect(process.env.URL)
        }
    } catch (error) {
        return response.redirect(process.env.URL);
    }
}

//Funciones Acción (Procesan datos).
controlador.save = async function(request, response) {
    if (!autorizacionHelper.validarAdministrador(request.session.usuario)) {
        return response.redirect(process.env.URL);
    }

    var body = request.body;
    var file = request.file;

    var nombre = body.nombre;
    var descripcion = body.descripcion;
    var precio = body.precio;
    var stock = body.stock;
    var categoria = body.categoria;

    var rutaArchivo = file.path;
    var splitArchivo = rutaArchivo.split("\\");
    var nombreArchivo = splitArchivo[4];
    var splitExtension = nombreArchivo.split(".");
    var extensionArchivo = splitExtension[1];

    if (nombre && descripcion && precio && stock && categoria && file) {
        if (imagenHelper.validarExtension(extensionArchivo)) {
            try {
                var producto = await Producto.create({
                    nombre: nombre,
                    descripcion: descripcion,
                    precio: precio,
                    stock: stock,
                    categoriaFK: categoria,
                    imagen: nombreArchivo
                });
                request.session.crearProducto = "Exitoso"; 
            } catch (error) {
                request.session.crearProducto = "Fallido";
            }
        }
        else {
            request.session.crearProducto = "Fallido";
        }
    }
    else {
        return response.redirect(process.env.URL);
    }
    return response.redirect(process.env.URL + "/producto/crear");
}

controlador.update = async function(request, response) {
    if (!autorizacionHelper.validarAdministrador(request.session.usuario)) {
        return response.redirect(process.env.URL);
    }

    var body = request.body;
    var file = request.file;

    var id = body.id;
    var nombre = body.nombre;
    var descripcion = body.descripcion;
    var precio = body.precio;
    var stock = body.stock;
    var categoria = body.categoria;

    var nuevaImagen = false;
    if (file) {
        nuevaImagen = true;
        var rutaArchivo = file.path;
        var splitArchivo = rutaArchivo.split("\\");
        var nombreArchivo = splitArchivo[4];
        var splitExtension = nombreArchivo.split(".");
        var extensionArchivo = splitExtension[1];
    }

    if (id && nombre && descripcion && precio && stock && categoria) {
        if (nuevaImagen) {
            if (imagenHelper.validarExtension(extensionArchivo)) {
                try {
                    var producto = await Producto.findByPk(id);
        
                    producto = await producto.update({
                        nombre: nombre,
                        descripcion: descripcion,
                        precio: precio,
                        stock: stock,
                        categoriaFK: categoria,
                        imagen: nombreArchivo
                    });
                    request.session.modificarProducto = "Exitoso"; 
                } catch (error) {
                    request.session.modificarProducto = "Fallido";
                }
            }
            else {
                request.session.modificarProducto = "Fallido";
            }
        }
        else {
            try {
                var producto = await Producto.findByPk(id);
    
                producto = await producto.update({
                    nombre: nombre,
                    descripcion: descripcion,
                    precio: precio,
                    stock: stock,
                    categoriaFK: categoria
                });
                request.session.modificarProducto = "Exitoso"; 
            } catch (error) {
                request.session.modificarProducto = "Fallido";
            }
        }
    }
    else {
        return response.redirect(process.env.URL);
    }
    return response.redirect(process.env.URL + "/producto/modificar/" + id);
}

controlador.delete = async function(request, response) {
    if (!autorizacionHelper.validarAdministrador(request.session.usuario)) {
        return response.redirect(process.env.URL);
    }
    
    var params = request.params;

    var id = params.id;

    if (!Number(id)) {
        return response.redirect(process.env.URL);
    }

    try {
        var producto = await Producto.findByPk(id);

        producto = await producto.destroy();

        if (producto) {
            request.session.eliminarProducto = "Exitoso"; 
        }
        else {
            request.session.eliminarProducto = "Fallido";
        }
    } catch (error) {
        request.session.eliminarProducto = "Fallido";
    }
    return response.redirect(process.env.URL + "/producto/listar");
}

//Funciones Archivo (Retornan archivos).
controlador.getFileImagen = async function(request, response) {
    var params = request.params;

    var archivo = params.imagen;
    var rutaArchivo = "./uploads/models/producto/images/" + archivo;

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