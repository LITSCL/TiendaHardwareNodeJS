const ProveedorControlador = require('../controllers/proveedor'); 

const express = require('express');
var router = express.Router();

router.get("/test-get-proveedor", ProveedorControlador.testGet);
router.post("/test-post-proveedor", ProveedorControlador.testPost);

//Vistas.
router.get("/crear", ProveedorControlador.crear);
router.get("/listar/:pagina?", ProveedorControlador.listar);
router.get("/modificar/:id?", ProveedorControlador.modificar);

//Acciones.
router.post("/save", ProveedorControlador.save);
router.post("/update", ProveedorControlador.update);
router.get("/delete/:id?", ProveedorControlador.delete);

module.exports = router;