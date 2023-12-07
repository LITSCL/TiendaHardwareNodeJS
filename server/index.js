var app = require('./app.js');

var puerto = process.env.SV_PUERTO;

var server = app.listen(puerto, function() {
    console.log(`Servidor levantado correctamente en el puerto ${puerto}`);
});