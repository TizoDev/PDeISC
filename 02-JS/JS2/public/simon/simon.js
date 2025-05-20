document.addEventListener('keydown', tecla); //Se define el evento para que el documento detecte las teclas presionadas

//Se definen las variables seleccionadas
let simon = []; //El patron a repetir
let usuario = []; //El patron que envia el usuario
let colores = ['azul', 'amarillo', 'rojo', 'verde']; //Los colores disponibles
let perdio = true; //Si el jugador perdio o no

//Un array con todos los botones disponibles
let botones = document.querySelectorAll('.botonSimon');

//Detecta si se presiono el enter para reiniciar el juego
function tecla(event)
{
    if(event.keyCode === 13 && perdio == true) //Enter
    {
        perdio = false;
        iniciarJuego()
    }
}

//Inicia el juego
function iniciarJuego()
{
    //Vacia la etiqueta y las variables
    document.getElementById('muerte').innerHTML = '';
    while(usuario.length>0) usuario.pop();
    while(simon.length>0) simon.pop();
    agregarColor(); //Agrega el primer color
    deshabilitar(); //Deshabilita los botones
    cinematica(); //Muestra el patron que hay que copiar
}

//Se llama cada que se presiona un color
function presionar(color)
{
    usuario.push(color); //Agrega el color al array del usuario

    //Revisa que no se haya equivocado
    if(!comparar()) gameover(); //Si se equivoca termina el juego
    if(usuario.length == simon.length && !perdio) //Si no perdio pero llego al final del patron
    {
        deshabilitar(); //Deshabilita los botones
        agregarColor(); //Agrega un color mas
        cinematica(); //Muestra el patron a copiar
    }
    //Hace una promesa para hacer un temporizador que activa momentaneamente el color para luego deshabilitarlo
    var promise = Promise.resolve();
    promise = promise.then(function () {
        document.getElementById(color).style.opacity = '80%';
        return new Promise(function (resolve) {
          setTimeout(resolve, 200);
        });
      });
    promise = promise.then(function () {
        document.getElementById(color).style.opacity = '30%';
        return new Promise(function (resolve) {
          setTimeout(resolve, 100);
        });
      });
}

//Agrega un color aleatorio a la vez que borra los colores que ingreso el usuario
function agregarColor()
{
    simon.push(colores[Math.floor(Math.random() * colores.length)]);
    while(usuario.length>0) usuario.pop();
}

function comparar()
{
    //Compara hasta el momento si el usuario ingreso bien todos los colores
    let p = usuario.length-1;
    if(usuario[p] == simon[p]) return true;
    else return false;
}

function deshabilitar()
{
    //Deshabilita todos los botones
    botones.forEach(bot => {
        bot.setAttribute('disabled', '');
    });
}

function habilitar()
{
    //Habilita todos los botones
    botones.forEach(bot => {
        bot.removeAttribute('disabled');
    });
}

function cinematica()
{
    //Muestra el patron de a poco, con un poco de tiempo entre iteraciones
    var promise = Promise.resolve();
    simon.forEach(col =>{
        promise = promise.then(function () {
            document.getElementById(col).style.opacity = '100%'; //Cambia la opacidad al 100
            return new Promise(function (resolve) {
              setTimeout(resolve, 600);
            });
          });
        //Luego de esperar un poco
        promise = promise.then(function () {
            document.getElementById(col).style.opacity = '30%'; //Cambia la opacidad al 30
            return new Promise(function (resolve) {
              setTimeout(resolve, 200);
            });
          });
    });
    promise = promise.then(function () {
        habilitar();
        return new Promise(function (resolve)
        {
            setTimeout(resolve, simon.length * 800);
        });
    });
}

function gameover()
{
    //Deshabilita todos lso botones y le muestra al jugador que perdio y cuantos puntos tuvo
    deshabilitar();
    document.getElementById('muerte').innerHTML = '<h1>Perdiste!!</h1><h3>Puntuacion: ' + simon.length + '</h3><h3>Presiona Enter para volver a intentarlo</h3>';
    perdio = true;    
}