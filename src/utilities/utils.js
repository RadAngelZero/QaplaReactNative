//diego     - 16-07-2019 - us30 - File creation

/**Generador ramdom de claves para retas
 * basado en el metodo de android
*/
const AB = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

export function randomString(){
    var string = '';
    for(var i = 0; i < 8; i++){
        string += AB[parseInt(Math.random() * 61)];
    }
    return string;
}
