/**
 * 
 * Laura Tortosa - 23 octubre 2019 - #001
 *
 * Planteamiento: 
 * Se requiere monitorear la salud de N servidores y EN CASO DE QUE EL TIEMPO DE RESPUESTA SEA INFERIOR A 5 SEGUNDOS reportar que el servidor esta fuera de 
 * servicio.
 * En caso de superar los 5 segundos resolvemos la promesa; resolve({error: 'servidor fuera de servicio'})
 * 
 * Solución: 
 * Desarrollar función que simule timeout throwTimeoutException()
 * Utilizar Promise.race que retorna el resultado de la primera promesa finalizada
 * Utilizar Promise.all que retorna el resultado de todas las promesas una vez se hayan finalizado
 * 
*/

// simulador de timeOutException a 5 segundos
function throwTimeoutException() {
    return new Promise(resolve=> {
        setTimeout(resolve, 5000, {error: 'servidor fuera de servicio'});
    });
}

// retornar primera promesa cumplida entre llamada al servidor y el simulador de timeOut
function handlerPromise(options) {
    return Promise.race([callServerAndBuildReport(options), throwTimeoutException()]);
};
    
const promises = [handlerPromise(options), handlerPromise(options), handlerPromise(options)];

Promise.all(promises)
    .then(result=> {
        res.send(result).status(200);
    })
    .catch(error=>{
        res.status(500);
    });




