document.addEventListener('keydown', teclas); //Se le agrega el evento al documento para poder detectar que teclas se presionan

/*
    Se declaran todas las variables necesarias para el juego
    Teniendo en cuenta que Piedra=0, Papel=1, Tijeras=2
*/
let opciones = [2, 0, 1]; //Se define quien le gana a quien
let juego = [-1,-1]; //Se definen los 2 movimientos de los jugadores
let tiempo = 3000; //Tiempo que tiene cada jugador para elegir
let jugador = 0; //Jugador actual
let intervalo1; //Intervalos de tiempo
let intervalo2;
let tiempoTranscurrido = 0;
let vsPc = false; //Determina si se esta jugando contra la pc o contra un usuario

//Se llama cada que se quiere jugar
function iniciarJuego()
{
    //Se esconden o muestran las etiquetas del html
    document.getElementById('checks').style.display = 'none';
    document.getElementById('boton').style.display = 'none';
    document.getElementById('juego').style.display = 'block';
    juego = [-1,-1]; //Se establecen los valores al inicio
    jugador = 0;
    intervalo1 = setInterval(cambioJugador, tiempo); //Se define un intervalo para cambiar al jugador

    //Se define si se juega contra el dispositivo o contra otra persona
    if(document.querySelector('input[name="vs"]:checked').value == 'true') vsPc = true;
    else vsPc = false;

    //Se habilitan los botones
    for(let i=0; i<3; i++) document.getElementById('b'+i).removeAttribute('disabled');

    //Se establece un intervalo que define el tiempo transcurrido de cada turno y a que jugador le toca
    tiempoTranscurrido = 0;
    tiempoTranscurrido++;
    document.getElementById('tiempo').innerHTML = '<h2> Turno del jugador '+ (jugador+1) + ': ' + tiempoTranscurrido + '</h2>';
    intervalo2 = setInterval(() => {
        tiempoTranscurrido++;
        document.getElementById('tiempo').innerHTML = '<h2> Turno del jugador '+ (jugador+1) + ': ' + tiempoTranscurrido + '</h2>';
    }, 1000);
}

//Se llama cada que se quiere reiniciar un juego ya comenzado
function reiniciarJuego()
{
    //Muestra o esconde las etiquetas correspondientes
    document.getElementById('checks').style.display = 'block';
    document.getElementById('boton').style.display = 'block';
    document.getElementById('juego').style.display = 'none';
    document.getElementById('tiempo').innerHTML = '';
    clearInterval(intervalo1); //Detiene los intervalos
    clearInterval(intervalo2);
    //Limpia los colores de los botones
    for(let i=0; i<3; i++) document.getElementById('b'+i).classList.remove('seleccionado');
}

//Detecta que tecla fue presionada
function teclas(event)
{
    if(event.keyCode === 13) //ENTER
    {
        reiniciarJuego();
    }
    if(event.keyCode === 49) //Juega Piedra con la tecla 1
    {
        jugar(0);
    }
    if(event.keyCode === 50) //Juega Papel con la tecla 2
    {
        jugar(1);
    }
    if(event.keyCode === 51) //Juega Tijeras con la tecla 3
    {
        jugar(2);
    }
}

//Juega una de las opciones con el jugador correspondiente actualmente
function jugar(opcion)
{
    juego[jugador] = opcion; //Define que el valor de juego sub jugador(0 o 1) sera igual al valor de la opcion

    //Elimina los colores de seleccionado de todos los botones
    for(let i=0; i<3; i++) document.getElementById('b'+i).classList.remove('seleccionado');

    //Le da la clase de seleccionado al boton correspondiente
    document.getElementById('b'+opcion).classList.add('seleccionado');
}

//Pasado un tiempo determinado cambia de jugador
function cambioJugador()
{
    if(jugador == 1) //Si este es el segundo jugador limpia los intervalos y muestra el resultado
    {
        clearInterval(intervalo1);
        clearInterval(intervalo2);
        mostrarResultado();
    }
    tiempoTranscurrido = 0; //Reinicia el tiempo
    if(juego[jugador] == -1) jugar(elegirAleatorio()); //Si el jugador no eligio nada pasado el tiempo se elige algo aleatorio

    if(jugador == 0) //Si es el primer jugador
    {
        jugador++; //Se suma uno a la variable
        if(vsPc) //Y si esta jugando contra la pc 
        {
            jugar(elegirAleatorio()); //Se juega algo aleatorio
            deshabilitarBotones(); //Y se deshabilian los botones para que el jugador no interfiera
        }
    }
    //Se limpian las clases de los botones
    for(let i=0; i<3; i++) document.getElementById('b'+i).classList.remove('seleccionado');
}

//Se muestra el resultado de la partida
function mostrarResultado()
{
    deshabilitarBotones(); //Se deshabilitan los botones
    //Si el jugador 1 gano
    if(juego[1] == opciones[juego[0]]) document.getElementById('tiempo').innerHTML = '<h2>Jugador 1 GANA</h2>';
    //Si el jugador 2 gano
    else if(juego[0] == opciones[juego[1]])
    {
        if(vsPc) document.getElementById('tiempo').innerHTML = '<h2>PC GANA</h2>';
        else document.getElementById('tiempo').innerHTML = '<h2>Jugador 2 GANA</h2>';
    }
    else document.getElementById('tiempo').innerHTML = '<h2>EMPATE</h2>';

    //Se muestra cuales fueron las opciones del juego
    let op = ['Piedra', 'Papel', 'Tijeras'];
    document.getElementById('tiempo').innerHTML += '<p> ' + op[juego[0]] + ' vs ' + op[juego[1]] + '</p>';
}

//Se deshabilitan los botones
function deshabilitarBotones()
{
    for(let i=0; i<3; i++) document.getElementById('b'+i).setAttribute('disabled', '');
}

//Devuelve un numero aleatorio entre 0 y 2
function elegirAleatorio()
{
    return Math.floor(Math.random() * 3);
}