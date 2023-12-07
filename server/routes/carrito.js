const CarritoControlador = require('../controllers/carrito'); 

const express = require('express');
var router = express.Router();

router.get("/test-get-carrito", CarritoControlador.testGet);
router.post("/test-post-carrito", CarritoControlador.testPost);

//Vistas.
router.get("/mostrar", CarritoControlador.mostrar);

//Acciones.
router.get("/save-producto/:id?", CarritoControlador.saveProducto);
router.get("/delete-producto/:indice?", CarritoControlador.deleteProducto);
router.get("/delete-carrito", CarritoControlador.deleteCarrito);
router.get("/save-unidad/:indice?", CarritoControlador.saveUnidad);
router.get("/delete-unidad/:indice?", CarritoControlador.deleteUnidad);

module.exports = router;