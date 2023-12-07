const Producto = require('../models/producto');
const db = require('../db/conexion');

var sql = "";

var controlador = {};

controlador.index = async function(request, response) {
    var params = request.params;

    var pagina = params.pagina != undefined ? (params.pagina) : (1);

    if (!Number(pagina)) {
        request.session.errorPaginaInexistente = true;
        return response.redirect(process.env.URL);
    }

    try {
        var totalResultados = await Producto.count();
        var resultadosPorPagina = 15;
        var totalPaginas = Math.ceil(totalResultados / resultadosPorPagina);
        var paginaActual = pagina;
        var indice = (paginaActual - 1) * (resultadosPorPagina);

        if (totalResultados == 0) {
            request.session.errorSinResultados = true;
            return response.render("index.ejs");
        }

        if (paginaActual > totalPaginas) {
            request.session.errorPaginaInexistente = true;
            return response.redirect(process.env.URL);
        }

        var clausulas = {
            limit: resultadosPorPagina,
            offset: indice
        }

        var productos = await Producto.findAll(clausulas);

        return response.render("index.ejs", {
            productos: JSON.parse(JSON.stringify(productos)),
            formato: "tarjeta",
            totalPaginas: totalPaginas,
            paginaActual: paginaActual,
            vista: ``
        });
    } catch (error) {
        return response.redirect(process.env.URL);
    }
}

module.exports = controlador;