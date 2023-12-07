const Pedido = require('../models/pedido');
const Producto = require('../models/producto');
const ProductoPedido = require('../models/producto-pedido');
const db = require('../db/conexion');
const AutorizacionHelper = require('../helpers/AutorizacionHelper');
const CarritoHelper = require('../helpers/CarritoHelper');
const Helper = require('../helpers/Helper');

var autorizacionHelper = new AutorizacionHelper();
var carritoHelper = new CarritoHelper();
var helper = new Helper();

var sql = "";

var controlador = {};

//Funciones Test (Comprobación inicial del controlador).
controlador.testGet = async function(request, response) {
    return response.status(200).send({
        mensaje: "SERVIDOR: Soy Test-Get del controlador Pedido" 
    });
}

controlador.testPost = async function(request, response) {
    return response.status(200).send({
        mensaje: "SERVIDOR: Soy Test-Post del controlador Pedido"
    });
}

//Funciones Vista (Renderizan vistas).
controlador.hacer = async function(request, response) {
    if (!autorizacionHelper.validarCliente(request.session.usuario)) {
        return response.redirect(process.env.URL);
    }

    if (request.session.carrito && request.session.carrito.length >= 1) {
        return response.render("views/models/pedido/hacer.ejs");
    }
    else {
        return response.redirect(process.env.URL);
    }
}

controlador.confirmado = async function(request, response) {
    if (!autorizacionHelper.validarCliente(request.session.usuario)) {
        return response.redirect(process.env.URL);
    }

    sql = await db.conexion.query(`SELECT p.id, p.coste, p.estado FROM pedido p WHERE p.usuario_id = ${request.session.usuario.id} ORDER BY id DESC LIMIT 1`);
    var datosPedido = sql[0][0];

    var idPedido = datosPedido.id;

    sql = await db.conexion.query(`SELECT p.*, pp.unidades FROM producto p INNER JOIN producto_pedido pp ON p.id = pp.producto_id WHERE pp.pedido_id = ${idPedido}`);   
    var productosPedido = sql[0];

    return response.render("views/models/pedido/confirmado.ejs", {
        datosPedido: datosPedido,
        productosPedido: productosPedido
    });
}

controlador.listar = async function(request, response) {
    if (!autorizacionHelper.validarAdministrador(request.session.usuario)) {
        return response.redirect(process.env.URL);
    }

    var params = request.params;

    var pagina = params.pagina != undefined ? (params.pagina) : (1);

    if (!Number(pagina)) {
        request.session.errorPaginaInexistente = true;
        return response.redirect(process.env.URL + "/pedido/listar");
    }

    try {
        var totalResultados = await Pedido.count();
        var resultadosPorPagina = 15;
        var totalPaginas = Math.ceil(totalResultados / resultadosPorPagina);
        var paginaActual = pagina;
        var indice = (paginaActual - 1) * (resultadosPorPagina);

        if (totalResultados == 0) {
            request.session.errorSinResultados = true;
            return response.render("views/models/pedido/listar.ejs");
        }

        if (paginaActual > totalPaginas) {
            request.session.errorPaginaInexistente = true;
            return response.redirect(process.env.URL + "/pedido/listar/" + totalPaginas);
        }

        var clausulas = {
            limit: resultadosPorPagina,
            offset: indice
        };

        var pedidos = await Pedido.findAll(clausulas);

        return response.render("views/models/pedido/listar.ejs", {
            pedidos: JSON.parse(JSON.stringify(pedidos)),
            formato: "tabla",
            totalPaginas: totalPaginas,
            paginaActual: paginaActual,
            vista: `pedido/listar`
        });
    } catch (error) {
        return response.redirect(process.env.URL);
    }
}

controlador.misPedidos = async function(request, response) {
    if (!autorizacionHelper.validarCliente(request.session.usuario)) {
        return response.redirect(process.env.URL);
    }

    var params = request.params;

    var pagina = params.pagina != undefined ? (params.pagina) : (1);

    if (!Number(pagina)) {
        request.session.errorPaginaInexistente = true;
        return response.redirect(process.env.URL + "/pedido/mis-pedidos");
    }

    try {
        var totalResultados = await Pedido.count();
        var resultadosPorPagina = 15;
        var totalPaginas = Math.ceil(totalResultados / resultadosPorPagina);
        var paginaActual = pagina;
        var indice = (paginaActual - 1) * (resultadosPorPagina);
        
        if (totalResultados == 0) {
            request.session.errorSinResultados = true;
            return response.render("views/models/pedido/mis_pedidos.ejs");
        }

        if (paginaActual > totalPaginas) {
            request.session.errorPaginaInexistente = true;
            return response.redirect(process.env.URL + "/pedido/mis-pedidos/" + totalPaginas);
        }

        var clausulas = {
            limit: resultadosPorPagina,
            offset: indice
        };

        var pedidos = await Pedido.findAll(clausulas);

        return response.render("views/models/pedido/mis_pedidos.ejs", {
            pedidos: JSON.parse(JSON.stringify(pedidos)),
            formato: "tabla",
            totalPaginas: totalPaginas,
            paginaActual: paginaActual,
            vista: `pedido/mis-pedidos`
        });
    } catch (error) {
        return response.redirect(process.env.URL);
    }
}

