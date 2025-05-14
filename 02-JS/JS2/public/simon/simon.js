document.addEventListener('keydown', tecla);

let simon = [];
let usuario = [];
let colores = ['azul', 'amarillo', 'rojo', 'verde'];
let perdio = true;

let botones = document.querySelectorAll('.botonSimon');

function tecla(event)
{
    if(event.keyCode === 13 && perdio == true) //Enter
    {
        perdio = false;
        iniciarJuego()
    }
}

function iniciarJuego()
{
    document.getElementById('muerte').innerHTML = '';
    while(usuario.length>0) usuario.pop();
    while(simon.length>0) simon.pop();
    agregarColor();
    deshabilitar();
    cinematica();
}

function presionar(color)
{
    usuario.push(color);

    if(!comparar()) gameover(); 
    if(usuario.length == simon.length && !perdio)
    {
        deshabilitar();
        agregarColor();
        cinematica();
    }
    else
    {
        var promise = Promise.resolve();
        promise = promise.then(function () {
            document.getElementById(color).style.opacity = '100%';
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
}

function agregarColor()
{
    simon.push(colores[Math.floor(Math.random() * colores.length)]);
    while(usuario.length>0) usuario.pop();
}

function comparar()
{
    let p = usuario.length-1;
    if(usuario[p] == simon[p]) return true;
    else return false;
}

function deshabilitar()
{
    botones.forEach(bot => {
        bot.setAttribute('disabled', '');
    });
}

function habilitar()
{
    botones.forEach(bot => {
        bot.removeAttribute('disabled');
    });
}

function cinematica()
{
    var promise = Promise.resolve();
    simon.forEach(col =>{
        promise = promise.then(function () {
            document.getElementById(col).style.opacity = '100%';
            return new Promise(function (resolve) {
              setTimeout(resolve, 1000);
            });
          });
        promise = promise.then(function () {
            document.getElementById(col).style.opacity = '30%';
            return new Promise(function (resolve) {
              setTimeout(resolve, 200);
            });
          });
    });
    promise = promise.then(function () {
        habilitar();
        return new Promise(function (resolve)
        {
            setTimeout(resolve, simon.length * 1200);
        });
    });
}

function gameover()
{
    deshabilitar();
    document.getElementById('muerte').innerHTML = '<h1>Perdiste!!</h1><h3>Puntuacion: ' + simon.length + '</h3><h3>Presiona Enter para volver a intentarlo</h3>';
    perdio = true;    
}