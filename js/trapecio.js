
//let caminosValidos;
//let caminos=[];

let listaCaminos=[] ;
let cuantosCaminos=1;
//let todosLocCaminos=[];
window.onload=function() {
    //console.log("camino desde x=2 y=3", caminoDesde(2,3));
    //console.log("Caminos",caminos);
   //console.log("Es borde 1,1", celdaEsBorde(1,1));
   let camino=[];
   let punto={x:1,y:1};

   //camino.push(punto);

   //asociar acciones a los botonos. BOTON CALCULAR
   document.getElementById("botonstart").addEventListener('click', function(){
        document.getElementById("mensaje").innerHTML="Calculando...";

        setTimeout(calcularTodosLosCaminos);
        
    })

    document.getElementById("botonreset").addEventListener('click', function(){
        console.log('reset');
        resetDatos ( );
    })

    

    celdas=document.querySelectorAll("div[x]");
    celdas.forEach ( (celda)=>{
        celda.innerHTML+="<span class='coordenadas'>("+celda.getAttribute('x')+","+celda.getAttribute('y')+")</span>";
    })
    // Leer el valor que haya en "Cuantos Caminos?" cada vez que se cambie
    document.getElementById("cuantos").addEventListener("change",function( ev ){
        cuantosCaminos = ev.target.value;
        console.log("cuantos caminos:",cuantosCaminos)
    })



    cargarDatos();

}//onload



function getValorCelda(x,y) {
    var valor = parseFloat ( document.querySelector("div [x='"+x+"'][y='"+y+"']").innerHTML );
    return valor;
}

function setValorCelda(x,y, valor) {
    var oldvalor =  document.querySelector("div [x='"+x+"'][y='"+y+"']").innerHTML;
    var posmenor = oldvalor.indexOf('<');
    oldvalor=oldvalor.substring(posmenor);
    document.querySelector("div [x='"+x+"'][y='"+y+"']").innerHTML = valor + oldvalor;
    return valor;
}



function celdaEsBorde(x, y) {
    if ( (x == 1) || (x==9) ) return true;
    if ( x==y  ) return true;
    if ( y==13 ) return true;
    return false;
}
function existeCelda ( x, y) {
    if ( (x < 1) || (x>9) ) return false;
    if ( x > y) return false;
    if ( (y < 1) || (y >13) ) return false;
    return true;
}
function caminoPasaPorPunto( camino,x, y) {
    var resultado=false;
    camino.forEach( function (punto) {
            if ((punto.x == x) && (punto.y == y)) { resultado = true; }
        })
    return resultado;
}
//--------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------
let valores=[];
let bordes;

function cargarDatos () {
    valores = [];

    celdas = document.querySelectorAll (".celda");
    celdas.forEach ( (celda)=>{
        x=celda.getAttribute('x');
        y=celda.getAttribute('y');
        valor=getValorCelda(x,y);
        valores.push({x:x,y:y,valor:valor});
    });
}

function resetDatos() {
    document.getElementById("mensaje").innerHTML="";
    celdas = document.querySelectorAll (".celda");
    celdas.forEach ( (celda)=>{
        x=celda.getAttribute('x');
        y=celda.getAttribute('y');
        valor=0;
        if ( x == 9 || x==y) valor=0;
        if ( x == 1) valor=2; 

        if ( y == 12) valor = 1;
        setValorCelda(x,y,valor);
        
    });
}

function calcularTodosLosCaminos (){
    //calcularCaminosDesde( {x:2,y:3}); return;
    var inicio = Date.now();
    //todosLocCaminos=[];
    celdas = document.querySelectorAll (".celda");
    celdas.forEach ( (celda)=>{
        //celda.classList.add('calculando');   
        //celda.style.background='pink';
        x=parseInt (celda.getAttribute('x'));
        y=parseInt (celda.getAttribute('y'));

        if ( !celdaEsBorde(x,y))  {
            //celda.classList.add('calculando');   
            console.log("CALCULANDO", x,y);
            calcularCaminosDesde({x:x, y:y} ) ;
        }    
        else console.log("Borde", x,y);
        //celda.classList.remove('calculando');  
    } ) 
    document.getElementById("mensaje").innerHTML  ="Calculo OK.  Tiempo:";
    document.getElementById("mensaje").innerHTML +=" "+  ( (Date.now() - inicio )/1000) +"seg.";
}


