INSTITUTO TECNOLÓGICO NACIONAL DE MÉXICO

INSTITUTO TECNOLÓGICO DE OAXACA

**Carrera:** Ingeniería en Sistemas Computacionales

**Materia:** Programación Web

**Unidad:** Unidad 2

**Docente:** Adelina Martínez Nieto

**Alumno:** Sánchez Chávez Edwin Noé

**Hora:** 10:00 - 1:00

**Fecha de entrega:** 05 de julio del 2026

---

# Carrusel de Imagenes — Componente Visual JavaScript Reutilizable

---

## ¿Qué es?

El **carrusel de imágenes** es un componente visual interactivo que permite mostrar varias imágenes en un espacio reducido, navegando entre ellas con flechas o indicadores (dots). Es un patrón muy común en sitios web: se usa en portadas, galerías, promociones, etc.

**Carrusel** resuelve esto ofreciendo una función pura de JavaScript que puede incluirse en cualquier página web para:

- Mostrar una galería de imágenes con navegación fluida
- Avanzar y retroceder entre imágenes con flechas
- Saltar a una imagen específica con dots indicadores
- Activar reproducción automática con pausa al pasar el mouse
- Adaptarse a cualquier tamaño de pantalla (diseño responsivo)

---

## Estructura del Repositorio

```
componentJS/
├── README.md
├── index.html          ← Demo del carrusel
├── css/
│   └── componente.css  ← Estilos del carrusel y responsive design
├── js/
│   └── componente.js   ← Función reutilizable CrearCarrusel
└── img/
    ├── img1.jpg
    ├── img2.jpg
    ├── img3.jpg
    └── img4.jpg
```

---

## Instalación

No se necesitan gestores de paquetes ni herramientas de compilación. Solo copia el archivo `componente.js` y `componente.css` en tu proyecto y enlázalos en tu HTML:

```html
<link rel="stylesheet" href="css/componente.css">
<script src="js/componente.js"></script>
```

---

## Función Principal y Ejemplos

### `CrearCarrusel(idContenedor, imagenes, opciones)`

Crea e inserta dinámicamente un carrusel de imágenes en el elemento HTML especificado.

#### Parámetros

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `idContenedor` | string | ID del elemento HTML donde se inserta el carrusel |
| `imagenes` | array | Array con las rutas de las imágenes |
| `opciones` | object | Configuración opcional del carrusel |

#### Opciones disponibles

| Opción | Tipo | Default | Descripción |
|--------|------|---------|-------------|
| `autoplay` | boolean | `false` | Activa el avance automático |
| `velocidad` | number | `3000` | Milisegundos entre cada slide |

---

### Ejemplo 1: Carrusel básico (sin autoplay)

```js
CrearCarrusel("galeria", [
    "img/foto1.jpg",
    "img/foto2.jpg",
    "img/foto3.jpg"
]);
```

**Resultado:** Un carrusel con 3 imágenes. El usuario navegamanualmente con las flechas o los dots.

---

### Ejemplo 2: Carrusel con autoplay

```js
CrearCarrusel("banner", [
    "img/promo1.jpg",
    "img/promo2.jpg",
    "img/promo3.jpg",
    "img/promo4.jpg"
], { autoplay: true, velocidad: 4000 });
```

**Resultado:** Las imágenes cambian automáticamente cada 4 segundos. Al pasar el mouse, se pausa. Al salir, reanuda.

---

### Ejemplo 3: Dos carruseles en la misma página

```html
<div id="carrusel1"></div>
<div id="carrusel2"></div>

<script>
    // Carrusel de fotos personales
    CrearCarrusel("carrusel1", [
        "img/playa.jpg",
        "img/montana.jpg",
        "img/ciudad.jpg"
    ], { autoplay: true, velocidad: 3000 });

    // Carrusel de productos
    CrearCarrusel("carrusel2", [
        "img/producto1.jpg",
        "img/producto2.jpg",
        "img/producto3.jpg",
        "img/producto4.jpg",
        "img/producto5.jpg"
    ], { autoplay: false });
</script>
```

**Resultado:** Dos carruseles independientes en la misma página, cada uno con sus propias imágenes y configuración.

---

## Cómo funciona internamente

### 1. Generación dinámica del HTML

La función no necesita que escribas HTML manual. Crea toda la estructura automáticamente:

