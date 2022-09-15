
window.onload = function() {

    // formulario 1
    let rangoEl = document.querySelector('input[type="range"]');
    rangoEl.addEventListener('input', function(){
        document.querySelector("#valorrango").innerHTML= rangoEl.value;
    })

    let estadoValidacion= document.querySelector('input').validity;
    document.querySelector('[type="submit"]').addEventListener('click',function()
        {
            //console.log("checkValidity:", document.querySelector("#form1").checkValidity()  );
            let inputsInvalidos=document.querySelectorAll("#form1 input:invalid");
            //console.log("Inputs invalidos:", inputsInvalidos);
            if (! document.querySelector("#form1").checkValidity() ) {
                document.querySelector("#text1").setCustomValidity("hay algun error");
            }

            if ( inputsInvalidos.length == 0) console.log("inputs invalidos es 0");
            inputsInvalidos.forEach( function(campo) {
                //console.log(campo);
                campo.style.opacity="0.5";
            })
        }
    );


    // Selector de Ficheros: preparar evento de Carga Fichero imagen en el div.
    ( function () {
        console.log("preparar evento change");
        document.querySelector("#inputfotos").addEventListener('change', function(ev){
            let ficheros = ev.target.files;  // array de ficheros seleccionados en el input
            let fichero= ficheros[0];   
            let urlfoto = URL.createObjectURL(fichero); // convierte fichero en url 
            document.querySelector("#fotocargada").style.backgroundImage="url('" + urlfoto + "')";
           })
    })( ) 

    // Boton Leer Pagina
    document.querySelector("#botonleer").addEventListener('click',()=>{
        p = leerPagina('http://127.0.0.1:5500/datos.json','text');
        if (p)  
            p.then ( (datos)=>console.log("Resultado final leerPagna:",datos));
        else 
            console.log("p es null");
    });


    // Formulario del INPUT AUTOCOMPLETADO
    // Autocompletar el INPUT creando una seccion <DATALIST> cargada desde un json
    // Crear <datalist>
    let datalist = document.createElement('datalist');
    datalist.setAttribute('id','datalist');
    document.getElementById('autocompletado1').setAttribute('list','datalist');
    document.getElementById('form2').appendChild( datalist ); 
    // leer json
    let datosjson=[{}];
     p = leerPagina('http://127.0.0.1:5500/datos.json','json');
     if ( !p ) console.log("p es null");
     else {
        p.then ( (datos)=>{ 
            datosjson = datos; 
            // crear y cargar <options> del datalist con datosjson
            datosjson.forEach ( (opcion)=>{ 
                  let option = document.createElement('option');
                option.value = opcion.label;
                datalist.appendChild(option);
            })
        } );
         
     }

   
     


}//onload





