let ruta = 'http://127.0.0.1:8081/api/usuarios';
fetch('/obtenerData',{
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ruta })
})
.then(response => response.json())
.then(data => {
   data.map(persona =>
   {
        document.getElementById('cuerpo').innerHTML += `<li>${persona.id}:  ${persona.name}, ${persona.email}</li>`;
   });
});