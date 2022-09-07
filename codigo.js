const btnMostrarAlert = document.getElementById("btn-mostrar-alert");
btnMostrarAlert.onclick = mostrarAlert;

function mostrarAlert() {    
    swal.fire({
        title: '<strong> Queres comunicarte con nosotros?</strong>',
        icon: 'warning',
        html:
          'Mandanos un <b>Whatsapp</b> ' +
          '<a href="https://wa.me/5493513296894">aca!</a> ',
          
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText:
          '<i class="fa fa-thumbs-up"></i> Salir',
        confirmButtonAriaLabel: 'No, gracias!',
        cancelButtonText:
          '<i class="fa fa-thumbs-down"></i>',
        cancelButtonAriaLabel: 'Thumbs down'
      });
}
/** PRUEBA */
const cards = document.getElementById("cards")
const items = document.getElementById("items")
const footer = document.getElementById("footer")
const templateCard = document.getElementById("template-card")
const templateFooter = document.getElementById("template-footer")
const templateCarrito = document.getElementById("template-carrito")
const fragment = document.createDocumentFragment()

class Producto {
    constructor(id, nombre, imagen,precio){
        this.id = id;
        this.nombre = nombre;
        this.imagen = imagen;
        this.precio = precio;
    }
}
 let carrito = [];

document.addEventListener('DOMContentLoaded', () => {  
    console.log('Carro 1', carrito);  
    if(localStorage.getItem("carrito")) {
        carga = JSON.parse(localStorage.getItem("carrito"));

        //if(carga !== null){
            carrito = carga;
        //}
        console.log('Carro 2', carrito);
        pintarCarrito()
    }
})
cards.addEventListener("click", e =>{
    addCarrito(e)
})

items.addEventListener("click", e =>{
    btnAumentar
})
//FETCH DE MIS PRODUCTOS //
const fetchData = async () => {
    try{
        const res = await fetch ("jsonTest.json")
        const data = await res.json()  
        //  console.log(data)      
        pintarCards(data)
    } catch (error) {
        console.log(error)
    }
}
fetchData()

// let catalogoFotos = []
const pintarCards = catalogoFotos => {
    const fragment = document.createDocumentFragment()
    catalogoFotos.forEach (producto =>{
           templateCard.content.querySelector('h5').textContent = producto.title
           templateCard.content.querySelector('p').textContent = producto.precio
           templateCard.content.querySelector('img').src = `/images/${producto.imagen}`
           templateCard.content.querySelector('.btn-dark').id = producto.id             
           const clone = document.importNode(templateCard.content,true)
        fragment.appendChild(clone)
    })
    cards.appendChild(fragment)

    let btnAddToCart = document.querySelector(".card .btn")
        btnAddToCart.addEventListener("click", (e) => addCarrito(e))
}

const addCarrito = e => {
    
    if (e.target.classList.contains("btn-dark")){
       
         setCarrito(e.target.parentElement)
    }
    e.stopPropagation()
}

const setCarrito = objeto => {
    // console.log(objeto)
    const producto = {
        id: objeto.querySelector(".btn-dark").getAttribute("id"),
        nombre: objeto.querySelector("h5").textContent,
        precio: objeto.querySelector("p").textContent,
        cantidad: 1,
    }
    console.log('Carrito 1', carrito);
    var carritoNuevo = [];

    carrito.forEach((item) => {
        if(item.id == producto.id){
            item.cantidad = item.cantidad + 1;            
        }

        carritoNuevo.push(item); 
    });
    
    var item = carritoNuevo.find(item => item.id == producto.id);

    if(typeof item === 'undefined') {
        carritoNuevo.push(producto)
    }

    carrito = carritoNuevo;
    
    //localStorage.setItem("carrito", JSON.stringify(carrito))
    console.log('Carrito 2', carrito);
    pintarCarrito()
}

const pintarCarrito = () => {
    const fragment = document.createDocumentFragment()
    items.innerHTML = ""
    console.log('pintarCarrito', carrito);
    carrito.forEach(producto =>{
        console.log('pintarCarrito', producto);
        if(producto !== null){
        templateCarrito.content.querySelector("th").textContent = producto.id
        templateCarrito.content.querySelector("td").textContent = producto.nombre
        templateCarrito.content.querySelector("#carrito-cantidad").textContent = producto.cantidad
        templateCarrito.content.querySelector(".btn-info").dataset.id = producto.id
        templateCarrito.content.querySelector(".btn-danger").dataset.id = producto.id
        templateCarrito.content.querySelector("span").textContent = producto.cantidad * producto.precio
        
        const clone = document.importNode(templateCarrito.content,true)
        fragment.appendChild(clone)
        }
        items.appendChild(fragment)
    })  
    pintarFooter()
}
const pintarFooter = () => {
    const fragment = document.createDocumentFragment()
    footer.innerHTML = ""
    if(Object.keys(carrito).length === 0){
        footer.innerHTML = '<th scope="row" colspan="5">Carrito vacío </th>'
        return
    }

    const nCantidad = Object.values(carrito).reduce((acc,{cantidad}) => acc + cantidad,0)
    const nPrecio = Object.values(carrito).reduce((acc,{cantidad, precio}) => acc + cantidad * precio, 0)

    templateFooter.content.querySelectorAll("td")[0].textContent = nCantidad
    templateFooter.content.querySelector("span").textContent = nPrecio

   const clone = templateFooter.cloneNode(true)
   fragment.appendChild(clone)  
   footer.appendChild(fragment)

   const vaciarCarrito = document.getElementById("vaciarCarrito")
   
    vaciarCarrito.addEventListener("click", () => {        
    carrito = []
    pintarCarrito()
   })}

   const compraCarrito = document.getElementById("comprarCarrito")
   compraCarrito.addEventListener("click", () => {
   swal.fire({
    title: '<strong> Gracias por tu compra</strong>',
    icon: 'success',
    html:
      'Te dejamos <b>Whatsapp</b> ' +
      '<a href="https://wa.me/5493513296894">aca!</a> ',      
    showCloseButton: true,
    showCancelButton: true,
    focusConfirm: false,
    confirmButtonText:
      '<i class="fa fa-thumbs-up">Si, quiero vaciarlo</i> ',
    confirmButtonAriaLabel: 'Si, gracias!',
    cancelButtonText:
      '<i class="fa fa-thumbs-down">assa</i>',
    cancelButtonAriaLabel: 'Thumbs down'
  })
})
// const btnAumentar = e => {
//     console.log(e.target)
//     if(e.target.classList.contains("btn-info")){
//        console.log(carrito[e.target.dataset.id])        
//         const producto = carrito[e.target.dataset.id]
//         producto.cantidad++
//         carrito[e.target.dataset.id] = {...producto}
//         pintarCarrito()
//     }
//     if(e.target.classList.contains("btn-danger")){
//         const producto = carrito[e.target.dataset.id]
//         producto.cantidad--
//         if(producto.cantidad === 0){
//             delete carrito[e.target.dataset.id]
//         }
//         pintarCarrito()
// }
// e.stopPropagation()
// }