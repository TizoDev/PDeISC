//Se agregan los eventos a los botones
document.getElementById('cargar').addEventListener('click', enviarArchivo);
document.getElementById('ingresar').addEventListener('click', ingresarNumero);

let array = [];

function ingresarNumero()
{
    let numero = document.getElementById('input').value;
    let valido = true; //Se revisa si el formulario es valido, comprobando que los campos tengan algun valor
    
    if(numero == '')
    {
        cargarError('Rellenar el campo correctamente');
        valido = false; //En caso de que el formulario no sea valido
    }
    if(array.length == 20)
    {
        cargarError('Limite de Numeros alcanzado');
        valido = false; //En caso de que el formulario no sea valido
    }
    if(valido) //En caso de que todo este como corresponda
    {
        esconderError();
        array.push(numero); //Se agregan el valor al final del array con push()
        document.getElementById('numeros').innerHTML = '';
        array.forEach(element => { //Se muestran los valores en el documento
            document.getElementById('numeros').innerHTML += element + ', '; 
        });
    }
}

function enviarArchivo()
{
    esconderError();
    const fileName = 'public/pro1/outputP1.txt'; //Se elige la ruta del archivo
    const data = array.join('\n'); // Convertimos el array a texto con saltos de línea

    if(array.length >= 10) //Si el array tiene mas de 10 numeros
    {
        //Llama al servidor para guardar la informacion en un txt utilizando post y fetch
        fetch('/guardarArchivo', { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fileName, data }) //Envia los valores
        })//Captura los errores o mensajes del servidor
        .then(res => res.json())
        .then(response => cargarError(response.message))
        .catch(err => cargarError('Error al guardar archivo: ' + err.message));
        document.getElementById('descargar').style.display = 'block';
    }
    else
    {
        cargarError('Se debe ingresar al menos 10 numeros');
    }
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