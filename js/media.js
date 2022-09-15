let elementoSelect=null;
window.onload=function() {
    elementoSelect = document.getElementById("selector-devices");

        obtenerPermisoDispositivos();

        alimentarSelectDispositivos();

        ponerVideoSeleccionado();

        //contexto del canvas
        canvas1=document.getElementById("canvas1");
        canvas1.width = 600; canvas1.height=400;
        c1=canvas1.getContext('2d');

        // meter foto en canvas
        foto = new Image(200,200);
        foto.src="./img/coche.jpg";
        foto.onload=function(){
            c1.drawImage(foto,0,0,600,400);
        }

}

//-- obtenerPermisoDispositivos()
//-- rellena objeto limitaciones para filtrar y configurar tipos de dispositivos y formatos
//-- Invoca a    navigator.mediaDevices.getUserMedia ( )    para que el navegador solicite permisos al usuario
function obtenerPermisoDispositivos() {
    const limitaciones = {
        audio:{
            channelCount: { ideal:10},
            sampleRate: {},
            volume:{},
            echoCancellation: true,
            facingMode: "user"
        },
        video:{
            aspectRatio: {},
            width: 1600,
            height: 720,
            frameRate: { ideal:10},
        }
    }
    //navigator.mediaDevices.getUserMedia( {video:true, audio:true} )
    navigator.mediaDevices.getUserMedia( limitaciones )
    .then  ( elStream=> { console.log("Permiso concedido acceso a Video y Audio:",elStream); videoEnPantalla( elStream ); })
        .catch ( err => console.log("Error obteniendo permisos a Media Stream:",err) )
    function videoEnPantalla( video ) {
        console.log("Mostrando video en pantalla...");
        elVideo = document.getElementById('video-camara');
        elVideo.srcObject = video;
    }
    
}

// --- function alimentarSelectDispositivos() 
// --- Obtiene lista de dispositivos con     navigator.mediaDevices.enumerateDevices()
// --- Carga la lista en un Select - Options

function alimentarSelectDispositivos() {
    navigator.mediaDevices.enumerateDevices()  //retorna promesa con array devices
    .then ( devices=>{  // Recorrer array devices para añadirlos al <sekect>
        devices.forEach(device=>{
            //if(device.kind!='videoinput') return; // filtrar solo camaras, no audio devices
            let optionTab = document.createElement("option");
            optionTab.innerHTML = device.label;
            optionTab.value = device.deviceId;
            elementoSelect.appendChild( optionTab);
        })
    }
    )
}

function ponerVideoSeleccionado(){
    elementoSelect.addEventListener('change', function (ev) {    //Evento change en Select a -> funcion ponerVideo()
        let valorSeleccionado = this.options[this.selectedIndex].value;
        document.getElementById("cual").innerHTML = valorSeleccionado;
        ponerVideo( valorSeleccionado);
    })
    function ponerVideo ( device = undefined) {                 //funcion ponerVideo recibe id camara seleccionada
        const limitaciones = {                                  //id de la camara es un filtro para getUserMedia
            video: { deviceId: device }
        }
        navigator.mediaDevices.getUserMedia( limitaciones )     //obtiene la camara y si la promise va bien, la asigna al..
            .then  ( elStream=> {  video2EnPantalla( elStream ); })  // ..elemento html video
            .catch ( err => console.log("Error obteniendo permisos a Media Stream:",err) );
        function video2EnPantalla( device ) {
            console.log("Visualizando:", device.id, device);
            elVideo2 = document.getElementById('video2');
            elVideo2.srcObject = device;
    }
}
}
