document.getElementById('boton').addEventListener('click', buscar);
document.addEventListener('keydown', teclas);

function teclas(event)
{
    if(event.keyCode === 13) //ENTER
    {
        buscar();
    }
}

function buscar()
{
    let busqueda = document.getElementById('busqueda').value;
    let ruta = 'https://jsonplaceholder.typicode.com/users?authuser=0';
    fetch('/obtenerData',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ruta })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('resultados').innerHTML = '';
        data.map(persona =>
        {
            if(persona.name.toLowerCase().includes(busqueda.toLowerCase()))
            {
                document.getElementById('resultados').innerHTML += `<li> ${persona.name}</li>`;
            }
        });
    });
}