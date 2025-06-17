//Se agregan los eventos a los botones
document.getElementById('botonenviar').addEventListener('click', enviarDatos);
document.getElementById('actualizar').addEventListener('click', actualizar);

//Envia los datos de los input al servidor
function enviarDatos()
{
    esconderError();
    //Obtiene los valores de los input y los comprueba
    let nombre = document.getElementById('inputnombre').value;
    let jaula = document.getElementById('inputjaula').value;
    let tipo = document.getElementById('inputanimal').value;
    let peso = document.getElementById('inputpeso').value;
    let valido = true;
    if(nombre == '' || jaula == '' || tipo == '' || peso == '')
    {
        //En caso de que sean invalidos
        valido = false;
        cargarError('Campos Incompletos, porfavor llenar todos los campos');
    }
    if(verificarText(nombre))
    {
        valido = false;
        cargarError('Error en primer campo (Nombre), caracteres invalidos detectados (caractes invalidos, numeros, etc');
    }
    if(valido)
    {
        //Si todos los campos son validos se comunica con el servidor mediante fetch
        fetch('/guardarAnimal', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, jaula, tipo, peso }) //Envia los valores
        });
    }

    //Se actualizan los datos
    actualizar();
}

function actualizar()
{
    //Reinicia la tabla
    document.getElementById('tablaAnimal').innerHTML = '<tr><td><b>Id</b></td><td><b>Nombre</b></td><td><b>Jaula</b></td><td><b>Tipo</b></td><td><b>Peso</b></td></tr>';
    //Se comunica con el servidor y obtiene los datos de los animales
    fetch('/obtenerInfo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.text())
    .then(data => {
        //Crea las variables para analizar la informacion recibida
        let array = [];
        let linea = '';
        let cant1 = 0;
        let cant2 = 0;
        let nombresJaula4 = [];
        for(let i=0; i<data.length; i++) //Se separan las lineas con informacion
        {
            if(data[i] != '\n' && data[i] != '') linea += data[i];
            else
            {
                array.push(linea);
                linea = '';
            }
        }
        for(let j=0; j<array.length; j++)
        {
            //Se obtienen los datos de cada linea
            let id;
            let nombre;
            let jaula;
            let tipo;
            let peso;
            let pos = 0;
            let n = '';
            for(let i=0; i<array[j].length; i++)
            {
                //Se guardan los valores correspondientes de la linea
                if(array[j][i] == '{')
                {
                    id = n;
                    n = '';
                }
                else if(array[j][i] == ',' || array[j][i] == '}')
                {
                    if(pos == 0) nombre = n;
                    if(pos == 1) jaula = n;
                    if(pos == 2) tipo = n;
                    if(pos == 3) peso = n;
                    n = '';
                    pos++;
                }
                else n+=array[j][i];
            }
            //Se agregan los valores a la tabla y al apartado de informacion extra
            let tabla = '<tr><td>' + id +'</td>'
            tabla += '<td>' + nombre + '</td>';
            tabla += '<td>' + jaula + '</td>';
            tabla += '<td>' + tipo + '</td>';
            tabla += '<td>' + peso + '</td></tr>';

            if(jaula == 5 && parseInt(peso) < 3) cant1++;
            if(jaula >= 2 && jaula <= 5 && tipo == ' Felino') cant2++;
            if(jaula == 4 && parseInt(peso) < 120) nombresJaula4.push(nombre);
            
            document.getElementById('tablaAnimal').innerHTML += tabla;
            
        }
        //Se imprime toda la informacion extra sobre los animales
        document.getElementById('consignab').innerHTML = '<p><b>cantidad de animales de la Jaula 5 cuyo peso es menor a 3 kg: </b>' + cant1 + '</p>'; 
        document.getElementById('consignac').innerHTML = '<p><b>cantidad de animales de tipo felinos que están entre las jaulas 2 a 5: </b>' + cant2 + '</p>';
        document.getElementById('consignad').innerHTML = '<p><b>animal de la Jaula 4 cuyo peso es menor a 120: </b></p>';
        nombresJaula4.forEach(element => {
                document.getElementById('consignad').innerHTML += '<p style="margin-top:-5px">-' + element + '<p>';
        });
    })
    .catch(error => console.error('Error al obtener los datos:', error));
}

function cargarError(error)
{
    //Cambia la visibilidad de la parte de errores y muestra el error actual
    document.getElementById('error').innerHTML = '<p>' + error + '</p>'; 
    document.getElementById('error').style.display = 'block';
}

function esconderError()
{
    //Cambia la visibilidad de la seccion de errores
    document.getElementById('error').style.display = 'none';
}

function verificarText(s)
{
    //Revisa cada caracter para asegurarse que entre en el estandar
    //En caso de no estar en el estandar devuelve true
    for(let i=0; i<s.length; i++)
    {
        if(!/[a-zA-Z]/.test(s[i]) && s[i] !== 'ñ' && s[i] !== ' ') return true;
    }
    return false;
}