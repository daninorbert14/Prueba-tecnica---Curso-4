"use strict"

const inputNuevaTarea = document.getElementById("nuevaTarea");
const listaTareas = document.getElementById("listaTareas");
const botonAniadir = document.getElementById("aniadir");
const botonEliminarCompletadas = document.getElementById("eliminarCompletadas");
const botonEliminarTodas = document.getElementById("eliminarTodas");

// Array de tareas que se carga al inicio
let tareas = JSON.parse(localStorage.getItem("tareas")) || [];
// El contador se inicializa en el máximo índice existente + 1 para que las nuevas tareas continúen desde donde se quedaron
let contadorTareas = tareas.length > 0 ? Math.max(...tareas.map(t => t.index)) + 1 : 1;

// Función que renderiza la lista
function renderTodas() {
    // Limpia la lista
    listaTareas.innerHTML = "";

    // Recorre el array de tareas y crea los elementos del DOM
    tareas.forEach(t => {
        const li = document.createElement("li");
        li.dataset.index = t.index;

        const input = document.createElement("input");
        input.type = "checkbox";
        input.checked = t.completado;

        const span = document.createElement("span");
        span.textContent = t.texto;

        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "🗑️";
        botonEliminar.classList.add("botonEliminarTarea");

        // Aplicar estilos si está completada
        if (t.completado) {
             li.classList.add("completado");
        }

        li.appendChild(input);
        li.appendChild(span);
        li.appendChild(botonEliminar);
        listaTareas.appendChild(li);
    });

    // Guardar el array completo en localStorage
    localStorage.setItem("tareas", JSON.stringify(tareas));
}

// Nuevo evento al hacer click en el botón "Añadir"
botonAniadir.addEventListener("click", () => {
    aniadirTarea();
    renderTodas();
});

// Nuevo evento al pulsar la tecla "Enter" encima del input de texto
inputNuevaTarea.addEventListener("keydown", (evento) => {
    if (evento.key === "Enter") {
        aniadirTarea();
        renderTodas();
    }
});

// Función que añade una nueva tarea a la lista
function aniadirTarea() {
    const texto = inputNuevaTarea.value.trim();

    // Validación para que no se introduzca texto vacío
    if (texto === "") {
        alert("El campo no puede estar vacío");
        return;
    }

    // Guardar el objeto en el array de tareas
    tareas.push({
        index: contadorTareas,
        texto: texto,
        completado: false
    });

    // Limpiar y preparar para la siguiente
    inputNuevaTarea.value = "";
    contadorTareas++;
}

// Nuevo evento al hacer click en el checkbox de una tarea
listaTareas.addEventListener("click", (evento) => {
    if (evento.target.type === "checkbox") {
        marcarCompletado(evento.target);
        renderTodas();
    }
});

// Función que modifica una tarea visualmente al marcarla como completada
function marcarCompletado(checkbox) {
    const index = Number(checkbox.closest("li").dataset.index);
    const tarea = tareas.find(t => t.index === index);
    
    if (tarea) tarea.completado = checkbox.checked;
}

// Nuevo evento al hacer click en el botón de "Eliminar tarea"
listaTareas.addEventListener("click", (evento) => {
    if (evento.target.tagName === "BUTTON") {
        eliminarTarea(evento.target);
        renderTodas();
    }
});

// Función que elimina la tarea seleccionada
function eliminarTarea(boton) {
    const index = Number(boton.closest("li").dataset.index);

    // Deja todas las tareas cuyo índice sea distinto del seleccionado
    tareas = tareas.filter(t => t.index !== index);
}

// Nuevo evento al hacer click en el botón "Eliminar tareas completadas"
botonEliminarCompletadas.addEventListener("click", () => {
    eliminarCompletadas();
    renderTodas();
});

// Función que elimina las tareas completadas
function eliminarCompletadas() {
    tareas = tareas.filter(t => !t.completado);
}

// Nuevo evento al hacer click en el botón "Eliminar todas las tareas"
botonEliminarTodas.addEventListener("click", () => {
    eliminarTodas();
    renderTodas();
});

// Función que elimina todas las tareas de la lista
function eliminarTodas() {
    tareas = [];
}

// Llamada a la función para mostrar las tareas guardadas al cargar la página
renderTodas();