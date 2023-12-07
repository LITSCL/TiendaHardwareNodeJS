const Producto = require('../models/producto');
const db = require('../db/conexion');
const CarritoHelper = require('../helpers/CarritoHelper');

var carritoHelper = new CarritoHelper();

var sql = "";

var controlador = {};

//Funciones Test (Comprobación inicial del controlador).
controlador.testGet = async function(request, response) {
    return response.status(200).send({
        mensaje: "SERVIDOR: Soy Test-Get del controlador Carrito" 
    });
}

controlador.testPost = async function(request, response) {
    return response.status(200).send({
        mensaje: "SERVIDOR: Soy Test-Post del controlador Carrito"
    });
}

//Funciones Vista (Renderizan vistas).
controlador.mostrar = async function(request, response) {
    return response.render("views/controllers/carrito/mostrar.ejs", {
        carritoHelper: carritoHelper
    });
}

//Funciones Acción (Procesan datos).
controlador.saveProducto = async function(request, response) {
    var params = request.params;

    var idProducto = params.id;

    if (!Number(idProducto)) {
        return response.redirect(process.env.URL);
    }

    if (request.session.carrito) {
        var contador = 0;
        for (var i = 0; i < request.session.carrito.length; i++) {
            var producto = request.session.carrito[i];
            if (producto.id == idProducto) {
                var unidadesActuales = producto.unidades;
                var unidadesMaximas = producto.objeto.stock;
                if (unidadesActuales + 1 <= unidadesMaximas) {
                    request.session.carrito[i].unidades++;
                    contador++;
                }
                else {
                    request.session.limiteUnidades = "Limite superado";
                    contador++;
                }
            }
        }
    }

    if (!contador || contador == 0) {
        if (!request.session.carrito) {
            request.session.carrito = [];
        }
        
        var producto = await Producto.findByPk(idProducto);

        if (producto && producto.stock > 0) {
            request.session.carrito.push({"id": producto.id, "precio": producto.precio, "unidades": 1, "imagen": producto.imagen, "objeto": producto});
        }
        else {
            request.session.limiteUnidades = "Limite superado";
        }
    }
    return response.redirect(process.env.URL + "/carrito/mostrar");
}

controlador.deleteProducto = async function(request, response) {
    var params = request.params;

    var indice = params.indice;
    
    request.session.carrito.splice(indice, 1);  
    return response.redirect(process.env.URL + "/carrito/mostrar");
}

controlador.deleteCarrito = async function(request, response) {
    delete request.session.carrito;
    return response.redirect(process.env.URL + "/carrito/mostrar");
}

controlador.saveUnidad = async function(request, response) {
    var params = request.params;

    var indice = params.indice;

    var unidadesActuales = request.session.carrito[Number(indice)].unidades;
    var unidadesMaximas = request.session.carrito[Number(indice)].objeto.stock;

    if (unidadesActuales + 1 <= unidadesMaximas) {
        request.session.carrito[Number(indice)].unidades++;
    }
    else {
        request.session.limiteUnidades = "Limite superado";
    }

    return response.redirect(process.env.URL + "/carrito/mostrar");
}

controlador.deleteUnidad = async function(request, response) {
    var params = request.params;

    var indice = params.indice;

    request.session.carrito[Number(indice)].unidades--;

    if (request.session.carrito[Number(indice)].unidades == 0) {
        request.session.carrito.splice(indice, 1); 
    }
    
    return response.redirect(process.env.URL + "/carrito/mostrar");
}

module.exports = controlador;