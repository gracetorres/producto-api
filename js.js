let arrayProductos = [];



function mostrarTabla(){
    const table = document.getElementById("table");
    let html="";

    for (let index = 0; index < arrayProductos.length; index++) {
        html+=
        `
             <tr>
                <td>${index + 1}</td>
                <td>${arrayProductos[index].name}</td>
                <td>${arrayProductos[index].category}</td>
                <td>${arrayProductos[index].price}</td>
                <td><img class="img" src="${arrayProductos[index].imgURL}" alt=""></td>  
                <td>
                <button onclick="mostrarModalEditar('${arrayProductos[index]._id}')">Editar</button>
                <button onclick="eliminarProducto('${arrayProductos[index]._id}')">Eliminar</button>  
                </td>
            </tr>
            
        `
    }
    table.innerHTML = html;
}

function abrirModal(quiereAgregar){
    if (quiereAgregar) {
        ocultarTituloEditar()
        mostrarTituloAgregar()
        ocultarbotonEditar()
        mostrarbotonAgregar()
    }

    const section1 = document.getElementById("section1");
    section1.classList.add("modal--show");
}

function mostrarModalEditar(idProducto){

    llamarApiObtenerProductoPorID(idProducto)


    // const findPosition = arrayProductos.findIndex((x) => { return x._id == idProducto});
    // if (findPosition >= 0) {
    //     const datos = arrayProductos[findPosition]
   

    // }

}

function actualizarInputs(producto){

    const inpNombre = document.getElementById("inpNombre");
    const inpCategoría = document.getElementById("inpCategoría");
    const inpPrecio = document.getElementById("inpPrecio");
    const inpImagen = document.getElementById("inpImagen");
    const inpID = document.getElementById("inpIDproducto");
    
    inpNombre.value = producto.name;
    inpCategoría.value = producto.category;
    inpPrecio.value = producto.price;
    inpImagen.value =producto.imgURL;
    inpID.value = producto._id;
}

function cerrarModal(){
    const section1 = document.getElementById("section1");
    section1.classList.remove("modal--show");
    limpiarFormulario()
}

function ocultarTituloEditar(){
    const tituloEditar = document.getElementById("tituloEditar");
    tituloEditar.classList.add("display-none");
}
function mostrarTituloEditar(){
    const tituloEditar = document.getElementById("tituloEditar");
    tituloEditar.classList.remove("display-none");
}

function mostrarTituloAgregar(){
    const tituloAgregar = document.getElementById("tituloAgregar");
    tituloAgregar.classList.remove("display-none");
}

function ocultarTituloAgregar(){
    const tituloAgregar = document.getElementById("tituloAgregar");
    tituloAgregar.classList.add("display-none");
}


function ocultarbotonEditar(){
    const botonEditar = document.getElementById("botonEditar");
    botonEditar.classList.add("display-none");
}
function mostrarbotonEditar(){
    const botonEditar = document.getElementById("botonEditar");
    botonEditar.classList.remove("display-none");
}

function mostrarbotonAgregar(){
    const botonAgregar = document.getElementById("botonAgregar");
    botonAgregar.classList.remove("display-none");
}

function ocultarbotonAgregar(){
    const botonAgregar = document.getElementById("botonAgregar");
    botonAgregar.classList.add("display-none");
}


function agregarProducto(){
 
    const inpNombre = document.getElementById("inpNombre").value;
    const inpCategoría = document.getElementById("inpCategoría").value;
    const inpPrecio = document.getElementById("inpPrecio").value;
    const inpImagen = document.getElementById("inpImagen").value;

    if (inpNombre && inpCategoría && inpPrecio && inpImagen) {
        const  objeto = {
            name: inpNombre,
            category: inpCategoría,
            price: inpPrecio,
            imgURL: inpImagen
        }
    
        llamarApiAgregarProducto(objeto)

    
    }

}

function llamarApiAgregarProducto(product){
    const url = "http://localhost:3000/api/products";
    const headers = {"Content-Type": "application/json"};
    fetch(url,{
        method: "POST",
        headers: headers,
        body: JSON.stringify(product) 
    })
    .then((res) => {
        return res.json()
    })
    .then((res) => {
        limpiarFormulario()
        cerrarModal()
        llamarApiObtenerProductos()
    })
    .catch((err) => {
        alert("ocurrio un error")
    })
}


function limpiarFormulario(){
    const inpNombre = document.getElementById("inpNombre");
    const inpCategoría = document.getElementById("inpCategoría");
    const inpPrecio = document.getElementById("inpPrecio");
    const inpImagen = document.getElementById("inpImagen");
    
    inpNombre.value = "";
    inpCategoría.value = "";
    inpPrecio.value = "";
    inpImagen.value ="";
}

function eliminarProducto(idProducto){
    const url = "http://localhost:3000/api/products/"+idProducto;
    fetch(url,{
        method: "DELETE"
    })
    .then((res) => {
        return res.json()
    })
    .then((res) => {
        llamarApiObtenerProductos();
    })
    .catch((err) => {
        alert("ocurrio un error")
    })
    
}



function editarProducto(){
    const inpNombre = document.getElementById("inpNombre").value;
    const inpCategoría = document.getElementById("inpCategoría").value;
    const inpPrecio = document.getElementById("inpPrecio").value;
    const inpImagen = document.getElementById("inpImagen").value;
    const inpID = document.getElementById("inpIDproducto").value;


    if (inpNombre && inpCategoría && inpPrecio && inpImagen) {
        const  objetoEditar = {
            name: inpNombre,
            category: inpCategoría,
            price: inpPrecio,
            imgURL: inpImagen
        }

        llamarApiEditarProducto(inpID,objetoEditar)
    }
}



function funcionesIniciales(){
    llamarApiObtenerProductos() 
}

function llamarApiObtenerProductos(){
    const url = "http://localhost:3000/api/products"
    fetch(url,{
        method: "GET"
    })
    .then((res) => {
        return res.json()
    })
    .then((res) => {
        arrayProductos = res;
        mostrarTabla();
    })

}

function llamarApiEditarProducto(idProducto,objetoActualizar){

    const url = "http://localhost:3000/api/products/"+idProducto;
    const headers = {"Content-Type": "application/json"};
    fetch(url,{
        method: "PUT",
        body:JSON.stringify(objetoActualizar),
        headers: headers
    })
    .then((res) => {
        return res.json()
    })
    .then((res) => {
        limpiarFormulario()
        cerrarModal()
        llamarApiObtenerProductos()
    })

}

function llamarApiObtenerProductoPorID(idProducto){
    const url = "http://localhost:3000/api/products/"+idProducto;
    fetch(url,{
        method: "GET"
    })
    .then((res) => {
        return res.json()
    })
    .then((res) => {

        actualizarInputs(res)
        ocultarTituloAgregar()
        mostrarTituloEditar()
        mostrarbotonEditar()
        ocultarbotonAgregar()
        abrirModal(false)
        console.log(res)
    })

}