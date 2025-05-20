document.addEventListener('keydown', reiniciar); //Le agrega el evento al documento para que detecte cuando se presiono una tecla

let tateti = [['', '', ''], ['', '', ''], ['', '', '']]; //Se crea la matriz que contiene el juego
let j1 = 'X'; //Una variable para cada jugador
let j2 = 'O';
let turno = false; //False = Jugador1, True = Jugador2
let vsPc = false; //Determina si se juega contra la pc
let gano = false; //Muestra si se gano o no
let turnos = 0; //Muestra los turnos

//Se llama cada que se quiere iniciar el juego
function IniciarJuego()
{
    //Cambia la visibilidad de las etiquetas
    document.getElementById('tateti').style.display = 'block';
    document.getElementById('checks').style.display = 'none';
    document.getElementById('boton').style.display = 'none';
    document.getElementById('victoria').style.display = 'none';
    document.getElementById('turno').style.display = 'block';

    //Determina quien arranca primero
    let n = Math.floor(Math.random() * 2);
    if(n == 0) turno = false;
    else turno = true;

    turnos = 0; //Establece los turnos a 0

    //Determina si el jugador eligio jugar contra la pc o contra otro jugador
    if(document.querySelector('input[name="vs"]:checked').value == 'true') vsPc = true;
    else vsPc = false;

    //Variables para la IA
    inicioPotente = false;
    esquinas = 0;

    //Muestra a quien le toca jugar
    siguienteTurno(false);
}

function reiniciar(event)
{
    if(event.keyCode === 13) //Enter
    {
        //Reinicia todos los valores a como si la pagina fuera recien cargada
        document.getElementById('tateti').style.display = 'none';
        document.getElementById('checks').style.display = 'block';
        document.getElementById('boton').style.display = 'block';
        document.getElementById('turno').style.display = 'none';
        document.getElementById('victoria').style.display = 'none';
        tateti = [['', '', ''], ['', '', ''], ['', '', '']];
        dibujar();
        vsPc = false;
        gano = false;
    }
}

//Agrega un valor a la matriz
function agregar(n, f, c)
{
    //N siendo el jugador, F la fila, y c la columna
    //Determina si los valores fueron enviados correctamente
    if(turno == n && tateti[f][c] == '' && !gano)
    {
        //Revisa a quien le toca jugar
        let jugador;
        if(!n) jugador = j1;
        else jugador = j2;

        //Reemplaza los valores en el tateti
        tateti[f][c] = jugador;
        let p = dibujar();

        //Revisa si el jugador no lleno toda la tabla o si gano
        gano = revisar()
        if(!gano)
        {
            if(p < 9) siguienteTurno(true); //Si la tabla no esta llena se continua el juego
            else
            {
                //Se declara empate
                document.getElementById('victoria').style.display = 'block';
                document.getElementById('texto').innerHTML = '<h1>Empate</h1>';
            }
        }
        else
        {
            //Se determina quien gano
            document.getElementById('victoria').style.display = 'block';
            document.getElementById('texto').innerHTML = '<h1>Ganador: ' + jugador + '</h1>';
        }
        
    }
}

function dibujar()
{
    let n=0;
    //Se dibuja toda la tabla y se cuentan cuantos espacios ocupados hay
    for(let i=0; i<3; i++)
    {
        for(let j=0; j<3; j++)
        {
            document.getElementById(j + '-' + i).innerHTML = tateti[i][j];
            if(tateti[i][j] != '') n++;
        }
    }
    return n;
}

function siguienteTurno(cam)
{
    //Si cam es true se pasa al sigueinte turno, en su defecto solo se ajusta el html
    if(cam) turno = !turno;

    turnos++;
    //Se acomoda el texto para que sea acorde al turno correspondiente
    if(!turno) document.getElementById('turno').innerHTML = 'Turno de: Jugador 1';
    else if(!vsPc) document.getElementById('turno').innerHTML = 'Turno de: Jugador 2';
    else
    {
        //Si se juega contra la pc se llama al algoritmo para que juege
        document.getElementById('turno').innerHTML = 'Turno de: Pc';
        turnoPc();
    }
}

function revisar()
{
    //Revisa cada posible combinacion con la que se puede ganar, si alguien gano devuelve true
    //Revisar filas
    for(let i=0; i<3; i++)
    {
        if(tateti[i][0] == tateti[i][1] && tateti[i][0] == tateti[i][2] && tateti[i][0] != '') return true;
    }
    //Revisar columnas
    for(let i=0; i<3; i++)
    {
        if(tateti[0][i] == tateti[1][i] && tateti[0][i] == tateti[2][i] && tateti[0][i] != '') return true;
    }
    //Revisar diagonales
    if(tateti[1][1] != '')
    {
        if(tateti[1][1] == tateti[0][0] && tateti[1][1] == tateti[2][2]) return true;
        else if(tateti[1][1] == tateti[0][2] && tateti[1][1] == tateti[2][0]) return true;
    }

    //Si no hay una combinacion ganadora se devuelve false
    return false;
}

