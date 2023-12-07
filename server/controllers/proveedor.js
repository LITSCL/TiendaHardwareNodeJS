const Proveedor = require('../models/proveedor');
const db = require('../db/conexion');
const AutorizacionHelper = require('../helpers/AutorizacionHelper');

var autorizacionHelper = new AutorizacionHelper();

var sql = "";

var controlador = {};

//Funciones Test (Comprobación inicial del controlador).
controlador.testGet = async function(request, response) {
    return response.status(200).send({
        mensaje: "SERVIDOR: Soy Test-Get del controlador Proveedor" 
    });
}

controlador.testPost = async function(request, response) {
    return response.status(200).send({
        mensaje: "SERVIDOR: Soy Test-Post del controlador Proveedor"
    });
}

//Funciones Vista (Renderizan vistas).
controlador.crear = async function(request, response) {
    if (!autorizacionHelper.validarAdministrador(request.session.usuario)) {
        return response.redirect(process.env.URL);
    }

    return response.render("views/models/proveedor/crear.ejs");
}

controlador.listar = async function(request, response) {
    if (!autorizacionHelper.validarAdministrador(request.session.usuario)) {
        return response.redirect(process.env.URL);
    }

    var params = request.params;

    var pagina = params.pagina != undefined ? (params.pagina) : (1);

    if (!Number(pagina)) {
        request.session.errorPaginaInexistente = true;
        return response.redirect(process.env.URL + "/proveedor/listar");
    }

    try {
        var totalResultados = await Proveedor.count();
        var resultadosPorPagina = 15;
        var totalPaginas = Math.ceil(totalResultados / resultadosPorPagina);
        var paginaActual = pagina;
        var indice = (paginaActual - 1) * (resultadosPorPagina);

        if (totalResultados == 0) {
            request.session.errorSinResultados = true;
            return response.render("views/models/proveedor/listar.ejs");
        }

        if (paginaActual > totalPaginas) {
            request.session.errorPaginaInexistente = true;
            return response.redirect(process.env.URL + "/proveedor/listar/" + totalPaginas);
        }

        var clausulas = {
            limit: resultadosPorPagina,
            offset: indice
        };

        var proveedores = await Proveedor.findAll(clausulas);

        return response.render("views/models/proveedor/listar.ejs", {
            proveedores: JSON.parse(JSON.stringify(proveedores)),
            formato: "tabla",
            totalPaginas: totalPaginas,
            paginaActual: paginaActual,
            vista: `proveedor/listar`
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
        var proveedor = await Proveedor.findByPk(id);

        if (proveedor) {
            return response.render("views/models/proveedor/modificar.ejs", {
                proveedor: proveedor
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
    var telefono = body.telefono;
    var correo = body.correo;

    if (nombre && telefono && correo) {
        try {
            var proveedor = await Proveedor.create({
                nombre: nombre,
                telefono: telefono,
                correo: correo
            });
            request.session.crearProveedor = "Exitoso"; 
        } catch (error) {
            request.session.crearProveedor = "Fallido";
        }
    }
    else {
        return response.redirect(process.env.URL);
    }
    return response.redirect(process.env.URL + "/proveedor/crear");
}

controlador.update = async function(request, response) {
    if (!autorizacionHelper.validarAdministrador(request.session.usuario)) {
        return response.redirect(process.env.URL);
    }

    var body = request.body;

    var id = body.id;
    var nombre = body.nombre;
    var telefono = body.telefono;
    var correo = body.correo;

    if (id && nombre && telefono && correo) {
        try {
            var proveedor = await Proveedor.findByPk(id);
    
            proveedor = await proveedor.update({
                nombre: nombre,
                telefono: telefono,
                correo: correo
            });
            request.session.modificarProveedor = "Exitoso"; 
        } catch (error) {
            request.session.modificarProveedor = "Fallido";
        }
    }
    else {
        return response.redirect(process.env.URL);
    }
    return response.redirect(process.env.URL + "/proveedor/modificar/" + id);
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
        var proveedor = await Proveedor.findByPk(id);

        proveedor = await proveedor.destroy();

        if (proveedor) {
            request.session.eliminarProveedor = "Exitoso"; 
        }
        else {
            request.session.eliminarProveedor = "Fallido";
        }
    } catch (error) {
        request.session.eliminarProveedor = "Fallido";
    }
    return response.redirect(process.env.URL + "/proveedor/listar");
}

module.exports = controlador;