const PedidoControlador = require('../controllers/pedido'); 

const express = require('express');
var router = express.Router();

router.get("/test-get-pedido", PedidoControlador.testGet);
router.post("/test-post-pedido", PedidoControlador.testPost);

//Vistas.
router.get("/listar/:pagina?", PedidoControlador.listar);
router.get("/mis-pedidos/:pagina?", PedidoControlador.misPedidos);
router.get("/detalle/:id?", PedidoControlador.detalle);
router.get("/hacer", PedidoControlador.hacer);
router.get("/confirmado", PedidoControlador.confirmado);
router.get("/gestionar/:id?", PedidoControlador.gestionar);

//Acciones.
router.post("/save", PedidoControlador.save);
router.post("/update", PedidoControlador.update);

module.exports = router;