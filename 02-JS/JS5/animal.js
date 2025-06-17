export class CZooAnimal
{
    //Constructor con los datos base del animal
    constructor(id, n, j, idt, p)
    {
        this._IdAnimal = id;
        this.nombre = n;
        this.JaulaNumero = j;
        this.IdTypeAnimal = idt; //1 felinos 2 aves 3 reptiles etc.
        this.peso = p;
    }

    //get id para que solo se pueda leer la variable
    get IdAnimal()
    {
        return this._IdAnimal;
    }

    //metodo para devolver que tipo de animal es en un string
    convertType()
    {
        if(this.IdTypeAnimal == '1')return 'Felino';
        if(this.IdTypeAnimal == '2')return 'Ave';
        if(this.IdTypeAnimal == '3')return 'Reptil';
    }

    //Metodo para convertir los datos a un string para guardar en el txt
    toString()
    {
        return `${this.IdAnimal}{${this.nombre}, ${this.JaulaNumero}, ${this.convertType()}, ${this.peso}} \n`;
    }
};