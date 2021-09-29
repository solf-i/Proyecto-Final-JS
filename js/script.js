/* CLASES */
class Productos {
  constructor(pId, pNombre, pFoto, pPrecio) {
    this.id = pId;
    this.nombre = pNombre;
    this.foto = pFoto;
    this.precio = pPrecio;
  }

  sumaIva() {
    this.precio = this.precio * 1.21;
  }
}

class Cliente {
  constructor(pNombreAp, pDni, pTelefono, pDireccion) {
    this.nombreAp = pNombreAp;
    this.dni = pDni;
    this.telefono = pTelefono;
    this.direccion = pDireccion;
  }
}

class Compra {
  constructor(pId, pProducto, pCantidad) {
    this.id = pId;
    this.producto = pProducto;
    this.cantidad = pCantidad;
  }
}

/* FUNCIONES */

function crearProductos(arrayProductos) {
  arrayProductos.push(new Productos(0, "Maki", "./imagenes/maki.png", 85.0));
  arrayProductos.push(
    new Productos(1, "Uramaki", "./imagenes/uramaki.png", 85.0)
  );
  arrayProductos.push(
    new Productos(2, "Uramaki Salmón", "./imagenes/uramakiSalmon.png", 105.0)
  );
  arrayProductos.push(
    new Productos(3, "Uramaki Panko", "./imagenes/uramakiPanko.png", 92.0)
  );
  arrayProductos.push(
    new Productos(4, "Salmón Maki", "./imagenes/salmonMaki.png", 400.0)
  );
  arrayProductos.push(
    new Productos(5, "Gunkan", "./imagenes/gunkan.png", 105.0)
  );
  arrayProductos.push(
    new Productos(6, "Nigiri", "./imagenes/nigiri.png", 95.0)
  );
  arrayProductos.push(
    new Productos(7, "Sashimi", "./imagenes/sashimi.png", 150.0)
  );

  return arrayProductos;
}

function renderProducto(arrayProductos) {
  const articulo = document.createElement("div");

  productosContenedor.appendChild(articulo);
  articulo.innerHTML = `<div class="row-3">
        <div class="col">
          <div id= ${arrayProductos.id} class="card"  id="menu">
            <h5 class="card-title " > ${arrayProductos.nombre}  </h5>
            <img src= ${arrayProductos.foto} class="card-img-top" alt="">
            <div class="card-body">      
            <p class="card-text"> $ ${arrayProductos.precio} </p>
            <button class="buttonComprar" onClick="addToCart(${arrayProductos.id})" > <span class="material-icons-outlined">
            add_shopping_cart
            </span> </button>
            </div>
            </div>
        </div> 
        </div> 
        <br> `;
}

function addToCart(id) {
  let productoSeleccionado = arrayProductos.find(
    (producto) => producto.id === id
  );

  const listaProds = document.createElement("tr");
  productosLista.appendChild(listaProds);

  compraParaPushear = new Compra(contadorDeCompra, productoSeleccionado, 1);
  contadorDeCompra++;

  listaProds.innerHTML = ` 
      <td class="listaCarro" style="display:none" id="compra${compraParaPushear.id}">${compraParaPushear.id}</td>
      <td class="listaCarro">${productoSeleccionado.nombre}</td> 
      <td class="listaCarro">$${productoSeleccionado.precio}</td>
      <td class="listaCarro">${compraParaPushear.cantidad}</td>
      <td class="listaCarro"> <button type="button" class="eliminarButton" onClick="removeCart(${compraParaPushear.id})" > x </button> </td> 
    `;
  alert("Se agregó producto al carrito");

  arrayCarrito.push(compraParaPushear);

  valorTotal();
}

