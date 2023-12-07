const IndexControlador = require('../controllers/index'); 

const express = require('express');
var router = express.Router();

router.get("/:pagina?", IndexControlador.index);

module.exports = router;