document.getElementById('formString').addEventListener('submit', mensajeSecreto);

function mensajeSecreto(event)
{
    event.preventDefault();
    
    let l = document.getElementById('string').value;

    let valido = true;
    if(l == '')
    {
        document.getElementById('stringText').innerHTML = "Rellenar todos los campos";
        valido = false;
    }
    if(valido)
    {
        let s = [];
        let pos = [];
        let final = [];
        for(let i=0; i<l.length; i++) s.push(l[i]);
        for(let i=0; i<s.length; i++)
        {
            if(s[i] == '(') pos.push(i);
            else if(s[i] == ')')
            {
                pos.push(i);
                let p = s.slice(pos[0]+1, pos[1]);
                p.reverse();
                for(let k=0; k<p.length; k++) final.push(p[k]);
                while(pos.length > 0) pos.pop();
            }
            else if(pos.length == 0) final.push(s[i]);
        }

        document.getElementById('stringText').innerHTML = '';
        final.forEach(element => {
            document.getElementById('stringText').innerHTML += element; 
        });
    }
}