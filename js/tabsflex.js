class TabsManejador { 
    constructor (selectorcontroles ) {
        this.controles = document.querySelectorAll(selectorcontroles);
        //console.log(selectorcontroles,this.controles);
        this.manejarClick = this.manejarClick.bind(this);
        this.bindEventos();

    }


    bindEventos( ) {
        //console.log("añadiendo eventos para", this.controles);
        this.controles.forEach ( tablink=>{
            tablink.addEventListener('click', (ev)=>{ this.manejarClick(ev); } )
        } ) 
    }

    manejarClick (ev) {
        console.log('click en tab:', ev.target);
        document.querySelector('a.seleccionado').classList.remove('seleccionado');
        ev.target.classList.add('seleccionado');

    }

}
window.onload=function(){
    new TabsManejador ( '#tabscontrol > a');
}
