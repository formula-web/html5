
window.onload = function() {
    // Asignar Eventos de los Botones de Control del Video
    let video1=document.querySelector("video.video1");
    let botonplay = document.querySelector("#botonplay");
    let botonpause=document.querySelector("#botonpause");
    let botonstop = document.querySelector("#botonstop");
    let botonff= document.querySelector("#botonff");
    let botonrr= document.querySelector("#botonrr");
    let botonPC= document.querySelector("#botonPC");
    botonplay.addEventListener('click',function() {video1.play() });
    botonpause.addEventListener('click',function() {video1.pause()});
    botonstop.addEventListener('click',function() {video1.pause(); video1.currentTime=0;});
    botonff.addEventListener('click',function() {video1.currentTime++;} );
    botonrr.addEventListener('click',function() {video1.currentTime--;} );
    botonPC.addEventListener('click',function( evento ) { ponerPantallaCompleta(evento, video1)} );
    //------------

    window.addEventListener('scroll',  ()=>{ ViewPort.playVideoSiVisible( "#videoplay") } );

} //onload



function ponerPantallaCompleta (evento, videoEl) {
    let funcionFullScreen = videoEl.requestFullscreen   ||
                            videoEl.webkitRequestFullScreen ||
                            videoEl.mozRequestFullScreen    ||
                            videoEl.msRequestFullScreen;
    funcionFullScreen.call (videoEl);

    let posicion = getRelativeCoordinates(evento, botonPC ); // Esto no es necesario, es solo para probar tema posicion del click
    console.log( posicion);

}

// Retorna objeto {x,y} con las coordenadas relativas de evento dentro de container
function getRelativeCoordinates ( evento, container ) {
    var pos = {}, offset={}, ref;
    ref = container.offsetParent;
    pos.x = !! evento.touches ? evento.touches[0].pageX : evento.pageX;
    pos.y = !! evento.touches ? evento.touches[0].pageY : evento.pageY;

    offset.left = container.offsetLeft;
    offset.top =  container.offsetTop;

    while ( ref) {
        offset.left += ref.offsetLeft;
        offset.top  += ref.offsetTop;
        ref = ref.offsetParent;
    }
    return {
        x: pos.x - offset.left,
        y: pos.y - offset.top,
    };
}

//CONTROL DE VIEWPORT VISIBLE Y AUTOPLAY CUANDO VIDEO VISIBLE EN VIEWPORT
class ViewPort {
    static Visible ( elemento ) { // Retorna si el elemento está visible en el viewport
        console.log("ejecucion de Visible()");
        let posicion = elemento.getBoundingClientRect();
        let alturaVentana = document.documentElement.clientHeight;
        //elemento visible si la distancia actual a top es menor que la altura actual de document (alturaVentana)
        // y tambien si top negativo pero menor que la altura del video
        return ( posicion.top < alturaVentana  && (-posicion.top) < posicion.height );
    }
    
    static playVideoSiVisible( selector ) {
        let video=document.querySelector(selector);
        //console.log("ejecucion playVideoSiVisible()");
        if ( ViewPort.Visible (  video ) ) {
            console.log("visible");
            video.play();
        } else {
            console.log("No Visible");
            video.pause();
        }
      
    }
}