```js
// Lo que genera internamente:
<div class="carrusel-contenedor">
    <div class="carrusel-fila">
        <img src="img/foto1.jpg" alt="Imagen 1">
        <img src="img/foto2.jpg" alt="Imagen 2">
        <img src="img/foto3.jpg" alt="Imagen 3">
    </div>
    <button class="carrusel-flecha carrusel-flecha-izq">‹</button>
    <button class="carrusel-flecha carrusel-flecha-der">›</button>
    <div class="carrusel-dots">
        <button class="carrusel-dot carrusel-dot-activo"></button>
        <button class="carrusel-dot"></button>
        <button class="carrusel-dot"></button>
    </div>
</div>
```

---

### 2. Navegación con translateX

Las imágenes están en una fila horizontal. Para mostrar una imagen, se mueve toda la fila con `transform: translateX()`:

```js
// Imagen 0 → translateX(0%)     → muestra foto1
// Imagen 1 → translateX(-100%)  → muestra foto2
// Imagen 2 → translateX(-200%)  → muestra foto3
fila.style.transform = "translateX(-" + (indiceActual * 100) + "%)";
```

---

### 3. Loop infinito

Si el usuario está en la última imagen y presiona "siguiente", vuelve a la primera. Y al revés:

```js
if (indiceActual < 0) {
    indiceActual = imagenes.length - 1;  // última imagen
}
if (indiceActual >= imagenes.length) {
    indiceActual = 0;  // primera imagen
}
```

---

### 4. Autoplay con pausa en hover

El avance automático usa `setInterval`. Al pasar el mouse se cancela, y al salir se reinicia:

```js
// Iniciar autoplay
autoplayTimer = setInterval(function () {
    irASlide(indiceActual + 1);
}, config.velocidad);

// Pausar al hacer hover
carrusel.addEventListener("mouseenter", function () {
    clearInterval(autoplayTimer);
});

// Reanudar al salir el mouse
carrusel.addEventListener("mouseleave", function () {
    autoplayTimer = setInterval(function () {
        irASlide(indiceActual + 1);
    }, config.velocidad);
});
```

---

### 5. Actualización de dots

Al cambiar de imagen, se quita la clase activa de todos los dots y se pone en el actual:

```js
for (var k = 0; k < dots.length; k++) {
    dots[k].classList.remove("carrusel-dot-activo");
}
dots[indiceActual].classList.add("carrusel-dot-activo");
```

---

## Integración en el Proyecto

### HTML mínimo necesario

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mi Carrusel</title>
    <link rel="stylesheet" href="css/componente.css">
</head>
<body>
    <h1>Mi Galería de Imágenes</h1>

    <!-- Contenedor vacío donde se inserta el carrusel -->
    <div id="miCarrusel"></div>

    <script src="js/componente.js"></script>
    <script>
        CrearCarrusel("miCarrusel", [
            "img/img1.jpg",
            "img/img2.jpg",
            "img/img3.jpg",
            "img/img4.jpg"
        ], { autoplay: true, velocidad: 3000 });
    </script>
</body>
</html>
```

---

### CSS personalizado (opcional)

Si quieres cambiar los colores o tamaños, puedes sobreescribir las clases en tu propio CSS:

```css
/* Cambiar color de las flechas */
.carrusel-flecha {
    background-color: rgba(0, 100, 200, 0.7);
}

/* Cambiar tamaño de las imágenes */
.carrusel-fila img {
    height: 500px;
}

/* Cambiar color de los dots */
.carrusel-dot {
    background-color: rgba(255, 255, 255, 0.4);
}

.carrusel-dot-activo {
    background-color: #007bff;
}
```

---

## Diseño Responsivo

El carrusel se adapta automáticamente a diferentes tamaños de pantalla:

| Dispositivo | Ancho | Altura de imagen | Tamaño flechas |
|-------------|-------|------------------|----------------|
| Desktop | 700px max | 400px | 45px |
| Tablet | 100% | 300px | 38px |
| Celular | 100% | 200px | 32px |

No se necesita configuración adicional. El CSS usa `@media queries` para ajustar automáticamente.

---

## Tecnologías

- **HTML5** — Estructura semántica
- **CSS3** — Flexbox, transiciones, diseño responsivo con media queries
- **JavaScript vanilla** — Sin frameworks, sin dependencias externas

---

## Autor

**Sánchez Chávez Edwin Noé**

Ingeniería en Sistemas Computacionales

Instituto Tecnológico de Oaxaca
