
// Clase para gestionar movimiento/reordenar elementos de una lista usando Drag and Drop
//      Gestiona los eventos:  dargstart,   drag  y  dragend  de los items de lista con atributo draggable = "true"
// listasel = selector del contenedor-lista,  itemsel = selector todos los elementos de lista
// se apoya en la otra clase Movimiento para mover los elementos
// El movimiento real del item se hace en gestionarDragEnd() con el metodo this.lista.insertBefore() realmente se mueve el elemento que 
// se inserta (lo quita de su posicion y lo inserta en la nueva)
class DragList {
    constructor ( listasel, itemsel ="li"){
        this.lista = document.querySelector(listasel);     // contenedor de items (elementos dragables)   
        this.items = document.querySelectorAll(listasel +">"+itemsel); //array con los elementos dragables
        this.sombravacia = document.createElement("canvas"); //canvas vacio para eliminar sombra al arrastrar
        this.elementoFake = null;  // elemento vacio que se inserta en el hueco destino al mover
        this.dondeInsertar = 0;    // ultima posicion del elemento drageado: 1=encima destino 2=debajo destino 0=ningun destino
        this.itemDondeInsertar = null; // item referencia donde hay que colocar el elemento drageado si dondeInsertar es 1 o 2

        this.gestionarDragStart=this.gestionarDragStart.bind(this);
        this.gestionarDrag     =this.gestionarDrag.bind(this);
        this.gestionarDragEnd  =this.gestionarDragEnd.bind(this);
        

        this.bindEvents();
        this.buildElementoFakeDestinoMovimiento();
    }
    bindEvents(){
        this.items.forEach( (item)=>{
            item.addEventListener('dragstart',this.gestionarDragStart); 
            item.addEventListener('drag',this.gestionarDrag);
            item.addEventListener('dragend',this.gestionarDragEnd);
        })
    }


    gestionarDragStart( ev ) {
        console.log("ARRASTRANDO", ev.currentTarget);
        ev.currentTarget.classList.add('dragging');
        ev.dataTransfer.setDragImage(this.sombravacia,0,0); // sustituye la sombra del elemento al arrastrarlo

    }
    gestionarDrag( ev ) {
        //console.log("Drag en", ev.currentTarget);

        // si el cursor se sale fuera del contenedor this.lista hay que eliminar el elementoFake que se ha colocado
        if (Movimiento.estaEncima ( this.lista, {x:ev.clientX, y:ev.clientY})) {
            //console.log("DENTRO", ev.clientX, ev.clientY );
        } else {
            //console.log("FUERA DE LISTA...!!!!!", ev.clientX, ev.clientY );
            this.elementoFake.remove();
        }

        //cambiar el item sobre el que se esta posicionando aplicando Movimiento.estaEncima() 
        //y abrir hueco colocando elementoFake en la posicion del cursor, encima o debajo del elmento donde esta curror
        this.items.forEach ((item)=>{
            //this.dondeInsertar = 0;
            //this.itemDondeInsertar = null;
            if (item != ev.currentTarget) {
                var donde = Movimiento.estaEncima( item, {x:ev.clientX, y:ev.clientY} );
                if ( donde == 1 ) { // Insertar elementoFake encima del elemento donde esté el cursor 
                    this.lista.insertBefore ( this.elementoFake, item.nextSibling );
                    this.dondeInsertar = 1;
                    this.itemDondeInsertar = item;
                    //console.log("ESTA DENTRO DE", item,  " arriba de", item.nextElementSibling);
                } else
                if ( donde == 2 ) { // Insertar elementoFake debajo del elemento donde está el cursos
                    this.lista.insertBefore ( this.elementoFake, item );
                    this.dondeInsertar = 2;
                    this.itemDondeInsertar = item;
                    //console.log("ESTA DENTRO DE por abajo de", item);
                } else
                if ( donde == 0) {
                    item.classList.remove("destinodrag");
                    //console.log("ARRASTRANDO",ev.currentTarget, " posicion 0 en", item);
                }   
            }

        })

        Movimiento.mueve(ev.currentTarget, {x:ev.clientX, y:ev.clientY});
    }


    gestionarDragEnd( ev ) {
        console.log("INSERTANDO ", ev.currentTarget, " pos ", this.dondeInsertar, "DE", this.itemDondeInsertar);
        ev.currentTarget.classList.remove('dragging');
        ev.currentTarget.style.top=""; //resetear top y left despues de mover o no se podra volver a mover
        ev.currentTarget.style.left="";
        // Insertar el elemento drageado en su nueva posicion si procede
        if (this.dondeInsertar == 1) {
            this.lista.insertBefore ( ev.currentTarget, this.itemDondeInsertar.nextSibling);
        }
        if (this.dondeInsertar == 2) {
            this.lista.insertBefore ( ev.currentTarget, this.itemDondeInsertar);
        }
    }
    // elemento fake para efecto hueco vacio destino del elemento que se está moviendo
    buildElementoFakeDestinoMovimiento( ){
        this.elementoFake = document.createElement("li");
        this.elementoFake.classList.add("card");
        this.elementoFake.style.backgroundColor="#666";
     }
}//class

// Clase para gestionar el movimiento del Elemento
// Mueve por CSS: usando style.top y left y aplicando position:fixed temporalmente al elemento justo antes de mover para que funcione
class Movimiento {
    // mueve/recoloca el item elemento a las coordenadas x,y indicadas 
    static mueve ( elemento, coordenadas) {
        // modifica el destino x,y segun tamaño de elemento para que mueva desde el centro del elemento en lugar de la esquina
        elemento.style.top = (coordenadas.y - (elemento.clientHeight/2)    )+ "px"; 
        elemento.style.left =(coordenadas.x - (elemento.clientWidth/2)     )+ "px";
        //console.log("moviendo a:",coordenadas.x + "px", coordenadas.y  + "px");
    }
    // Devuelve 1 ó 2 si coordenadas están dentro del elemento y le cambia el color de fondo a dicho elemento
    // 1= mitad arriba, 2= mitad abajo  0=no está encima
    // (esta funcion debe llamarse durante el evento drag)
    static estaEncima ( elemento, coordenadas ) {
        let elcoors = elemento.getBoundingClientRect();
        if (coordenadas.x > elcoors.left && coordenadas.x < (elcoors.left + elcoors.width) )  
            if (coordenadas.y > elcoors.top && coordenadas.y < (elcoors.top + elcoors.height) ) {

                if (coordenadas.y > elcoors.top && coordenadas.y < (elcoors.top + elcoors.height/2) )
                     return 1;
                else 
                     return 2; 
            }    
        return 0;
    }
}


window.onload = function() {
    let a=new DragList("ul","li");
}