function calcularCaminosDesde( origen ) {
    //let puntosVisitados=[];
    listaCaminos=[];
    //contador=0;
    contadorcaminos=0;

     //inicializa matriz con toos los caminos desde origen(x,y) hasta este borde(x,y)
    //caminos[ origen ]=[];  // caminos es la matriz [ puntos-origen] por cada punto: lista[caminos] y puntosVisitados[puntos] 
    //caminos[ origen ].puntosVisitados=[];  //puntos visitados por todos los caminos desde el punto origen. para control de bucle.
    //caminos[ origen ].lista=[];            //lista de caminos encontrados desde origen hasta algun borde. Camino=tabla de puntos.   

    //  BUCLE 1:  Repetir Crear Caminos desde origen(x,y) hasta algun borde. Repetir hasta que entre todos los caminos hayan pasado
    //  al menos una vez por todos los puntos de la matriz
     //let totalCaminos=0;
     let puntoActualCamino = origen;
     suma2=0;
     do {
        //Crear matriz vacía: marcar todos los PUNTOS VISITADOS como false (en los caminos desde origen hacia el borde actual)
        //let puntosVisitados=[];
        //x=0; y=0;


    
        //Crear un nuevo camino vacio origen en origen.x, origen.y
        let camino=[{x:origen.x, y:origen.y}];
        let bordeAlcanzado =false;
    

        //console.log("Iniciando Camino en", puntoActualCamino.x, puntoActualCamino.y);
         // REPETIR añadir puntos al camino hasta camino terminado
                
         do {

            // Rellenar el camino:        
            
                    
                    //Calcular celda contigua random. Repetir el calculo si el nuevo punto ya existe
                    // en el camino actual, para evitar caminos que pasan muchas veces por los mismos puntos
                    //var intentos=0;
                    do {
                        var dir = Math.round(Math.random()*3);
                        switch(dir) {
                            case 0: var contigua={x:parseInt(puntoActualCamino.x)  ,y:parseInt(puntoActualCamino.y)-1}; break;
                            case 1: var contigua={x:parseInt(puntoActualCamino.x)-1,y:parseInt(puntoActualCamino.y)}; break;
                            case 2: var contigua={x:parseInt(puntoActualCamino.x)+1,y:parseInt(puntoActualCamino.y)}; break;
                            case 3: var contigua={x:parseInt(puntoActualCamino.x)  ,y:parseInt(puntoActualCamino.y)+1}; break;
                            //case 6: var contigua={x:parseInt(puntoActualCamino.x)+1,y:parseInt(puntoActualCamino.y)-1}; break;
                            //case 5: var contigua={x:parseInt(puntoActualCamino.x)-1,y:parseInt(puntoActualCamino.y)-1}; break;
                            //case 7: var contigua={x:parseInt(puntoActualCamino.x)-1,y:parseInt(puntoActualCamino.y)+1}; break;
                            //case 8: var contigua={x:parseInt(puntoActualCamino.x)+1,y:parseInt(puntoActualCamino.y)+1}; break;
                        }
                        
                        //intentos++;
                        //console.log("Contigua a",puntoActualCamino.x,puntoActualCamino.y,"-->",contigua.x,contigua.y,"-", intentos);
                    } while ( !existeCelda(contigua.x,contigua.y ) );
                    //console.log("PuntoActual:",puntoActualCamino.x,puntoActualCamino.y," Intentando punto", contigua.x, contigua.y);
                    //if ( origen.x==2 && origen.y==11) console.log("Intentando", contigua.x,contigua.y);
                    
                    puntoActualCamino=contigua;
                    //puntosVisitados.push(contigua);
                    //console.log("Celda Contigua", contigua);
                                                        
                    //Casos posibles de la celda contigua:
                        //  caso 1: es una celda borde- Se ha completado un camino
                        //calculados++;
                        if ( celdaEsBorde ( contigua.x, contigua.y)) {
                            //añadir nuevo punto al camino ( camino desde origen a borde )  
                            //if (!puntoEncontradoEn(contigua.x, contigua.y, camino)) {
                            //    guardados++;
                                //camino.push( contigua );
                                //if ( origen.x==2 && origen.y==11) console.log("Guardado", contigua.x,contigua.y);
                            //}
                            //else console.log("punto ya existe en camino", contigua.x,contigua.y);                            
                            //marcar este camino como terminado
                            //camino.Fin=true; // camino valido y completo
                            bordeAlcanzado=true;  // finalizar busqueda puntos bucle para este camino 
                            // añadir camino a la matriz de caminos[este origen][este borde]
                            var  v = buscaValor(valores,contigua.x, contigua.y);
                            suma2 += v;
                            //console.log("fin camino en", contigua.x, contigua.y,"valor",v);
                            // marcar todos los puntos del camino como visitados para esta pareja origen - borde en la matriz PUNTOS VISITADOS
                            //camino.forEach( (punto)=>{
                            //    if ( !puntoEncontradoEn( punto.x, punto.y, puntosVisitados)  )
                            //        puntosVisitados.push( {x:punto.x, y:punto.y} );
                            //})

                            
                            //console.log("COMPARANDO CAMINOS", camino,  caminos[origen].lista);
                           // if ( ! caminoRepetido (camino, listaCaminos ) ) {
                                //console.log("No existe");
                                //caminos[origen].lista.push(camino);
                                
                                //listaCaminos.push( {x:origen.x, y:origen.y,puntoscamino:camino});
                                contadorcaminos++;
                                //todosLocCaminos.push(camino);
                            //}
                      
 
                        } 
                        //  caso 2: es una celda interior
                        else  {
                            //if ( existeCelda( contigua.x, contigua.y ) ) {
                                //añadir nuevo punyo a este camino . El camino sigue como no terminado
                                //if (!puntoEncontradoEn(contigua.x, contigua.y, camino)) {
                                //     if ( origen.x==2 && origen.y==11) console.log("Guardado", contigua.x,contigua.y);
                                    //camino.push( contigua );
                                //} 
                                //else console.log("punto ya existe en camino", contigua.x,contigua.y); 
                            //} else {
                                //  caso 3: celda no valida, fuera de la matriz 
                                // no guardar camino, y darlo por terminado
                                //caminos[origen].push(camino);
                                        //bordeAlcanzado=true;
                                //console.log("Borde fallido en", contigua.x, contigua.y);
                               // if ( origen.x==2 && origen.y==11) console.log("Descartado", contigua.x,contigua.y);
                            //}
                        }   


        } while ( ! bordeAlcanzado);
        //contador++;
        //console.log("Puntos Visitados:", puntosVisitados.length, "para ", origen.x, origen.y);

    } while ( contadorcaminos < cuantosCaminos ) ; // se visiten todos los puntos del trapecio
  

    // CALCULAR LA MEDIA de los extremos de todos los caminos con origen en el Punto Actual (origen.x, origen.y)
    //suma=0; 
    //listaCaminos.forEach ( (camino)=>{
    //    var extremo=camino.puntoscamino[ camino.puntoscamino.length -1];
    //    suma += buscaValor ( valores, extremo.x, extremo.y);
    //})
    //media=suma/cuantosCaminos;
    media2=suma2/cuantosCaminos;
    //console.log("Caminos encontrados", listaCaminos.length, "suma", suma, "media", media,"media 2",media2);
    //setValorCelda( origen.x, origen.y, Math.round(media*100000)/100000 );
    setValorCelda( origen.x, origen.y, media2 );


    //Efectos en pantalla
    //document.querySelector("div [x='"+origen.x+"'][y='"+origen.y+"']").classList.remove('calculando'); 
    //document.querySelector("div [x='"+origen.x+"'][y='"+origen.y+"']").style.background='inherit';   


} //function calcularCaminosDesde  

function puntoEncontradoEn( x,y, contenedor) {
    var esta=false;
    contenedor.forEach ( (punto)=>{
        if ( (punto.x ==x) && (punto.y == y) )  esta= true;
    } )
    return esta;
}


function caminoRepetido ( camino, lista ) {
    let existe=false;
    for (var a=0; a < lista.length; a++) {
        caminoguardado = lista[a].puntoscamino;
        if (caminoguardado.length == camino.length) {
            existe = true;
            for (var p=0; p< camino.length; p++){
                if ( camino[p].x != caminoguardado[p].x  || camino[p].y != caminoguardado[p].y ) existe=false;
            }
            if ( existe ) return true;
        }
    }
    return existe;
}
function buscaValor ( celdas,x,y ) {
    if ( celdas.length <= 0) console.log("******Error en buscavalor",celdas,x,y);
    var valor=0;
    for (var i=0; i< celdas.length; i++) {
        if ( (celdas[i].x ==x) && (celdas[i].y == y) ) {
            valor=celdas[i].valor; break;
        }

    }
    return valor;
}