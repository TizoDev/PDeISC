let ruta = 'https://jsonplaceholder.typicode.com/users?authuser=0'; //Ruta de Api publica
//let ruta = 'http://127.0.0.1:8081/api/usuarios'; //Ruta de Api privada

//Se utiliza fetch para comunicarse con el servidor y solicitar la ruta asignada
fetch('/obtenerData',{
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ruta })
})
.then(response => response.json()) //Se convierte la respuesta a .json
.then(data => {
   data.map(persona => //Se mapea el .json y se imprimen los valores por pantalla
   {
        document.getElementById('cuerpo').innerHTML += `<li> ${persona.name}, ${persona.email}</li>`;
   });
});