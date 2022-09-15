


 //---------------------------------------------------------------------
 class Slider {
    constructor( {elementos, funcion, speed} ) {
        this.elementos= elementos;
        this.funcion  = funcion;
        this.speed = speed;  // duracion visible en ms
        this.index=-1;
        this.size=elementos.length;
        this.next=this.next.bind(this);
        this.stop=this.stop.bind(this);
        this.prev=this.prev.bind(this);
        this.interval=null;
    }
    next() {
        this.index++;
        if ( this.index >= this.size) this.index=0;
        this.funcion(this.elementos[this.index]);
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

}

export  default Slider;



