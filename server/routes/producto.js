const ProductoControlador = require('../controllers/producto');

const express = require('express');
var router = express.Router();

const path = require('path');
const multer = require('multer');

var imagenStorage = multer.diskStorage({
    destination: function(request, archivo, cb) {
        cb(null, "./uploads/models/producto/images");
    },
    filename: function(request, archivo, cb) {
        cb(null, archivo.fieldname + "-" + Date.now() + path.extname(archivo.originalname));
    }
});

var imagenUpload = multer({storage: imagenStorage});

router.get("/test-get-producto", ProductoControlador.testGet);
router.post("/test-post-producto", ProductoControlador.testPost);

//Vistas.
router.get("/crear", ProductoControlador.crear);
router.get("/listar/:pagina?", ProductoControlador.listar);
router.get("/modificar/:id?", ProductoControlador.modificar);
router.get("/favoritos/:pagina?", ProductoControlador.favoritos);

//Acciones.
router.post("/save", imagenUpload.single("imagen"), ProductoControlador.save);
router.post("/update", imagenUpload.single("imagen"), ProductoControlador.update);
router.get("/delete/:id?", ProductoControlador.delete);

//Archivos.
router.get("/get-file-imagen/:imagen", ProductoControlador.getFileImagen);

module.exports = router;