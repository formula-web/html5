
const dias= ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
const meses=['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
class Calendar {
    constructor ( opciones ){
        this.fecha = opciones.fecha || new Date();
        this.contenedor = opciones.contenedor;
        this.onselect = opciones.onselect;
        this.tabla = null;
        this.next = this.next.bind(this);
        this.prev = this.prev.bind(this);
        this.seleccionarDia = this.seleccionarDia.bind(this);

        this.construyeCalendario();
        this.actualizaMes();
        this.bindEventos();
 
    }    

    // Construye en html la tabla generica de celdas, y la cabecera y los botones
    construyeCalendario(){
        let cab = document.createElement('header');
        this.contenedor.appendChild(cab);

        let tabla= document.createElement('table');
        let thead= document.createElement('thead');

        for (var i=0; i<7; i++){
            let td=document.createElement('td');
            td.innerHTML=dias[i];
            thead.appendChild(td);
        }
        tabla.appendChild(thead);
        
        let tbody=document.createElement('tbody');
        for ( var i=0; i<=5; i++){
            let tr=document.createElement('tr');
            for (var d=1; d<=7; d++) {
                let td=document.createElement('td');
                td.innerHTML = i*7 + d;
                tr.appendChild(td);
            }
            tbody.appendChild(tr);
        }
        tabla.appendChild(tbody);

 
        this.contenedor.appendChild(tabla);
        this.tabla=tabla;

        // Botones Anterior - Siguiente
        this.botonPrev = document.createElement('button');
        this.botonPrev.innerHTML = 'Anterior';
   
        this.botonNext = document.createElement('button');
        this.botonNext.innerHTML = 'Siguiente';
        this.contenedor.appendChild(this.botonPrev);
        this.contenedor.appendChild(this.botonNext);
    }

    calculaDias() {
        this.primerDia = new Date(this.fecha.getFullYear(), this.fecha.getMonth(), 1); //timestamp 1er dia mes
        this.ultimoDia = new Date(this.fecha.getFullYear(), this.fecha.getMonth()+1,1);//timestamp ultimo dia mes
        this.diasMes   = Math.floor( (this.ultimoDia - this.primerDia) / (1000*60*60*24) );//cuantos dias tiene el mes
        this.primerDiaSemana = this.primerDia.getDay();
        if ( this.primerDiaSemana == 0) this.primerDiaSemana = 7;
        console.log("Primer dia de la semana", this.primerDiaSemana, "Dias del Mes:", this.diasMes);
    }

    // Recolocar los dias en la tabla según el mes concreto que se visualiza
    actualizaMes() {
        // Cabecera mes-año
        let cab = this.contenedor.querySelector("header");
          cab.innerHTML = meses[ this.fecha.getMonth()] + "&nbsp;&nbsp" + this.fecha.getFullYear();

         // dias
        this.calculaDias();
        let trs = this.tabla.querySelectorAll('tr');
        for ( var i=0; i<=5; i++){
            let tr=trs[i];
            let tds=tr.querySelectorAll('td');
            for (var d=1; d<=7; d++) {
                let td=tds[d-1];
                var diapintado =  (i*7 + d - this.primerDiaSemana+1);
                if (diapintado <1 || diapintado > this.diasMes) { 
                    diapintado=" "; td.style.borderStyle="none" ; 
                    td.removeAttribute('data-dia');
                }
                else { 
                    td.style.borderStyle='solid' 
                    td.dataset.dia = diapintado;
                }
                td.innerHTML = diapintado;
            }
        }
        // Quitar dia seleccionado
        document.querySelectorAll("td").forEach((dia)=>{dia.classList.remove("diaseleccionado")});
    }
    next (){
        if (this.fecha.getMonth() == 11) {
            this.fecha = new Date( this.fecha.getFullYear()+1,0,1);
        }
        else
            this.fecha = new Date(this.fecha.getFullYear(),this.fecha.getMonth()+1,1);
        this.actualizaMes();
    }
    prev (){
        if (this.fecha.getMonth() == 0) {
            this.fecha = new Date( this.fecha.getFullYear()-1,11,1);
        }
        else
            this.fecha = new Date(this.fecha.getFullYear(),this.fecha.getMonth()-1,1);
        this.actualizaMes();
    }
    // Invocada al hacer click en un dia. Selecciona el dia y llama a la funcion recibida en el constructor en opciones.onselect 
    seleccionarDia( ev ) {
        if ( !ev.target.getAttribute('data-dia')) return;
        document.querySelectorAll("td").forEach((dia)=>{dia.classList.remove("diaseleccionado")});
        ev.target.classList.add('diaseleccionado');
        var fecha = new Date( this.fecha.getFullYear(),this.fecha.getMonth(),ev.target.getAttribute('data-dia'));
        if ( this.onselect ) { this.onselect(fecha) };
        //console.log("Dia seleccionado:", fecha);
    }
    bindEventos(){
        this.botonNext.addEventListener('click',this.next);
        this.botonPrev.addEventListener('click',this.prev);
        document.querySelectorAll("td").forEach( (dia)=>{
            dia.addEventListener('click',this.seleccionarDia);
        } );
    }

}//class

function recibefecha( fecha ) {
    console.log("Se seleccionado esta fecha en el calendario:", fecha);
    var p = "palabra";
    for ( indice in p ) { console.log(indice, p[indice])}
}

window.onload=function() {
    console.log("Construyendo calendario...");
    calendario = new Calendar ( {contenedor:document.getElementById('calendario'), onselect:recibefecha});
}