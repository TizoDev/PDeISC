document.getElementById('formString').addEventListener('submit', mensajeSecreto);
//Se agregan los eventos de submit a los formularios

function mensajeSecreto(event)
{
    event.preventDefault(); //Se previene que reinicie la pagina al dar click en el boton
    
    //Se crean variables para almacenar los valores
    let l = document.getElementById('string').value;

    let valido = true; //Se revisa si el formulario es valido, comprobando que los campos tengan algun valor
    if(l == '')
    {
        document.getElementById('stringText').innerHTML = "Rellenar todos los campos";
        valido = false; //En caso de que el formulario no sea valido
    }
    if(valido) //En caso de que todo este como corresponda
    {
        //Se crean 3 arrays
        let s = []; //Para guardar el string original
        let pos = []; //Para guardar las posiciones de los parentesis
        let final = []; //Para mostrar el mensaje final
        for(let i=0; i<l.length; i++) s.push(l[i]); //Se guardan los valores del string en el array
        for(let i=0; i<s.length; i++)
        {
            if(s[i] == '(') pos.push(i); //Se guarda el valor cuando encuentra un inicio de parentesis
            else if(s[i] == ')')
            {
                pos.push(i); //Se guarda la posicion del cierre de parentesis
                let p = s.slice(pos[0]+1, pos[1]); //Se corta el mensaje entre los parentesis
                p.reverse(); //Se invierte el mensaje entre los parentesis
                for(let k=0; k<p.length; k++) final.push(p[k]); //Agrega el mensaje al array final
                while(pos.length > 0) pos.pop(); //Vacia el array de posiciones
            }
            else if(pos.length == 0) final.push(s[i]); //Si no esta dentro de un mensaje se agrega el texto normalmente
        }

        document.getElementById('stringText').innerHTML = ''; //Se vacia la etiqueta p para mostrar los valores
        final.forEach(element => { //Se muestran los valores en el documento
            document.getElementById('stringText').innerHTML += element; 
        });
    }
}