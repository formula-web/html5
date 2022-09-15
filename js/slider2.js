class Slider2 {
    constructor( {selector} ) {
        this.slider = document.querySelector(selector);
        this.interval=null;             // controlador de setInterval()
        this.index=0;                   // diapositiva actualmente visible
        this.size=document.querySelectorAll(selector+" > .container >img").length; //numero de diapositivas = nº img
        this.speed=3000;

        // binds para poder utilizar this en cualquier contexto
        this.next=this.next.bind(this); 
        this.play=this.play.bind(this);
        this.stop=this.stop.bind(this);
        this.moveTo=this.moveTo.bind(this);
        this.prev=this.prev.bind(this);
        this.clickTo=this.clickTo.bind(this);
        

        this.dibujarControles(  );
        this.activarEventosControles();
        this.play();
    }

    //-- moveTo(indice)  Visualizar la diapositiva nº posicion = indice --------------
    //-- y actualiza los controles (puntos) aplicando la clase "activo" sólo al que corresponde a posicion=indice
    moveTo( indice ) {
        //console.log("entra en moveTo(",indice,")");
        this.index=indice;
        let left = indice * 100;  //margen izda = nº diapositiva * 100%
        this.slider.querySelector(".container").style.left="-"+ left + "%";
        
        //punto activo controles slider:
        var indicemas1 = indice + 1;
        //console.log("Move To", indice,"#controles li:nth-child(" + indicemas1 + ")"  );
        this.slider.querySelector("#controles li:nth-child(" + indicemas1 + ")" ).classList.add("puntoactivo");
        for (var i=0; i<this.size; i++){
            if (i==indice)
                this.slider.querySelector("#controles li:nth-child(" + (indice+1) + ")" ).classList.add("puntoactivo");
            else
                this.slider.querySelector("#controles li:nth-child(" + (i+1) + ")" ).classList.remove("puntoactivo");
        }
 
    }
    // clickTo (indice):   destino del evento click en el control numero=indice. Debera hacer un moveTo(indice). El 
    // numero indice del control está en el atributo value del li <li value='3'> y se obtiene del evento: ev.target atributo value
    clickTo( ev ) {
        var indice = parseInt ( ev.target.getAttribute('value') );
        //console.log("Click en ", indice);
        this.moveTo( indice );
    }

    //-- Añadir evento click a los controles de puntos y flechas del Slider
    activarEventosControles(){
        //console.log("Activar eventos Controles de this.slider", this.slider);
        for (var i=0; i<this.size; i++){
            var imas1 = i+1;
            var el=this.slider.querySelector("#controles li:nth-child(" + imas1 + ")" );
            el.addEventListener('click',(ev)=>{this.clickTo(ev)} );
            //console.log("Añadido evento Click de moveTo(",i,")"," al elemento:", el);
        }
 

    }


    next() {
        this.index++;
        if ( this.index >= this.size) this.index=0;
        this.moveTo(this.index);
    }
    prev() {
        this.index--;
        if ( this.index < 0 ) this.index=this.size-1;
        this.funcion(this.elementos[this.index]);
    }
    play() {
        this.interval=setInterval( this.next, this.speed); //ejecuta next cada speed ms
    }
    stop() {
        clearInterval(this.interval);
    }
    dibujarControles(  ){  // Los puntos sobre las diapositivas, usando lista <ul> sin viñetas
        let ul = document.createElement("ul");
        for (var i=0; i<this.size;i++) {
            let il=document.createElement("li");
            il.setAttribute("value",i);
            if (i==0) il.classList.add('puntoactivo');
            ul.appendChild(il);
        }
        document.querySelector("#controles").appendChild(ul);
    }

}
export default Slider2;
