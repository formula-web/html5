window.onload =function() {
    //--- CANVAS 1
    let canvas1 = document.getElementById('canvas');
    canvas1.width = 1000;
    canvas1.height = 300;
    let c1 = canvas1.getContext('2d');

    //---CANVAS 2
    const canvas2=document.getElementById("canvas2");
    const c2 = canvas2.getContext('2d');
    canvas2.width=600;
    canvas2.height=300;

    //---CANVAS 3
    const canvas3=document.getElementById("canvas3");
    let c3 = canvas3.getContext('2d');
    canvas3.width =900;
    canvas3.height=600;

    // CAMARA DE VIDEO A DIV video-camara
    obtenerStreamingCamara( 'video-camara');


    //--- BOTON BORRAR
    document.querySelector("#botonborrar").addEventListener('click', function() {
        console.log("borrar canvas");
        c1.clearRect(0,0,canvas1.width,canvas1.height);
        //c2.clearRect(0,0,canvas2.width,canvas2.height);

        borrarRectangulo();
    })
    //--- BOTON BLANCO Y NEGRO
    document.querySelector("#botonBN").addEventListener('click', function() {
        console.log("boton BN");
        pasarablancoynegro( canvas2, c2 );
    })
    //--- BOTON CAMARA:  STREAMING DE LA CAMARA desde el DIV al CA_NVAS
    document.querySelector("#botoncamara").addEventListener('click', function() {
        console.log("boton camara");
        videoEnCanvas(c3);  // Copia el video desde el contenedor 'video-camara' al contenedor canvas 'c3' modo bucle infinito de fotos
    })

    //--- BOTON FOTOGRAMA
    document.querySelector("#botonfotograma").addEventListener('click', function() {
        console.log("boton fotograma");
        fotogramaToCanvas( document.getElementById('video-camara'), c3 );  
    })
    







    // -- RECTANGULOS
    c1.fillStyle = '#cc8833';
    c1.fillRect(10,120,200,200);
    c1.strokeRect(10,10,50,50);
    c1.strokeRect(10,200,50,50); 

    c1.fillStyle = '#0000ff';
 
    // --- CIRCULO
    c1.beginPath();
        c1.arc( 400,200,50,0, Math.PI*2 ); 
        c1.fill();
    c1.closePath();



    // -- ARCO QUE UNE DOS LINEAS RECTAS
    c1.beginPath();
   
        c1.moveTo(300,200);   c1.lineTo(500,200);  // Recta Horizontal de 300,400  a 400,400
        c1.moveTo(550,250);   c1.lineTo(550,400);  // Recta Vertical   de 350,450  a 350,500 
        c1.strokeStyle = "#0000ff"; c1.stroke();

        c1.beginPath();
        c1.strokeStyle = "#ff0000";
        c1.moveTo(500,200);                     // Start = punto Inicio del arco (Fin primera Recta)
        c1.arcTo( 550, 200,  550, 250 , 50 );   // X1,Y1 = punto donde se cruzarian las tangentes  
        c1.stroke();                            // X2,Y2 = punto fin del arco ( Inicio segunda recta)
        
    
        
    
    // -- TRIANGULO 
    c1.beginPath();             // iniciar figura
        c1.moveTo(500,20);      // situar lapiz. Punto Inicial.
        c1.lineTo(500,60);      // recta desde (500,20) a (500,60)
        c1.lineTo(200,60);      // recta desde (500,60) a (200,60)
        c1.closePath();         // cerrar con recta de (200,60) a inicio en (500,20)
        c1.stroke();            // pintar las rectas (formando TRIANGULO)
        c1.fill();              // rellenar interior Triangulo con c1.fillStyle color



    // NOTA: AL DIMENSIONAR EL CANVAS2 SE LIMPIA TODO Y POR TANTO SE LIMPIA EL CANVAS1

    

    //--- iMAGENES ----------------------
    let img1 = new Image();
    img1.src='./img/glc.jpg';
    img1.onload=function() {
        console.log("imagen cargada");
        c2.drawImage(img1,0,0,80,80);  // ubicar:  camvax.X, canvas.Y,ancho, alto
        c2.drawImage(img1,50,10,840,840,  100, 0, 80,80);// 4 primeros recortar  imagen a x,y - x,y 
        // los 4 ultimos ubicacion en canvas
    }

   //-- ANIMACION en CANVAS2 ---------------------------------------------

    rectangulo = { x:0, y:40, anty:0, antx:0};
    //c.fillRect( rectangulo.x,rectangulo.y,50,50);
    dibujarRectangulo( );

    document.addEventListener('keydown' , function(ev) {
        rectangulo.anty=rectangulo.y;
        rectangulo.antx=rectangulo.x;
        switch (ev.keyCode) {
            case 68:  rectangulo.y+=1;  break;    
            case 69:  rectangulo.y-=1; break; 
            case 37:  rectangulo.x-=1; break;
            case 39:  rectangulo.x+=1; break;
            default:  console.log(ev.keyCode); break;
        };
    //borrar(); dibujarRectangulo();
    });
    function dibujarRectangulo(){
        c2.fillRect( rectangulo.x,rectangulo.y,50,50);
    }
    function borrar() {
        c2.clearRect(0,  0,  canvas2.width,    canvas2.height);
    }
    function borrarRectangulo() {
        c2.clearRect(rectangulo.antx,  rectangulo.anty, 50, 50);
    }


    //--- OPTIMIZAR MOVIMIENTO del rectangulo canvas CON requestAnimationFrame()
    function loop() {
    borrarRectangulo();
    dibujarRectangulo();
    requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
} // fin Window.onload ????





 //--- PIXELES ---------------------------------------------------------------
function pasarablancoynegro( canvas, c2 ) {
    // datosImagen=array lineal 4 elementos por cada pixel del canvas: Valores R, G, B y valor Alpha
    let datosImagen = c2.getImageData (0, 0, canvas.width, canvas.height);
    // Recorrer el array de pixeles y convertir a BLANCO Y NEGRO (poner a R,G y B la media de los tres):
    for (i=0; i< datosImagen.data.length; i+=4 ) { 
        media =  (datosImagen.data[i] + datosImagen.data[i+1] + datosImagen.data[i+2]) / 3;
        datosImagen.data[i] = media;
        datosImagen.data[i+1] = media;
        datosImagen.data[i+2] = media;
    }
    console.log("Pasar a blanco y negro...");
    c2.putImageData(datosImagen,0,0);
    console.log("Pasados los ", datosImagen.data.length, " pixeles");

}


// VIDEO EN CANVAS 3 -----------------------------
// -- usa un bucle infinito que coge un fotograma del stream de la camara y lo pinta en el canvas
// -- bucle infinito en funcion videoToCanvas() puesto en blucle con requestAnimationFrame()
function videoEnCanvas( canvasctx ) {
    foto = new Image(200,200);
    foto.src="./img/glc.jpg";
    foto.onload=()=>{ 
        canvasctx.drawImage(foto,0,0,200,200);
    }

    let video = document.getElementById('video-camara');
    requestAnimationFrame(videoToCanvas);
    //-- bucle  infinito que pinta frames del video en el canvas
        function videoToCanvas( ){
            canvasctx.drawImage( video,0,0,900,600 );
            requestAnimationFrame(videoToCanvas );
        }

}

// EXTRAER FOTOGRAMA desde Contenedor del Video Stream hacia Contenedor Canvas (parametro: contexto canvas)
function fotogramaToCanvas( videocont, canvasctx ) {
    canvasctx.drawImage( videocont,0,0,900,600 );
}


//---- CAMARA DE VIDEO A UN CONTENEDOR HTML ---------------------------------------
function obtenerStreamingCamara( contenedorId ) {
    const limitaciones = {
        audio: false,
        //{
        //    channelCount: { ideal:10},
        //    sampleRate: {},
        //    volume:{},
        //    echoCancellation: true,
        //},
        video:{
            aspectRatio: {},
            width: 1600,
            height: 720,
            frameRate: { ideal:10},
            //facingMode: "user"
    }
    }
    //navigator.mediaDevices.getUserMedia( {video:true, audio:true} )
    navigator.mediaDevices.getUserMedia( limitaciones )
    .then  ( elStream=> { console.log("Permiso concedido acceso a Video y Audio:",elStream); videoEnPantalla( elStream ); })
    .catch ( err => console.log("Error obteniendo permisos a Media Stream:",err) )
    function videoEnPantalla( video ) {
        console.log("Mostrando video en pantalla...");
        elVideo = document.getElementById( contenedorId );
        elVideo.srcObject = video;
   
}
}
