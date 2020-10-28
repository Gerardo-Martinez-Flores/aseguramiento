function lee_json1() {

            $.getJSON("files/animales.json", datos=> {  /* se obtiene el archovo donde se encuentra el array con los datos que se van a poner en la web */
                animales1=datos.animales;               /* la variable datos recibe el arreglo de animales */
                console.log(animales1);                 /* imprime el arreglo  */
                datos.animales.forEach(animal=>{i++;agregarAnimal(animal)}); /* itera sobre el array de animales por cada llama a la funcion agregar animal */
            }).fail(() => console.log( "error" ) );     /* Si la funcion falla se manda un mensaje de error*/
}



function agregarAnimal(animal){                         
    
    var lista=document.getElementById("lista");         /* se obtiene del archivo html el bloque cin id=lista */
    let item=document.createElement("li");              /* dentro del bloque lista se crea un elemento li en cada iteracion del forEach */

    item.innerHTML=itemTemplate(animal)                 /* se pasa el animal a la funcion item template que genera la plantilla para los datos del animal*/
    lista.appendChild(item);                            /* se genera un item que se le envia al bloque lista para su imprecion en pantalla*/

}

function generaPlantilla(strings,...keys){              

 return function(data){

        let temp = strings.slice(); //hace una copia de strings en temp

        keys.forEach( ( key, i ) => {
            if(key==='img')
              temp[ i ] = temp[ i ] + "images/"+data[ key ];
            else
            temp[ i ] = temp[ i ] + data[ key ];
        } );

        return temp.join( '' );
    }    
 
}

var itemTemplate=generaPlantilla`<div class="cajaItem"><img  alt="${ 'nombre' }" src="${ 'img' }">
                                 <h3>${'nombre'}</h3> 
                                 <p> Riesgo: ${'riesgo'} <br>
                                 ${'info'}
                                 </p></div>`
;



var imageObj=[], imagenC=[];
var i=0;
var animales1;
                                 
function agregar(){
                                  
    nombreA=document.getElementById('nombreA').value;
    riesgoA=document.getElementById('riesgo').value;
    datos=document.getElementById('datos').value
    urlImage=document.getElementById('imagefile').value
                                 
    nombreImagen=urlImage.split("\\")[2];
                                 
    nuevoA=JSON.parse( `{"nombre":"${nombreA}","riesgo":"${riesgoA}","info":"${datos}","img":"${nombreImagen}"} `);
    animales1.push(nuevoA);
    agregarAnimal(nuevoA);
                                 
    $.ajax({
        url : "actualizaLista.php",
        data : "datos="+ JSON.stringify(nuevoA) , 
        method : "post", //en este caso
        dataType : "json",
        processData:false
    }).done(function(res){
    console.log( res );
                                                     
    });
                                 
}

function subeImagen(){
      
            var formData = new FormData();
            formData.append("imagen", document.getElementById("imagefile").files[0]);
            
            $.ajax({
                url: "subeArchivo.php",
                type: "post",
                data: formData,
                cache: false,
                contentType: false,
                processData: false
            })
                .done((res)=>{
                    console.log("Respuesta: " + res);
                    agregar();
                });
        
    }
