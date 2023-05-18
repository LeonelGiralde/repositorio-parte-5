const fechaActual = dataAmazing.fechaActual
const eventos = dataAmazing.eventos
const eventosPasados = []
const eventosFuturos = []
var arrayBusqueda = []
var inputsearch = document.getElementById("buscador")
var search=""
var checkedCheckboxes= []
var ulNombreEventos= document.getElementById("eventos")

for(var i = 0; i< eventos.length; i++){
    if(eventos[i].date > fechaActual)
    eventosFuturos.push(eventos[i])
    else{
        eventosPasados.push(eventos[i])
    }
}

var botones = document.getElementsByClassName("navlink");
var buttonNavegacion = []
let formulario = document.getElementById("miFormulario")

for(var i=0 ; i< botones.length; i++){
    const elemento = botones[i];
    buttonNavegacion.push(botones[i].innerText)
    elemento.addEventListener("click", function(e){
        imprimir(e.target.id);
    })
}

function displayEvents(array){
    var html=""
    for(let i=0 ; i < array.length; i++){
        html+=`
<ul>
<div class="cont_card">
<li>
    <img src="./Images/${array[i].image}">
    <H2>${array[i].name}</H2>
    <p class="descripcion">${array[i].description}</p>
    <p class="precio">$${array[i].price}</p>
    <a href="/pages/detalle.html?id=${array[i].id}"> <button>Ver mas</button> </a>
        </li>
        </div>
        </ul>
`
    }
    ulNombreEventos.innerHTML= html;
    
}

// buscador
inputsearch.addEventListener("keyup", function(e){
    search=e.target.value.trim().toLowerCase()
    filtrosCombinados()
})

function imprimir(id){
    var titulo = document.getElementById("titulo")

    switch (id) {

        case "proximos_eventos": 
        displayEvents(eventosFuturos)
        eventsCategories(eventosFuturos)
        titulo.innerHTML="Proximos Eventos"
        arrayBusqueda= eventosFuturos
        formulario.style.display="none"
        break;

        case "eventos_pasados": 
        displayEvents(eventosPasados)
        eventsCategories(eventosPasados)
        titulo.innerHTML="Eventos pasados"
        arrayBusqueda= eventosPasados
        formulario.style.display="none"
        break;

        case "contacto":
            formulario.innerHTML= `
            <div class="datos" id="form">
       
        <div class="contact"> <p>Nombre</p> <br> <input type="text" name="name" placeholder="Nombre y apellido" autofocus=""></div>
        
        <div class="contact"><p>Email</p> <br> <input type="text" name="name" placeholder="Email" autofocus=""></div>
        
        <div class="contact"><p>Mensaje</p> <br><input type="text" name="name" placeholder="Mensaje" autofocus=""></div>
        </div>
            `
            ulNombreEventos.innerHTML=""
            
            break;

        case "estadistica":
        formulario.style.display="none"

        default: 
        displayEvents(eventos)
        eventsCategories(eventos)
        titulo.innerHTML="Eventos"
        arrayBusqueda= eventos
        formulario.style.display="none"
    }
}
 
imprimir()



//funcionamiento flecha derecha 
var buttonDer = document.getElementById("butDer")

buttonDer.addEventListener("click", function(e){
    var page = document.getElementById("titulo").innerText
    if(buttonNavegacion.indexOf(page)< 4){
        nextPage(buttonNavegacion.indexOf(page)+1 )
    }else{
        nextPage(0)
    }
    console.log(buttonNavegacion.indexOf(page))
})

//funcionamiento flecha izquierda 

var buttonIzq = document.getElementById("butIzq")

buttonDer.addEventListener("click", function(e){
    var page = document.getElementById("titulo").innerText
    if(buttonNavegacion.indexOf(page)>= 4){
        antPage(buttonNavegacion.indexOf(page)-1 )
    }else{
        antPage(0)
    }
    console.log(buttonNavegacion.indexOf(page))
})

function antPage(i) {

    switch (i) {
    
    case 0:
    
    imprimir("inicio")
    
    document.getElementById("titulo").innerHTML = buttonNavegacion[i]
    
    break;
    
    case 1:
    
    imprimir("proximos_eventos")
    
    document.getElementById("titulo").innerHTML = buttonNavegacion[i]
    
    break;
    
    case 2:
    
    imprimir("proximos_eventos")
    
    document.getElementById("titulo").innerHTML = buttonNavegacion[i]
    
    break;
    
    case 3:
    
    imprimir("contacto")
    
    document.getElementById("titulo").innerHTML = buttonNavegacion[i]
    
    break;
    
    default:
    
    imprimir("estadistica")
    
    }
    
    }

function nextPage(i) {

    switch (i) {
    
    case 0:
    
    imprimir("inicio")
    
    document.getElementById("titulo").innerHTML = buttonNavegacion[i]
    
    break;
    
    case 1:
    
    imprimir("proximos_eventos")
    
    document.getElementById("titulo").innerHTML = buttonNavegacion[i]
    
    break;
    
    case 2:
    
    imprimir("proximos_eventos")
    
    document.getElementById("titulo").innerHTML = buttonNavegacion[i]
    
    break;
    
    case 3:
    
    imprimir("contacto")
    
    document.getElementById("titulo").innerHTML = buttonNavegacion[i]
    
    break;
    
    default:
    
    imprimir("estadistica")

    document.getElementById("titulo").innerHTML = buttonNavegacion[i]
    
    }
    
    }
//filtro check box// 
function eventsCategories(array){
let categories = array.map(evento=> evento.category)
console.log(categories)

let unica = new Set(categories) 
console.log(unica)
let lastcategories = [...unica]

console.log(lastcategories)

let categoriasEvento= ""
lastcategories.map(category=>
    categoriasEvento+=
`
<label><input type="checkbox" value ="${category}" >${category}</label>
`
    
    )
     
    document.getElementById("checkcategories").innerHTML= categoriasEvento
    checkboxListener()
}

function checkboxListener(){
    var checkboxs = document.querySelectorAll('input[type=checkbox]')
    for(i=0 ; i < checkboxs.length; i ++){
        checkboxs[i].addEventListener("change", function(){
            checkedCheckboxes= []
            for (i = 0; i < checkboxs.length; i++){
                if(checkboxs[i].checked){
                    checkedCheckboxes.push(checkboxs[i].value)
                }
            }
            console.log(checkedCheckboxes)
            filtrosCombinados()
        })
    }
}

function filtrosCombinados(){
    var filtrado = []; 
    if (search !=="" && checkedCheckboxes.length > 0){
        checkedCheckboxes.map(category => filtrado.push(...arrayBusqueda.filter(evento=>
            evento.name.toLowerCase().includes(search) && evento.category === category)
            ))
    }
    else if (search !== "" && checkedCheckboxes.length == 0){
        filtrado= arrayBusqueda.filter(evento => evento.name.toLowerCase().includes(search))

    }

    else if(search === "" && checkedCheckboxes.length > 0){
        checkedCheckboxes.map(category =>
            filtrado.push(...arrayBusqueda.filter(evento=>
                evento.category=== category))
                )
                console.log(filtrado)
    }

    else{
        filtrado = arrayBusqueda
    }

    filtrado.length > 0 ?
        displayEvents(filtrado) :
        ulNombreEventos.innerHTML = `<h1 class="ceroResult" >No se encontraron eventos para tu búsqueda </h1>`
}

