window.onload=function() {
    bindEventos();
    leerThemeMode();
}

function bindEventos(){
    // boton (checklist+label) que cambia Dark Light Mode
    document.getElementById("botontoggle").addEventListener("change", toggleDarkMode);
}

// Cambiar Dark/Light Mode cambiando una clase a <body> lo cual provoca cambios de variables de color en el css
function toggleDarkMode( ev ){
    if (ev.target.checked) {
        document.querySelector("body").classList.add("darkbody");
        document.querySelector("body").classList.remove("lightbody");
        //console.log("Pongo modo dark");
        guardarThemeMode("dark");
    }else {
        document.querySelector("body").classList.add("lightbody");
        document.querySelector("body").classList.remove("darkbody");
        guardarThemeMode("light");
        //console.log("quito");
    }
}

//Leer/Guardar en Local Storage el modo seleccionado (Dark/Light mode)
function leerThemeMode(){
    try{
        var themeMode=window.localStorage.getItem("fm-darkmode");
        if   ( themeMode == 'dark') {
            document.querySelector("body").classList.add("darkbody");
            document.getElementById("botontoggle").checked=true;
        }    
        else {
            document.querySelector("body").classList.add("lighbody");
            document.getElementById("botontoggle").checked=false;
        }              
        
    } catch {
        
    }
}
function guardarThemeMode( modo ){
        window.localStorage.setItem("fm-darkmode",modo);
}


document.cookie = "nombre=paco;max-age=3600";
document.cookie = "comida_preferida=paella";
console.log("cookies:",document.cookie); 

