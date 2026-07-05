# Carrusel de Imagenes - Componente JavaScript Reutilizable

Componente visual interactivo de carrusel de imagenes, creado con HTML, CSS y JavaScript puro (sin frameworks).

## Caracteristicas

- Navegacion con flechas izquierda/derecha
- Indicadores (dots) clickeables
- Autoplay opcional (pausa al pasar el mouse)
- Transiciones suaves
- Totalmente reutilizable con diferentes imagenes y configuraciones

## Uso

### 1. Incluir los archivos

```html
<link rel="stylesheet" href="css/componente.css">
<script src="js/componente.js"></script>
```

### 2. Crear un contenedor vacio

```html
<div id="miCarrusel"></div>
```

### 3. Llamar a la funcion

```javascript
CrearCarrusel("miCarrusel", [
    "img/imagen1.jpg",
    "img/imagen2.jpg",
    "img/imagen3.jpg"
], { autoplay: true, velocidad: 3000 });
```

## Parametros

| Parametro | Tipo | Descripcion |
|-----------|------|-------------|
| `idContenedor` | string | ID del elemento HTML donde se inserta el carrusel |
| `imagenes` | array | Array con las rutas de las imagenes |
| `opciones` | object | Configuracion opcional |

### Opciones disponibles

| Opcion | Tipo | Default | Descripcion |
|--------|------|---------|-------------|
| `autoplay` | boolean | `false` | Activa el avance automatico |
| `velocidad` | number | `3000` | Milisegundos entre cada slide |

## Estructura del proyecto

```
componentJS/
├── README.md
├── index.html
├── css/
│   └── componente.css
├── js/
│   └── componente.js
└── img/
    ├── img1.jpg
    ├── img2.jpg
    ├── img3.jpg
    └── img4.jpg
```
