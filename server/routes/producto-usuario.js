const ProductoUsuarioControlador = require('../controllers/producto-usuario'); 

const express = require('express');
var router = express.Router();

router.get("/test-get-producto-usuario", ProductoUsuarioControlador.testGet);
router.post("/test-post-producto-usuario", ProductoUsuarioControlador.testPost);

//Asincrono.
router.get("/api/save/:id?", ProductoUsuarioControlador.save);
router.get("/api/delete/:id?", ProductoUsuarioControlador.delete);

module.exports = router;