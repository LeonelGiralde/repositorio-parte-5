const eventos = dataAmazing.eventos;

console.log(location.search)
var id= location.search.split("?id=").filter(Number)

var selectId= id[0]

console.log(selectId)

const eventoDetalle =[]

for(var i = 0; i< eventos.length; i++){
    if(eventos[i].id == selectId){
    eventoDetalle.push(eventos[i])
    
    }
}
 
console.log(eventoDetalle)

var texto= document.getElementById("tarjetas")

texto.innerHTML=`
    <img src="/Images/${eventoDetalle[0].image}" alt="">
    <h1>${eventoDetalle[0].name}</h1>
    <p>${eventoDetalle[0].description}</p>  
    <p>$${eventoDetalle[0].price}</p>
    <p>${eventoDetalle[0].category}</p>
    <p>${eventoDetalle[0].place}</p>    
`