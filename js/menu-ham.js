
// CargarMenu(): Cargar fichero html con fetch (por su path relativo) en un contenedor (por su id)
// en el contenedor id=iconomenu, pinta el icono de la hamburguesa y controla el click 
// Oculta/Muestra el menu cambiando el width de su contenedor: containermenu
// Menu tipo HAM
function cargaMenu( ficherohtml, containermenu="containermenulateral" , iconomenu="iconomenu") {
    fetch(ficherohtml)
    .then(response => {
      return response.text()
    })
    .then(data => {
        document.getElementById(containermenu).innerHTML = data;
      })
    let icono =document.getElementById(iconomenu);
    if ( icono ) {
        icono.innerHTML="\&#9776;";
        icono.addEventListener('click', (ev)=>{toggleMenu(ev,containermenu)} );
    } 
    
} //cargaMenu
//export default cargaMenu;

// Evento click: muestra oculta el menu y cambia el icono hamburguesa / flecha
function toggleMenu(ev, containermenu){
    if ( ev.target.innerHTML.includes("☰")) {
        ev.target.innerHTML="&#9664;" 
        document.getElementById(containermenu).style.width="30vw";
    } else {
        ev.target.innerHTML="&#9776;"
        document.getElementById(containermenu).style.width="0em";
    } 

}

export { cargaMenu, toggleMenu };

