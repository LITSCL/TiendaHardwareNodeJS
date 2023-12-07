const UsuarioControlador = require('../controllers/usuario'); 

const express = require('express');
var router = express.Router();

const path = require('path');
const multer = require('multer');

var imagenStorage = multer.diskStorage({
    destination: function(request, archivo, cb) {
        cb(null, "./uploads/models/usuario/images");
    },
    filename: function(request, archivo, cb) {
        cb(null, archivo.fieldname + "-" + Date.now() + path.extname(archivo.originalname));
    }
});

var imagenUpload = multer({storage: imagenStorage});

router.get("/test-get-usuario", UsuarioControlador.testGet);
router.post("/test-post-usuario", UsuarioControlador.testPost);

//Vistas.
router.get("/registrarse", UsuarioControlador.registrarse);
router.get("/iniciar-sesion", UsuarioControlador.iniciarSesion);
router.get("/editar-perfil", UsuarioControlador.editarPerfil);

//Acciones.
router.post("/save", UsuarioControlador.save);
router.post("/login", UsuarioControlador.login);
router.get("/logout", UsuarioControlador.logout);
router.post("/update", imagenUpload.single("imagen"), UsuarioControlador.update);

//Archivos.
router.get("/get-file-imagen/:imagen", UsuarioControlador.getFileImagen);

module.exports = router;