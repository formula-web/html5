
// CargarMenu(): Cargar fichero html (por su path relativo) en un contenedor (por su selector)
// El fichero html tendrá un contenedor id="seccionmenu" y un div="controlmenu" para el tema de 
// menu sticky al hacer scroll

function cargaMenu( selector, ficherohtml, sticky ) {
    fetch(ficherohtml)
    .then(response => {
      return response.text()
    })
    .then(data => {
        document.getElementById(selector).innerHTML = data;
      })

      if (sticky) iniciarclavarMenu();
}
export  default cargaMenu;

//--- ClavarMenu:  pone el menu en modo Sticky cuando por Scroll se llega a la parte de arriba de la pagina y lo quita cuando no
//-- se utiliza el div id=controlmenu para medir la posicion vertical
function iniciarclavarMenu() {
    let clavado = false;
    window.addEventListener('scroll', ()=>{
        let posicionmenu = document.getElementById("controlmenu").getBoundingClientRect();
        console.log("Posicion menu:", posicionmenu);
        if ( posicionmenu.y <= 0) { 
            clavaMenu();
        } else if ( posicionmenu.y > 50) 
            desclavaMenu();
    }) 
}
function clavaMenu(){
    document.getElementById("seccionmenu").classList.add("menusticky")
}
function desclavaMenu(){
    document.getElementById("seccionmenu").classList.remove("menusticky")

}

