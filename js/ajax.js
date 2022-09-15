class PeticionAjax {
    
    static get(url){
        let objetoAjax = new XMLHttpRequest( );

        objetoAjax.open("GET",url);
        objetoAjax.setRequestHeader('Access-Control-Allow-Origin','*');
        objetoAjax.send();

        return new Promise( (resolve, reject)=>{
            objetoAjax.onreadystatechange = ()=>{
                if (objetoAjax.readyState == 4) {
                    if (objetoAjax.status == 200) {
                        return resolve( objetoAjax.responseText );
                    }
                    else 
                        return reject(objetoAjax.status);
                     
                }
            }

        } );
    }//get()
}//class

( function(){
    PeticionAjax.get("http://127.0.0.1:5500/listas.html")
    .then( (results)=>{console.log (results )} )
    .catch( (error)=>{console.log("Error:", error)} );
});


//------ LEER URL CON FETCH ------ Retorna un Promise con el objeto Json o el Texto html ----------
function leerPagina ( url, tipo='text'  ) {
    return new Promise( ( finok, finerror )=>{
        fetch (url )
        .then ( (datos)=>{
            if ( tipo=='json') return finok( datos.json() ); 
            if ( tipo=='text') return finok( datos.text() ); 
        } )        
        .catch ( (e)=>{
            return finerror( e.code );
        } );
    });
} ; 
//-----------------------------------------------------------------------------------------------
