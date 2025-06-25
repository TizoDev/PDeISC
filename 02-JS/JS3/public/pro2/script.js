document.getElementById('input').addEventListener('change', leerArchivo);
document.getElementById('cargar').addEventListener('click', cargartxt);

//Crea un array para contener los valores del txt y los valores filtrados
let array = [];
let arrayFiltrado = [];

function leerArchivo(e)
{
    esconderError();
    //Lee el texto del input
    const file = e.target.files[0]; 
    const reader = new FileReader();

    reader.onload = (event) => {
        array = [];
        arrayFiltrado = [];
        const numeros = event.target.result;
        let numero = '';
        //Revisa todos los numeros del txt y los agrega en cada salto de linea al array
        for(let i=0; i<numeros.length; i++)
        {
            if(numeros[i] != '\n') numero += numeros[i];
            else
            {
                array.push(numero);
                numero = '';
            }
        }
        array.push(numero);
        
        //Se revisa que numeros cumplen con las condiciones
        array.forEach(element => {
            if(element[0] == element[element.length-1]) arrayFiltrado.push(element);
        });
        
        //Se imprimen los valores en el html
        document.getElementById('numeros').innerHTML = '';
        let porcen = (arrayFiltrado.length * 100) / array.length;
        document.getElementById('porcentaje').innerHTML = 'Porcentaje: ' + porcen + '%';
        arrayFiltrado.forEach(element => {
            document.getElementById('numeros').innerHTML += '<p>' + element + '</p>';
        });
    };
    reader.readAsText(file);
}

function cargartxt()
{
    esconderError();

    const fileName = 'public/pro2/outputP2.txt';  //Se elige la ruta del archivo
    const data = arrayFiltrado.join('\n'); // Convertimos el array a texto con saltos de línea

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