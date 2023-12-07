const express = require('express');
const session = require('express-session');

require('dotenv').config({path: '../.env'});

const db = require('./db/conexion');

db.conectarDB();

const app = express();

app.use(express.static("../client"));

app.use(session({
    key: "cookie_usuario",
    secret: "#LW3$W1N392",
    resave: true,
    saveUninitialized: true
}));

app.use(async function(request, response, next) {
    response.locals.url = process.env.URL;
    response.locals.sesion = request.session;
    response.locals.categorias = (await db.conexion.query("SELECT * FROM categoria"))[0];
    if (request.session.usuario && request.session.usuario.tipo == "Cliente") {
        response.locals.productosUsuario = (await db.conexion.query(`SELECT id, producto_id, usuario_id FROM producto_usuario WHERE usuario_id = ${request.session.usuario.id}`))[0];
    }
    next();
});

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(function(request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method");
    response.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    response.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});

var rutaIndex = require('./routes/index');
var carritoRutas = require('./routes/carrito');
var categoriaRutas = require('./routes/categoria');
var pedidoRutas = require('./routes/pedido');
var productoPedidoRutas = require('./routes/producto-pedido');
var productoUsuarioRutas = require('./routes/producto-usuario');
var productoRutas = require('./routes/producto');
var proveedorRutas = require('./routes/proveedor');
var usuarioRutas = require('./routes/usuario');

app.use("/", rutaIndex);
app.use("/carrito", carritoRutas);
app.use("/categoria", categoriaRutas);
app.use("/pedido", pedidoRutas);
app.use("/producto-pedido", productoPedidoRutas);
app.use("/producto-usuario", productoUsuarioRutas);
app.use("/producto", productoRutas);
app.use("/proveedor", proveedorRutas);
app.use("/usuario", usuarioRutas);

app.set("view engine", "ejs");

app.set("views", "../client");

app.get("*", function(request, response) {
    response.render("error.ejs");
});

module.exports = app;