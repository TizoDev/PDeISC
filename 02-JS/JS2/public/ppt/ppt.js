document.addEventListener('keydown', teclas);
let op = ['Piedra', 'Papel', 'Tijeras'];
let opciones = [2, 0, 1];
let juego = [-1,-1];
let tiempo = 3000;
let jugador = 0;
let intervalo1;
let intervalo2;
let tiempoTranscurrido = 0;
let vsPc = false;

function iniciarJuego()
{
    document.getElementById('checks').style.display = 'none';
    document.getElementById('boton').style.display = 'none';
    document.getElementById('juego').style.display = 'block';
    juego = [-1,-1];
    jugador = 0;
    intervalo1 = setInterval(cambioJugador, tiempo);

    if(document.querySelector('input[name="vs"]:checked').value == 'true') vsPc = true;
    else vsPc = false;

    for(let i=0; i<3; i++) document.getElementById('b'+i).removeAttribute('disabled');
    tiempoTranscurrido = 0;
    tiempoTranscurrido++;
    document.getElementById('tiempo').innerHTML = '<h2> Turno del jugador '+ (jugador+1) + ': ' + tiempoTranscurrido + '</h2>';
    intervalo2 = setInterval(() => {
        tiempoTranscurrido++;
        document.getElementById('tiempo').innerHTML = '<h2> Turno del jugador '+ (jugador+1) + ': ' + tiempoTranscurrido + '</h2>';
    }, 1000);
}

function reiniciarJuego()
{
    document.getElementById('checks').style.display = 'block';
    document.getElementById('boton').style.display = 'block';
    document.getElementById('juego').style.display = 'none';
    document.getElementById('tiempo').innerHTML = '';
    clearInterval(intervalo1);
    clearInterval(intervalo2);
    for(let i=0; i<3; i++) document.getElementById('b'+i).classList.remove('seleccionado');
}

function teclas(event)
{
    if(event.keyCode === 13) //ENTER
    {
        reiniciarJuego();
    }
    if(event.keyCode === 49) //1
    {
        jugar(0);
    }
    if(event.keyCode === 50) //2
    {
        jugar(1);
    }
    if(event.keyCode === 51) //3
    {
        jugar(2);
    }
}

function jugar(opcion)
{
    juego[jugador] = opcion;

    for(let i=0; i<3; i++) document.getElementById('b'+i).classList.remove('seleccionado');

    document.getElementById('b'+opcion).classList.add('seleccionado');
}

function cambioJugador()
{
    if(jugador == 1)
    {
        clearInterval(intervalo1);
        clearInterval(intervalo2);
        mostrarResultado();
    }
    tiempoTranscurrido = 0;
    if(juego[jugador] == -1) jugar(elegirAleatorio());

    if(jugador == 0)
    {
        jugador++;
        if(vsPc)
        {
            jugar(elegirAleatorio());
            deshabilitarBotones();
        }
    }
    for(let i=0; i<3; i++) document.getElementById('b'+i).classList.remove('seleccionado');
}

function mostrarResultado()
{
    deshabilitarBotones();
    if(juego[1] == opciones[juego[0]]) document.getElementById('tiempo').innerHTML = '<h2>Jugador 1 GANA</h2>';
    else if(juego[0] == opciones[juego[1]])
    {
        if(vsPc) document.getElementById('tiempo').innerHTML = '<h2>PC GANA</h2>';
        else document.getElementById('tiempo').innerHTML = '<h2>Jugador 2 GANA</h2>';
    }
    else document.getElementById('tiempo').innerHTML = '<h2>EMPATE</h2>';

    document.getElementById('tiempo').innerHTML += '<p> ' + op[juego[0]] + ' vs ' + op[juego[1]] + '</p>';
}

function deshabilitarBotones()
{
    for(let i=0; i<3; i++) document.getElementById('b'+i).setAttribute('disabled', '');
}

function elegirAleatorio()
{
    return Math.floor(Math.random() * 3);
}