# To-Do List

Aplicación web de gestión de tareas desarrollada con HTML, CSS y JavaScript Vanilla como parte de una prueba técnica de manipulación del DOM.

---

## Estructura del proyecto

todo-list-js/
├── index.html
├── css/
│   └── styles.css
└── js/
    └── app.js

---

## Funcionalidades

- **Añadir tareas** mediante el botón *Añadir* o pulsando la tecla `Enter`
- **Marcar tareas como completadas** mediante checkbox con cambio visual (texto tachado y color)
- **Eliminar una tarea individual** con el botón *🗑️* de cada elemento
- **Eliminar tareas completadas** con el botón *Eliminar tareas completadas*
- **Eliminar todas las tareas** con el botón *Eliminar todas las tareas*
- **Persistencia de datos** mediante `localStorage`: las tareas se mantienen al recargar la página

---

## Cómo funciona

### Estructura de datos

Todas las tareas se almacenan en un array de objetos en memoria:

```js
let tareas = [
    { index: 1, texto: "Comprar comida", completado: false },
    { index: 2, texto: "Estudiar JavaScript", completado: true },
];
```

El array es la única fuente de verdad. El DOM refleja su estado, no al revés.

### Función de renderizado

`renderTodas()` es la función central de la aplicación. Se encarga de:

1. Limpiar la lista del DOM
2. Recorrer el array `tareas`
3. Crear los elementos del DOM para cada tarea
4. Aplicar la clase `completado` si corresponde
5. Guardar el array actualizado en `localStorage`

Se llama cada vez que el estado cambia (añadir, marcar, eliminar).

### Persistencia con localStorage

Al cargar la página, el array se inicializa desde `localStorage`:

```js
let tareas = JSON.parse(localStorage.getItem("tareas")) || [];
```

El contador de índices se inicializa en el máximo índice guardado + 1 para evitar colisiones:

```js
let contadorTareas = tareas.length > 0 ? Math.max(...tareas.map(t => t.index)) + 1 : 1;
```

### Delegación de eventos

Los clicks sobre los checkboxes y los botones de eliminar individuales se gestionan desde el elemento padre `#listaTareas` mediante delegación de eventos, lo que hace que funcionen también con las tareas añadidas dinámicamente:

```js
listaTareas.addEventListener("click", (evento) => {
    if (evento.target.type === "checkbox") { ... }
    if (evento.target.tagName === "BUTTON") { ... }
});
```

---

## Tecnologías utilizadas

- HTML5
- CSS3 (Flexbox, Custom Properties, Media Queries)
- JavaScript Vanilla
- Web Storage API (`localStorage`)

---

## Decisiones técnicas

| Decisión | Motivo |

| Array como fuente de verdad | Separa estado, lógica e interfaz |
| `renderTodas()` centralizado | Evita duplicar lógica de creación del DOM |
| Delegación de eventos en `listaTareas` | Funciona con elementos creados dinámicamente |
| `classList` para estilos de completado y boton de eliminar tarea | Separa responsabilidades entre JS y CSS |
| `localStorage` con el array completo | Más simple y robusto que guardar items individuales |

---

## Diseño responsive

La interfaz adapta su layout a tres escenarios:

- **Móvil vertical**: elementos apilados en columna
- **Desktop (≥ 600px)**: formulario y footer en fila horizontal, lista con altura fija
- **Móvil horizontal (landscape)**: sin scroll interno en la lista para evitar doble scroll

---

## Cómo ejecutar el proyecto

Al ser un proyecto de HTML, CSS y JS estático, no requiere ninguna instalación ni servidor. Basta con abrir `index.html` en el navegador.

Si quieres servir el proyecto localmente puedes usar la extensión **Live Server** de VS Code o cualquier servidor estático:

```bash
# Con Node.js instalado
npx serve .
```