function valorTotal() {
  let sumaTotal = 0;

  for (let compra of arrayCarrito) {
    sumaTotal = sumaTotal + compra.producto.precio;
  }
  if (arrayCarrito.length != 0) {
    let verTotal = document.querySelector(".totalCompra");
    verTotal.innerHTML = `Total a pagar: $ ${sumaTotal}`;
  }

  if (arrayCarrito.length === 0) {
    let vacío = document.querySelector(".totalCompra");
    vacío.innerHTML = ``;
  }

  mostrar();
}

function mostrar(sumaTotal) {
  sumaTotal;
}

function removeCart(id) {
  let eliminarSeleccionado = arrayCarrito.find((compra) => compra.id === id);

  $("#compra" + id).parent().remove();

  arrayCarrito.splice(arrayCarrito.indexOf(eliminarSeleccionado), 1);

  console.log(arrayCarrito);

  valorTotal();

  mostrar();
}

$("#finCompra").on("click", () => {

  $("#mostrarForm").fadeIn(1000)
 
});

function validarFormulario(e) {
  e.preventDefault();

  let nombreAp = document.getElementById("nombreYapellido").value;
  let dni = document.getElementById("dni").value;
  let tel = document.getElementById("telefono").value;
  let direccion = document.getElementById("direccion").value;

  let nuevoCliente = new Cliente(nombreAp, dni, tel, direccion);

  arrayClientes.push(nuevoCliente);

  localStorage.setItem(1, JSON.stringify(nuevoCliente));

  console.log(JSON.parse(localStorage.getItem(1)));

  alert("Gracias " + nombreAp + " por tu compra!");

}

function limpiarFormulario() {

  document.getElementById("validar").reset();

  $("#mostrarForm").fadeOut(2500);

  localStorage.clear();
}

$("#scrollTopButton").click(function (e) {

  e.preventDefault();

  $("html, body").animate({ scrollTop: "0" }, 500);

});

/* EJECUCION */

let contadorDeCompra = 0;
let arrayProductos = [];
let arrayCarrito = [];
let arrayClientes = [];
let aceptar = document.getElementById("validar");
aceptar.addEventListener("submit", validarFormulario);

// PRODUCTOS

crearProductos(arrayProductos);

for (let producto of arrayProductos) {
  producto.sumaIva();
}

const productosContenedor = document.getElementById("productos");

arrayProductos.forEach(renderProducto);

const productosLista = document.getElementById("listaCompra");

//CLIENTES

console.log(arrayClientes);

/* ESTILOS CSS */

$("#scrollTopButton").css({
  'background': '#fc6913',
  'color': 'white',
  "border-radius": "70%",
  'width': "50px",
  'height': "50px",
  'border': "none",
  "margin-right": "100px",
  'float': "right",
});

$(".material-icons").css({
  "font-size": "3rem",
  "font-weight": "bold",
});

$(".buttonComprar").css({
  'background': "#fc6913",
  'color': "white",
  "border-radius": "70%",
  'width': "50px",
  'height': "50px",
  'border': "none",
  "margin-right": "50px",
  "margin-bottom": "15px",
  'float': "right",
});

$(".material-icons-outlined").css({
  "font-size": "3rem",
});

$(".card-title").css({
  'color': "#fc6913",
  "font-weight": "bold",
  "font-size": "2rem",
  'margin': "8% 0% 0% 8%",
});

$(".card-text").css({
  'color': "#fc6913",
  "font-weight": "bold",
  "font-size": "2rem",
  'margin': "2% 3% 0% 8%",
  'float': "left",
});

$(".card-img-top").css({
  'width': "220px",
  'height': "200px",
  'margin': "2% 0% 2% 7%",
});

$(".card").css({
  'border': "1px solid black",
  "border-radius": "5%",
  "box-shadow": "10px 5px 5px grey",
});

$(".col").css({
  "margin-bottom": "5%",
  'width': "250px",
  'height': "350px",
});

$("#carrito").css({
 'background': "#fc6913",
  'color': "white",
  "border-radius": "70%",
  'width': "50px",
  'height': "50px",
  'border': "none",
  'float': "right",
});
