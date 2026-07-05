/**
 * CrearCarrusel - Funcion para crear un Carrusel
 *
 * @param {string} idContenedor - ID del elemento HTML donde insertar el carrusel
 * @param {string[]} imagenes - Array con las rutas de las imágenes
 * @param {object} opciones - Opciones opcionales del carrusel
 * @param {boolean} opciones.autoplay - Activar avance automático (default: false)
 * @param {number} opciones.velocidad - Milisegundos entre slides (default: 3000)
 */
function CrearCarrusel(idContenedor, imagenes, opciones) {
    var config = Object.assign({
        autoplay: false,
        velocidad: 3000
    }, opciones || {});

    var contenedor = document.getElementById(idContenedor);
    if (!contenedor) {
        console.error("No se encontro el elemento con id: " + idContenedor);
        return;
    }

    var indiceActual = 0;
    var autoplayTimer = null;

    // Crear estructura principal html
    // Carrusel un contenedor principal con overflow hidden
    // Fila es una fila horizontal que contiene las img lado a lado
    var carrusel = document.createElement("div");
    carrusel.className = "carrusel-contenedor";

    var fila = document.createElement("div");
    fila.className = "carrusel-fila";

    // Agregar imágenes
    // Este bucle va recorriendo el array de img y por cada una crea un <img>
    // que mete dentro de fila
    for (var i = 0; i < imagenes.length; i++) {
        var img = document.createElement("img");
        img.src = imagenes[i];
        img.alt = "Imagen " + (i + 1);
        fila.appendChild(img);
    }

    /* En general se crean las felchas de navegacion la izq y derecha con los simbolos
     ‹ y › el css ya las posiciona a los lados */
    // Flecha izquierda
    var btnIzq = document.createElement("button");
    btnIzq.className = "carrusel-flecha carrusel-flecha-izq";
    btnIzq.innerHTML = "&#10094;";

    // Flecha derecha
    var btnDer = document.createElement("button");
    btnDer.className = "carrusel-flecha carrusel-flecha-der";
    btnDer.innerHTML = "&#10095;";

    /* Se agrega otra forma de navegar el carrusel no solo flechas si no que se crea
    un boton por cada imagen.*/
    // Dots
    var dotsContainer = document.createElement("div");
    dotsContainer.className = "carrusel-dots";

    var dots = [];
    for (var j = 0; j < imagenes.length; j++) {
        var dot = document.createElement("button");
        dot.className = "carrusel-dot";
        if (j === 0) {
            dot.classList.add("carrusel-dot-activo");
        }
        dots.push(dot);
        dotsContainer.appendChild(dot);
    }

    // Armar carrusel
    carrusel.appendChild(fila);
    carrusel.appendChild(btnIzq);
    carrusel.appendChild(btnDer);
    carrusel.appendChild(dotsContainer);
    contenedor.appendChild(carrusel);

    // Función para mover el carrusel
    function irASlide(indice) {
        indiceActual = indice;
        if (indiceActual < 0) {
            indiceActual = imagenes.length - 1; // loop: si pasa el primero, va al último
        }
        if (indiceActual >= imagenes.length) {
            indiceActual = 0; // Al reves basicamente. loop: si pasa el último, va al primero

        }
        fila.style.transform = "translateX(-" + (indiceActual * 100) + "%)";

        // Actualizar dots
        for (var k = 0; k < dots.length; k++) {
            dots[k].classList.remove("carrusel-dot-activo");
        }
        dots[indiceActual].classList.add("carrusel-dot-activo");
    }

    // Eventos flechas
    btnIzq.addEventListener("click", function () {
        irASlide(indiceActual - 1);
    });

    btnDer.addEventListener("click", function () {
        irASlide(indiceActual + 1);
    });

    // Eventos dots
    for (var d = 0; d < dots.length; d++) {
        (function (indice) {
            dots[indice].addEventListener("click", function () {
                irASlide(indice);
            });
        })(d);
    }

    // Autoplay
    if (config.autoplay) {
        autoplayTimer = setInterval(function () {
            irASlide(indiceActual + 1); // Avanza cada X ms o el tiempo que se configuro
        }, config.velocidad);

        carrusel.addEventListener("mouseenter", function () {
            clearInterval(autoplayTimer); // pausa al pasar el mouse
        });

        carrusel.addEventListener("mouseleave", function () {
            autoplayTimer = setInterval(function () {
                irASlide(indiceActual + 1);
            }, config.velocidad);
        });
    }
}
