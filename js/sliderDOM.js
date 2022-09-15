import Slider2 from './slider2.js';

import Slider from './slider.js';
import diapositivas from './diapositivas.js';

console.log("diapositivas importadas:", diapositivas, diapositivas.length);

let textContent = document.querySelector("#slider-text-content");
let imageContent= document.querySelector("#slider-image");

let sliderText = document.querySelector("#slider-text");
let sliderTitle= document.querySelector("#slider-title");
let sliderSubtitle=document.querySelector("#slider-subtitle");
let sliderImage = document.querySelector("#slider-image img");
let flechaDerecha = document.querySelector(".flecha-derecha");
let flechaIzquierda=document.querySelector(".flecha-izquierda");

//Inicia dispositivas del Slider2
let mislider2 = new Slider2 ( {selector:"#slider2"} );


// instancia un objeto Slider indicando los 3 elementos:  contenido sliders, velocidad y funcion para visualizar cada slider
let mislider = new Slider ( {
    speed:5000,
    elementos: diapositivas,

    // funcion que pinta el elmeento en pantalla
    funcion: function(elemento) {
        //primro oculta texto e imagen (para mostrarlos despues con transicion)
        textContent.classList.add("hide");       
        imageContent.classList.add("hide");

        //mostrar slider con retraso y la transition definida
        setTimeout( function() { 
            sliderTitle.innerHTML = elemento.titulo;
            sliderSubtitle.innerHTML = elemento.subtitulo;
            sliderText.innerHTML = elemento.text;
            sliderImage.src= elemento.image;
            textContent.classList.remove("hide");       
            imageContent.classList.remove("hide");
        }, 1600);

    }
   

});

flechaDerecha.addEventListener('click',   mislider.next);
flechaIzquierda.addEventListener('click', mislider.prev);

export function empezar() { mislider.play() }

//empezar();

//slider.play();
//setTimeout( slider.stop, 90000 );