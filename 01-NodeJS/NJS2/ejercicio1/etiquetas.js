/*
Una funcion exportable que al darle un texto, un color y un tamaño de titulo,
devuelve un string con la etiqueta HTML del titulo, de tamaño y color correspondiente
*/
export function crearTitulo(texto, color, titulo)
{
    //Un switch para decidir de que tamaño sera el titulo
    switch (titulo)
    {
        case 1:
            //Devolvemos el string entre cortado con las variables que le queremos agregar
            return '<h1 style="color:' + color + ';" >' + texto + '</h1>';
        case 2:
            return '<h2 style="color:' + color + ';" >' + texto + '</h2>';
        case 3:
            return '<h3 style="color:' + color + ';" >' + texto + '</h3>';
        case 4:
            return '<h4 style="color:' + color + ';" >' + texto + '</h4>';
        case 5:
            return '<h5 style="color:' + color + ';" >' + texto + '</h5>';
        case 6:
            return '<h6 style="color:' + color + ';" >' + texto + '</h6>';
        default: //En caso de que la variable de titulo no contenga ningun valor previo, devolvemos un h1
            return '<h1 style="color:' + color + ';" >' + texto + '</h1>';
    }
}

//Una funcion similar al crear titulo que devuelve un parrafo de HTML con un texto y un color
export function crearParrafo(texto, color)
{
    //Pide como parametros un texto y un color
    //Devuelve la etiqueta ya creada con esas variables
    return '<p style="color:' + color + ';">' + texto + '</p>';
}