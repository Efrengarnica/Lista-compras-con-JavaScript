const nombreArticulo = document.getElementById("articulo");
const botonRegistrar = document.getElementById("boton-registrar");
const botonBorrarTodo = document.getElementById("borrar-todo");
const listaDeArticulos = document.getElementById("articulos-id");
const arregloProductos = [];

botonRegistrar.addEventListener("click", function(event){
    event.preventDefault();
    if (nombreArticulo.value === ""){
        alert("Ingresa el nombre de un articulo.");
        nombreArticulo.focus();
        return;
    }
    if (arregloProductos.includes(nombreArticulo.value.trim().toLowerCase())){
        nombreArticulo.value = "";
        nombreArticulo.focus();
        alert("El articulo ya existe.");
        return;
    }
    arregloProductos.push(nombreArticulo.value.trim().toLowerCase())
    let nuevoArticulo = `
                <div class="articulo-lista"> 
                    <p>${nombreArticulo.value.trim()}</p>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="tarea-hecha"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="borrar-tarea-de-lista"><path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
                </div>
                        `;
    listaDeArticulos.insertAdjacentHTML("beforeend",nuevoArticulo);
    nombreArticulo.value = "";
    nombreArticulo.focus();
});

botonBorrarTodo.addEventListener("click", function(event){
    event.preventDefault();
    while (listaDeArticulos.firstChild){
        listaDeArticulos.removeChild(listaDeArticulos.firstChild)
    }
    nombreArticulo.value = "";
    nombreArticulo.focus();
    arregloProductos.length = 0;
});

listaDeArticulos.addEventListener("click", (e) => {
    e.preventDefault()
    /*  if(e.target.classList.contains("borrar-tarea-de-lista")){
        e.target.parentElement.remove();
    } */
    const botonBorrar = e.target.closest(".borrar-tarea-de-lista");
    if(botonBorrar){
        const contenedorArticulo = botonBorrar.closest(".articulo-lista");
        const nombreDeArticulo = contenedorArticulo.querySelector("p").textContent.trim().toLowerCase();
        botonBorrar.parentElement.remove();
        const index = arregloProductos.indexOf(nombreDeArticulo);
        if(index !== -1){
            arregloProductos.splice(index,1);
        }
    }
    const botonHecha = e.target.closest(".tarea-hecha");
    if(botonHecha){
        const contenedorArticulo = botonHecha.closest(".articulo-lista");
        const contenedorNombreArticulo = contenedorArticulo.querySelector("p");
        contenedorNombreArticulo.classList.toggle("parrafo-rayado");
        botonHecha.classList.toggle("completada");
    }
});

nombreArticulo.addEventListener("keydown", function(event){
    if(event.key === "Enter"){
        event.preventDefault();
        botonRegistrar.click();
    }
});
