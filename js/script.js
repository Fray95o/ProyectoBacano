/* =========================================
   BIBLIOTECA EL SABER
   Los libros se guardan en localStorage del navegador.
========================================= */

const CLAVE_LIBROS = "bibliotecaElSaberLibros";

const formulario = document.getElementById("formulario");
const formularioLibro = document.getElementById("formularioLibro");
const listaLibros = document.getElementById("listaLibros");
const nombreLibro = document.getElementById("nombreLibro");
const direccionLibro = document.getElementById("direccionLibro");
const descripcionLibro = document.getElementById("descripcionLibro");

document.getElementById("mostrarFormularioBtn").addEventListener("click", mostrarFormulario);
document.getElementById("cancelarFormularioBtn").addEventListener("click", ocultarFormulario);
formularioLibro.addEventListener("submit", agregarLibro);

function obtenerLibros() {
    try {
        const librosGuardados = localStorage.getItem(CLAVE_LIBROS);
        const libros = librosGuardados ? JSON.parse(librosGuardados) : [];
        return Array.isArray(libros) ? libros : [];
    } catch (error) {
        console.error("No se pudieron leer los libros guardados:", error);
        return [];
    }
}

function guardarLibros(libros) {
    try {
        localStorage.setItem(CLAVE_LIBROS, JSON.stringify(libros));
        return true;
    } catch (error) {
        console.error("No se pudieron guardar los libros:", error);
        alert("No se pudieron guardar los libros en este navegador. Comprueba el almacenamiento disponible.");
        return false;
    }
}

function mostrarFormulario() {
    formulario.hidden = false;
    nombreLibro.focus();
    formulario.scrollIntoView({ behavior: "smooth", block: "center" });
}

function ocultarFormulario() {
    formulario.hidden = true;
}

function agregarLibro(evento) {
    evento.preventDefault();

    const nombre = nombreLibro.value.trim();
    const direccion = direccionLibro.value.trim();
    const descripcion = descripcionLibro.value.trim();

    if (!nombre || !direccion || !descripcion) {
        alert("Completa todos los campos.");
        return;
    }

    const libros = obtenerLibros();
    libros.push({
        id: crearId(),
        nombre,
        direccion,
        descripcion
    });

    if (!guardarLibros(libros)) {
        return;
    }

    formularioLibro.reset();
    ocultarFormulario();
    mostrarLibros();
}

function crearId() {
    if (window.crypto && typeof window.crypto.randomUUID === "function") {
        return window.crypto.randomUUID();
    }
    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function crearEnlaceLibro(direccion) {
    const enlace = document.createElement("a");
    enlace.href = direccion;
    enlace.target = "_blank";
    enlace.rel = "noopener noreferrer";
    enlace.textContent = "📖 Leer libro";
    enlace.className = "enlace-libro";
    enlace.setAttribute("aria-label", "Abrir libro en una pestaña nueva");
    return enlace;
}

function mostrarLibros() {
    const libros = obtenerLibros();
    listaLibros.replaceChildren();

    if (libros.length === 0) {
        const mensaje = document.createElement("p");
        mensaje.className = "mensaje-vacio";
        mensaje.textContent = "Todavía no hay libros agregados.";
        listaLibros.appendChild(mensaje);
        return;
    }

    libros.forEach((libro) => {
        const tarjeta = document.createElement("article");
        tarjeta.className = "libro";

        const titulo = document.createElement("h3");
        titulo.textContent = `📖 ${libro.nombre}`;

        const descripcion = document.createElement("p");
        const etiqueta = document.createElement("strong");
        etiqueta.textContent = "Sobre el libro: ";
        descripcion.append(etiqueta, document.createTextNode(libro.descripcion));

        const acciones = document.createElement("div");
        acciones.className = "acciones-libro";
        acciones.appendChild(crearEnlaceLibro(libro.direccion));

        const botonEliminar = document.createElement("button");
        botonEliminar.type = "button";
        botonEliminar.className = "boton-eliminar";
        botonEliminar.textContent = "🗑️ Eliminar";
        botonEliminar.addEventListener("click", () => eliminarLibro(libro.id));

        acciones.appendChild(botonEliminar);
        tarjeta.append(titulo, descripcion, acciones);
        listaLibros.appendChild(tarjeta);
    });
}

function eliminarLibro(id) {
    const confirmar = window.confirm("¿Seguro que quieres eliminar este libro de la lista?");
    if (!confirmar) return;

    const librosActualizados = obtenerLibros().filter((libro) => libro.id !== id);
    if (guardarLibros(librosActualizados)) {
        mostrarLibros();
    }
}

/* Cargar los libros guardados cada vez que se abre o recarga la página. */
document.addEventListener("DOMContentLoaded", mostrarLibros);
mostrarLibros();
