document.addEventListener('keydown', tecla); //Se define el evento para que el documento detecte las teclas presionadas

//Se definen las variables seleccionadas
let simon = []; //El patron a repetir
let usuario = []; //El patron que envia el usuario
let colores = ['azul', 'amarillo', 'rojo', 'verde']; //Los colores disponibles
let perdio = true; //Si el jugador perdio o no

//Un array con todos los botones disponibles
let botones = document.querySelectorAll('.botonSimon');
//Se agrega el evento de click a cada boton
botones.forEach(bot => {
    bot.addEventListener('click', async () => {
        const color = bot.dataset.color;
        await presionar(color);
    });
});
//Se deshabilitan los botones por default
deshabilitar();

//Detecta si se presiono el enter para reiniciar el juego
function tecla(event)
{
    if(event.keyCode === 13 && perdio == true) //Enter
    {
        document.getElementById('muerte').style.display = 'none';
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
async function presionar(color)
{
    usuario.push(color); //Agrega el color al array del usuario
    await iluminar(color, 200, 100); //Se espera a que se ilumine el boton
    await esperar(500); //Se espera un poco mas para que no sea todo seguido

    //Revisa que no se haya equivocado
    if(!comparar())
    {
        gameover(); //Si se equivoca termina el juego
        return;
    }
    if(usuario.length == simon.length && !perdio) //Si no perdio pero llego al final del patron
    {
        deshabilitar(); //Deshabilita los botones
        agregarColor(); //Agrega un color mas
        await cinematica(); //Muestra el patron a copiar
    }
}

function esperar(ms) //Hace que el codigo espere cierta cantidad de tiempo antes de continuar
{
    return new Promise(resolve => setTimeout(resolve, ms));
}

//Hace una animacion de iluminar un boton por cierta cantidad de tiempo
async function iluminar(color, temp1, temp2)
{
    document.getElementById(color).style.opacity = '100%'; //Cambia la opacidad al 100
    await esperar(temp1);
    document.getElementById(color).style.opacity = '0.6';
    await esperar(temp2);
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

async function cinematica()
{
    //Muestra el patron de a poco, con un poco de tiempo entre iteraciones
    for (let col of simon) 
    {
        await iluminar(col, 800, 200);//Ilumina el boton correspondiente
    };
    habilitar(); // Habilita los botones después de mostrar la secuencia
}

function gameover()
{
    //Deshabilita todos lso botones y le muestra al jugador que perdio y cuantos puntos tuvo
    deshabilitar();
    document.getElementById('muerte').style.display = 'block';
    document.getElementById('muerte').innerHTML = '<h1>Perdiste!!</h1><h3>Puntuacion: ' + simon.length + '</h3><h3>Presiona Enter para volver a intentarlo</h3>';
    perdio = true;    
}