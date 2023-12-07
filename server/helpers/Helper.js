class Helper {

    agregarCero(numero) {
        if (numero < 10) {
            numero = "0" + numero;
        }
        return numero;
    }

}

module.exports = Helper;