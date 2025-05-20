document.addEventListener('keydown', reiniciar);

let tateti = [['', '', ''], ['', '', ''], ['', '', '']];
let j1 = 'X';
let j2 = 'O';
let turno = false; //False = Jugador1, True = Jugador2
let vsPc = false;
let gano = false;
let turnos = 0;

function IniciarJuego()
{
    document.getElementById('tateti').style.display = 'block';
    document.getElementById('checks').style.display = 'none';
    document.getElementById('boton').style.display = 'none';
    document.getElementById('turno').style.display = 'block';

    let n = Math.floor(Math.random() * 2);
    if(n == 0) turno = false;
    else turno = true;

    turnos = 0;

    if(document.querySelector('input[name="vs"]:checked').value == 'true') vsPc = true;
    else vsPc = false;

    inicioPotente = false;
    esquinas = 0;
    siguienteTurno(false);
}

function reiniciar(event)
{
    if(event.keyCode === 13) //Enter
    {
        document.getElementById('tateti').style.display = 'none';
        document.getElementById('checks').style.display = 'block';
        document.getElementById('boton').style.display = 'block';
        document.getElementById('turno').style.display = 'none';
        tateti = [['', '', ''], ['', '', ''], ['', '', '']];
        dibujar();
        vsPc = false;
        gano = false;
    }
}

function agregar(n, f, c)
{
    if(turno == n && tateti[f][c] == '' && !gano)
    {
        let jugador;
        if(!n) jugador = j1;
        else jugador = j2;

        tateti[f][c] = jugador;
        let p = dibujar();

        gano = revisar()
        if(!gano)
        {
            if(p < 9) siguienteTurno(true);
            else
            {
                document.getElementById('texto').innerHTML = '<h1>Empate</h1>';
            }
        }
        else document.getElementById('texto').innerHTML = '<h1>Ganador: ' + jugador + '</h1>';
    }
}

function dibujar()
{
    let n=0;
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
    if(cam) turno = !turno;

    turnos++;
    if(!turno) document.getElementById('turno').innerHTML = 'Turno de: Jugador 1';
    else if(!vsPc) document.getElementById('turno').innerHTML = 'Turno de: Jugador 2';
    else
    {
        document.getElementById('turno').innerHTML = 'Turno de: Pc';
        turnoPc();
    }
}

function revisar()
{
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

    return false;
}

//Seccion de la IA

let inicioPotente = false;
let esquinas = 0;
function turnoPc()
{
    let pos = null;
    pos = inicioIA(); //0- Si el jugador arranco primero
    if(inicioPotente && turnos == 4) pos = inicioPot();
    if(pos == null) pos = revisarMovGanador(j2); //1- Ver si puede ganar
    if(pos == null) pos = revisarMovGanador(j1);//2- Ver si puede bloquear
    if(pos == null) pos = elegirEsquina(); //3- Elegir una esquina
    if(pos == null) //4- Elegir el centro
    {
        if(tateti[1][1] == '') pos = [1, 1];
    }
    if(pos == null) pos = elegirRestante(); //5- Elegir lo que quede
    if(pos != null)
    {
        agregar(true, pos[0], pos[1]);
    }
}

function inicioIA()
{
    let n=0;
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
    if(n==1 && tateti[1][1] == '' && (tateti[0][0] != '' || tateti[0][2] != '' || tateti[2][0] != '' || tateti[0][0] != ''))
    {
        let c = [1, 1];
        inicioPotente = true;
        return c;
    }
    return null;
}

function inicioPot()
{
    if((tateti[2][2] == tateti[0][0] && tateti[2][2] != '') || (tateti[0][2] == tateti[2][0] && tateti[0][2] != ''))
    {
        let pos = [1, 2];
        return pos;
    }
    return null;
}

function revisarMovGanador(jugador)
{
    for(let i=0; i<3; i++)
    {
        let j;
        let n=0;
        for(j=0; j<3; j++)
        {
            //if(tateti[i][j] != '' && tateti[i][j] != jugador) break;
            if(tateti[i][j] == jugador) n++;
        }
        if(j==3 && n==2)
        {
            for(let k=0; k<3; k++)
            {
                if(tateti[i][k] == '')
                {
                    let pos = [i, k];
                    return pos;
                }
            }
        }
    }
    for(let i=0; i<3; i++)
    {
        let j;
        let n=0;
        for(j=0; j<3; j++)
        {
            //if(tateti[i][j] != '' && tateti[i][j] != jugador) break;
            if(tateti[j][i] == jugador) n++;
        }
        if(j==3 && n==2)
        {
            for(let k=0; k<3; k++)
            {
                if(tateti[k][i] == '')
                {
                    let pos = [k, i];
                    return pos;
                }
            }
        }
    }
    if(tateti[1][1] == '')
    {
        if((tateti[2][2] == tateti[0][0] && tateti[2][2] != '') || (tateti[0][2] == tateti[2][0] && tateti[0][2] != ''))
        {
            let pos = [1, 1];
            return pos;
        }
    }
    return null;
}

function elegirEsquina()
{
    if(esquinas > 1) return null;
    let pos = null;
    if(tateti[0][0] == '') pos = [0, 0];
    if(tateti[0][2] == '') pos = [0, 2];
    if(tateti[2][0] == '') pos = [2, 0];
    if(tateti[2][2] == '') pos = [2, 2];

    if(pos != null) esquinas++;
    return pos;
}

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