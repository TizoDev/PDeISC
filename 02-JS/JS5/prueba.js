import { alfajor } from './clasesPrueba.js';

//Se crea la variable alfa y se prueba la clase alfajor
let alfa = new alfajor('Alfajor Negro', 'Guaymallen', '200kg', 10);
console.log(alfa.precio);
alfa.precio = 15;
console.log(alfa.precio);
