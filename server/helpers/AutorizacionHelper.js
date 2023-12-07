class AutorizacionHelper {

    validarUsuario(sesion) {
        if (sesion) {
            return true;
        }
        else {
            return false;
        }
    }

    validarAdministrador(sesion) {
        if (sesion && sesion.tipo == "Administrador") {
            return true;
        }
        else {
            return false;
        }
    }

    validarCliente(sesion) {
        if (sesion && sesion.tipo == "Cliente") {
            return true;
        }
        else {
            return false;
        }
    }

}

module.exports = AutorizacionHelper;