//Seccion del algoritmo

//Se determinan 2 valores para evitar que la IA caiga en trampas al inicio de la partida
let inicioPotente = false;
let esquinas = 0;
function turnoPc()
{
    let pos = null;
    pos = inicioIA(); //1- Si el jugador arranco primero
    if(inicioPotente && turnos == 4) pos = inicioPot(); //1.5- En caso de que el jugador haya hecho una jugada peligrosa
    if(pos == null) pos = revisarMovGanador(j2); //2- Ver si puede ganar
    if(pos == null) pos = revisarMovGanador(j1);//3- Ver si puede bloquear
    if(pos == null) pos = elegirEsquina(); //4- Elegir una esquina
    if(pos == null) //5- Elegir el centro
    {
        if(tateti[1][1] == '') pos = [1, 1];
    }
    if(pos == null) pos = elegirRestante(); //6- Elegir lo que quede
    if(pos != null)
    {
        agregar(true, pos[0], pos[1]); //Se agrega el valor correspondiente al tateti
    }
}

//Revisa si el jugador arranco primero
function inicioIA()
{
    let n=0;
    //Revisa quien arranca primero
    for(let i=0; i<3; i++)
    {
        for(let j=0; j<3; j++)
        {
            if(tateti[i][j] != '')
            {
                n++;
            }
        }
    }
    //En caso de que el jugador haya colado su pieza en una esquina
    if(n==1 && tateti[1][1] == '' && (tateti[0][0] != '' || tateti[0][2] != '' || tateti[2][0] != '' || tateti[0][0] != ''))
    {
        //Ocupa el centro
        let c = [1, 1];
        inicioPotente = true;
        return c;
    }
    //En caso de que el jugador no haya arrancado primero
    return null;
}

//Si el jugador esta tratando de hacer una trampa a la IA
function inicioPot()
{
    //Revisa si el jugador esta tratando de ocupar una esquina correspondiente a la anterior
    if((tateti[2][2] == tateti[0][0] && tateti[2][2] != '') || (tateti[0][2] == tateti[2][0] && tateti[0][2] != ''))
    {
        let pos = [1, 2];//Y hace una jugada para contrarrestar 
        return pos;
    }
    return null;
}

//La IA revisa si hay algun movimiento ganador que pueda hacer algun jugador
//Dependiendo de que jugador es ganara la IA o bloqueara al jugador
function revisarMovGanador(jugador)
{
    for(let i=0; i<3; i++) //Revisa las filas
    {
        let j;
        let n=0;
        for(j=0; j<3; j++)
        {
            if(tateti[i][j] == jugador) n++;
        }
        if(j==3 && n==2)
        {
            for(let k=0; k<3; k++)
            {
                if(tateti[i][k] == '')
                {
                    let pos = [i, k];
                    return pos; //Si encontro algo devuelve la posicion
                }
            }
        }
    }
    for(let i=0; i<3; i++) //Revisa las filas
    {
        let j;
        let n=0;
        for(j=0; j<3; j++)
        {
            if(tateti[j][i] == jugador) n++;
        }
        if(j==3 && n==2)
        {
            for(let k=0; k<3; k++)
            {
                if(tateti[k][i] == '')
                {
                    let pos = [k, i];
                    return pos; //Devuelve la posicion si encontro algo
                }
            }
        }
    }
    if(tateti[1][1] == '') //Revisa las esquinas
    {
        if((tateti[2][2] == tateti[0][0] && tateti[2][2] != '') || (tateti[0][2] == tateti[2][0] && tateti[0][2] != ''))
        {
            let pos = [1, 1];
            return pos; //Devuelve la posicion si encontro algo
        }
    }
    return null; //Si no encontro nada devuelve null
}

function elegirEsquina()
{
    //Elige una esquina si es que no eligio demaciadas
    if(esquinas > 1) return null;
    let pos = null;
    if(tateti[0][0] == '') pos = [0, 0];
    if(tateti[0][2] == '') pos = [0, 2];
    if(tateti[2][0] == '') pos = [2, 0];
    if(tateti[2][2] == '') pos = [2, 2];

    if(pos != null) esquinas++;
    return pos;
}

//Busca la primer posicion vacia
function elegirRestante()
{
    for(let i=0; i<3; i++)
    {
        for(let j=0; j<3; j++)
        {
            if(tateti[i][j] == '')
            {
                let n = [i,j];
                return n;
            }
        }
    }
    return null;
}