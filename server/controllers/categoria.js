const Categoria = require('../models/categoria');
const Producto = require('../models/producto');
const db = require('../db/conexion');
const AutorizacionHelper = require('../helpers/AutorizacionHelper');

var autorizacionHelper = new AutorizacionHelper();

var sql = "";

var controlador = {};

//Funciones Test (Comprobación inicial del controlador).
controlador.testGet = async function(request, response) {
    return response.status(200).send({
        mensaje: "SERVIDOR: Soy Test-Get del controlador Categoria" 
    });
}

controlador.testPost = async function(request, response) {
    return response.status(200).send({
        mensaje: "SERVIDOR: Soy Test-Post del controlador Categoria"
    });
}

//Funciones Vista (Renderizan vistas).
controlador.crear = async function(request, response) {
    if (!autorizacionHelper.validarAdministrador(request.session.usuario)) {
        return response.redirect(process.env.URL);
    }

    return response.render("views/models/categoria/crear.ejs");
}

controlador.listar = async function(request, response) {
    if (!autorizacionHelper.validarAdministrador(request.session.usuario)) {
        return response.redirect(process.env.URL);
    }

    var params = request.params;

    var pagina = params.pagina != undefined ? (params.pagina) : (1);

    if (!Number(pagina)) {
        request.session.errorPaginaInexistente = true;
        return response.redirect(process.env.URL + "/categoria/listar");
    }

    try {
        var totalResultados = await Categoria.count();
        var resultadosPorPagina = 15;
        var totalPaginas = Math.ceil(totalResultados / resultadosPorPagina);
        var paginaActual = pagina;
        var indice = (paginaActual - 1) * (resultadosPorPagina);

        if (totalResultados == 0) {
            request.session.errorSinResultados = true;
            return response.render("views/models/categoria/listar.ejs");
        }

        if (paginaActual > totalPaginas) {
            request.session.errorPaginaInexistente = true;
            return response.redirect(process.env.URL + "/categoria/listar/" + totalPaginas);
        }

        var clausulas = {
            limit: resultadosPorPagina,
            offset: indice
        };

        var categorias = await Categoria.findAll(clausulas);

        return response.render("views/models/categoria/listar.ejs", {
            categorias: JSON.parse(JSON.stringify(categorias)),
            formato: "tabla",
            totalPaginas: totalPaginas,
            paginaActual: paginaActual,
            vista: `categoria/listar`
        });
    } catch (error) {
        return response.redirect(process.env.URL);
    }
}

controlador.mostrar = async function(request, response) {
    var params = request.params;

    var id = params.id;
    var pagina = params.pagina != undefined ? (params.pagina) : (1);

    if (!Number(id)) {
        request.session.errorPaginaInexistente = true;
        return response.redirect(process.env.URL + "/categoria/mostrar/1");
    }
    
    if (!Number(pagina)) {
        request.session.errorPaginaInexistente = true;
        return response.redirect(process.env.URL + "/categoria/mostrar/1");
    }

    try {
        var clausulas = {
            where: {
                categoriaFK: id
            }
        };

        var totalResultados = await Producto.count(clausulas);
        var resultadosPorPagina = 15;
        var totalPaginas = Math.ceil(totalResultados / resultadosPorPagina);
        var paginaActual = pagina;
        var indice = (paginaActual - 1) * (resultadosPorPagina);

        if (totalResultados == 0) {
            request.session.errorSinResultados = true;
            return response.render("views/models/categoria/mostrar.ejs");
        }

        if (paginaActual > totalPaginas) {
            request.session.errorPaginaInexistente = true;
            return response.redirect(process.env.URL + "/categoria/mostrar/" + totalPaginas);
        }

        clausulas = {
            limit: resultadosPorPagina,
            offset: indice,
            where: {
                categoriaFK: id
            }
        };

        var productos = await Producto.findAll(clausulas);

        return response.render("views/models/categoria/mostrar.ejs", {
            productos: JSON.parse(JSON.stringify(productos)),
            formato: "tarjeta",
            totalPaginas: totalPaginas,
            paginaActual: paginaActual,
            vista: `categoria/mostrar/${id}`
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
        var categoria = await Categoria.findByPk(id);
        
        if (categoria) {
            return response.render("views/models/categoria/modificar.ejs", {
                categoria: categoria
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

    var nombre = body.nombre;

    if (nombre) {
        try {
            var categoria = await Categoria.create({
                nombre: nombre
            });
            request.session.crearCategoria = "Exitoso"; 
        } catch (error) {
            request.session.crearCategoria = "Fallido";
        }
    }
    else {
        return response.redirect(process.env.URL);
    }
    return response.redirect(process.env.URL + "/categoria/crear");
}

controlador.update = async function(request, response) {
    if (!autorizacionHelper.validarAdministrador(request.session.usuario)) {
        return response.redirect(process.env.URL);
    }

    var body = request.body;

    var id = body.id;
    var nombre = body.nombre;

    if (id && nombre) {
        try {
            var categoria = await Categoria.findByPk(id);
    
            categoria = await categoria.update({
                nombre: nombre
            });
            request.session.modificarCategoria = "Exitoso"; 
        } catch (error) {
            request.session.modificarCategoria = "Fallido";
        }
    }
    else {
        return response.redirect(process.env.URL);
    }
    return response.redirect(process.env.URL + "/categoria/modificar/" + id);
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
        var categoria = await Categoria.findByPk(id);

        categoria = await categoria.destroy();

        if (categoria) {
            request.session.eliminarCategoria = "Exitoso"; 
        }
        else {
            request.session.eliminarCategoria = "Fallido";
        }
    } catch (error) {
        request.session.eliminarCategoria = "Fallido";
    }
    return response.redirect(process.env.URL + "/categoria/listar");
}

module.exports = controlador;