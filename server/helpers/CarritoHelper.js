class CarritoHelper {

    obtenerTotal(carrito) {
        var total = 0;
        carrito.forEach(function(elemento) {
            total+=elemento.precio * elemento.unidades;
        });
        return total;
    }

}

module.exports = CarritoHelper;