controlador.detalle = async function(request, response) {
    if (!autorizacionHelper.validarCliente(request.session.usuario)) {
        return response.redirect(process.env.URL);
    }

    var params = request.params;

    var id = params.id;

    if (!Number(id)) {
        return response.redirect(process.env.URL);
    }

    sql = await db.conexion.query(`SELECT p.id, p.coste, p.usuario_id, p.estado FROM pedido p WHERE id = ${id}`);
    var datosPedido = sql[0][0];

    if (datosPedido) {
        if (datosPedido.usuario_id == request.session.usuario.id) {
            sql = await db.conexion.query(`SELECT p.*, pp.unidades FROM producto p INNER JOIN producto_pedido pp ON p.id = pp.producto_id WHERE pp.pedido_id = ${id}`);   
            var productosPedido = sql[0];

            return response.render("views/models/pedido/detalle.ejs", {
                datosPedido: datosPedido,
                productosPedido: productosPedido
            });
        }
        else {
            request.session.errorDetallePedido = "El pedido no te pertenece";
            return response.render("views/models/pedido/detalle.ejs");
        }
    }
    else {
        request.session.errorDetallePedido = "El pedido no existe";
        return response.render("views/models/pedido/detalle.ejs");
    }
}

controlador.gestionar = async function(request, response) {
    if (!autorizacionHelper.validarAdministrador(request.session.usuario)) {
        return response.redirect(process.env.URL);
    }

    var params = request.params;

    var id = params.id;

    if (id) {
        var pedido = await Pedido.findByPk(id);

        sql = await db.conexion.query(`SELECT p.*, pp.unidades FROM producto p INNER JOIN producto_pedido pp ON p.id = pp.producto_id WHERE pp.pedido_id = ${id}`);   
        var productosPedido = sql[0];
    
        return response.render("views/models/pedido/gestionar.ejs", {
            datosPedido: pedido,
            productosPedido: productosPedido
        });
    }
    else {
        return response.redirect(process.env.URL);
    }
}

//Funciones Acción (Procesan datos).
controlador.save = async function(request, response) {
    var body = request.body;

    var ciudad = body.ciudad;
    var comuna = body.comuna;
    var calle = body.calle;
    var coste = carritoHelper.obtenerTotal(request.session.carrito);

	var date = new Date();
    var fecha = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;


    var hora = helper.agregarCero(date.getHours()) + ":" + helper.agregarCero(date.getMinutes()) + ":" + helper.agregarCero(date.getSeconds());

    var idUsuario = request.session.usuario.id;

    if (ciudad && comuna && calle && coste && fecha && hora && idUsuario) {
        try {
            var pedido = await Pedido.create({
                ciudad: ciudad,
                comuna: comuna,
                calle: calle,
                coste: coste,
                estado: "Confirmado",
                fecha: fecha,
                hora: hora,
                usuarioFK: idUsuario
            });
    
            var idPedido = pedido.id;
    
            request.session.carrito.forEach(async function(elemento) {
                var producto = elemento.objeto;
    
                var stockActual = producto.stock;
                var stockNuevo = stockActual - elemento.unidades;
    
                var producto = await Producto.findByPk(producto.id);
    
                producto = await producto.update({
                    stock: stockNuevo
                });
    
                var productoPedido = await ProductoPedido.create({
                    unidades: elemento.unidades,
                    productoFK: producto.id,
                    pedidoFK: idPedido
                });
            });
            request.session.crearPedido = "Exitoso";
            delete request.session.carrito;
        } catch (error) {
            request.session.crearPedido = "Fallido";
        }
    }
    else {
        return response.redirect(process.env.URL);
    }
    return response.redirect(process.env.URL + "/pedido/confirmado");
}

controlador.update = async function(request, response) {
    if (!autorizacionHelper.validarAdministrador(request.session.usuario)) {
        return response.redirect(process.env.URL);
    }

    var body = request.body;

    var id = body.id;
    var estado = body.estado;

    if (!Number(id)) {
        return response.redirect(process.env.URL);
    }

    if (id && estado) {
        try {
            var pedido = await Pedido.findByPk(id);
    
            pedido = await pedido.update({
                estado: estado
            });
        } catch (error) {
            return response.redirect(process.env.URL);
        }
    }
    else {
        return response.redirect(process.env.URL);
    }
    return response.redirect(process.env.URL + "/pedido/gestionar/" + id);
}

module.exports = controlador;