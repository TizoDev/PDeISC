let tateti = [['', '', ''], ['', '', ''], ['', '', '']];
let j1 = 'X';
let j2 = 'O';
let turno = false; //False = Jugador1, True = Jugador2
let vsPc = false;
let gano = false;

function agregar(n, c, f)
{
    if(turno == n && tateti[f][c] == '' && !gano)
    {
        let jugador;
        if(!n) jugador = j1;
        else jugador = j2;

        tateti[f][c] = jugador;
        document.getElementById(c + '-' + f).innerHTML = jugador;

        gano = revisar()
        if(!gano)siguienteTurno();
        else document.getElementById('texto').innerHTML = '<h1>Ganador: ' + jugador + '</h1>';
    }
}

function siguienteTurno()
{
    turno = !turno;
    if(!turno) document.getElementById('turno').innerHTML = 'Turno de: Jugador 1';
    else if(!vsPc) document.getElementById('turno').innerHTML = 'Turno de: Jugador 2';
    else document.getElementById('turno').innerHTML = 'Turno de: Pc';
    //if(vsPc && turno) turnoPc();
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
    //Revisar Diagonales
    if(tateti[1][1] != '')
    {
        if(tateti[1][1] == tateti[0][0] && tateti[1][1] == tateti[2][2]) return true;
        else if(tateti[1][1] == tateti[0][2] && tateti[1][1] == tateti[2][0]) return true;
    }

    return false;
}

function turnoPc()
{
    agregar(true, 0, 0);
}