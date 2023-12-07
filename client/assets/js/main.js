var url = "http://localhost:2900/";

window.addEventListener("load", function() {
    $(document).tooltip();
    
    $(".boton-like").css("cursor", "pointer");
    $(".boton-dislike").css("cursor", "pointer");
    
    function darLike() {
        $(".boton-dislike").unbind("click").click(function() {
            var elemento = $(this);
            
            fetch(url + "producto-usuario/api/save/" + $(this).attr("data-idProducto"), {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            })
            .then(function(response) {
                return response.json(); 
            })
            .then(function(datos) {
                if (datos.mensaje == "SERVIDOR: Eres administrador") {
                    
                }
                else if (datos.mensaje == "SERVIDOR: No estas logeado") {
                    
                }
                else {
                    elemento.addClass("boton-like");
                    elemento.removeClass("boton-dislike");
                    elemento.attr("src", url + "assets/img/heart-red.png");
                
                    darDislike();
                }
                console.log(datos); 
            })
            .catch(function(error) {
                console.log(error);
            });
        });
    }
    
    function darDislike() {
        $(".boton-like").unbind("click").click(function() {
            $(this).addClass("boton-dislike");
            $(this).removeClass("boton-like");
            $(this).attr("src", url + "assets/img/heart-gray.png");
            
            fetch(url + "producto-usuario/api/delete/" + $(this).attr("data-idProducto"), {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            })
            .then(function(response) {
                return response.json(); 
            })
            .then(function(datos) {
                console.log(datos);
            })
            .catch(function(error) {
                console.log(error);
            });
            
            darLike();
        });
    }
    
    darLike();
    darDislike();
});