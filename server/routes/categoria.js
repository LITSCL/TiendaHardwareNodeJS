const CategoriaControlador = require('../controllers/categoria'); 

const express = require('express');
var router = express.Router();

router.get("/test-get-categoria", CategoriaControlador.testGet);
router.post("/test-post-categoria", CategoriaControlador.testPost);

//Vistas.
router.get("/crear", CategoriaControlador.crear);
router.get("/listar/:pagina?", CategoriaControlador.listar);
router.get("/mostrar/:id?/:pagina?", CategoriaControlador.mostrar);
router.get("/modificar/:id?", CategoriaControlador.modificar);

//Acciones.
router.post("/save", CategoriaControlador.save);
router.post("/update", CategoriaControlador.update);
router.get("/delete/:id?", CategoriaControlador.delete);

module.exports = router;