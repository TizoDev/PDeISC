export class estudiante
{
    //Constructor con las variables de la clase
    constructor(nombre, apellido, edad)
    {
        this.name = nombre;
        this.ape = apellido;
        this.ed = edad;
    }

    saludar()
    {
        //Emite un console.log con todos los datos del objeto
        console.log(`Hola me llamo ${this.name} ${this.ape}, y tengo ${this.ed} años`);
    }
};

export class alfajor
{
    //Constructor con las variables de la clase
    constructor(nombre, marca, peso, valor)
    {
        this.name = nombre;
        this.marc = marca;
        this.weight = peso;
        this._precio = valor; //Variable privada
    }

    //Getter y setter para el precio
    get precio()
    {
        return this._precio;
    }

    set precio(nuevo)
    {
        //Solo agrega el valor si este es mayor a 0
        if(nuevo > 0) this._precio = nuevo;
        else console.log('Precio Invalido');
    }
};