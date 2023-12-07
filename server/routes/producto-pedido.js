const ProductoPedidoControlador = require('../controllers/producto-pedido'); 

const express = require('express');
var router = express.Router();

router.get("/test-get-producto-pedido", ProductoPedidoControlador.testGet);
router.post("/test-post-producto-pedido", ProductoPedidoControlador.testPost);

module.exports = router;