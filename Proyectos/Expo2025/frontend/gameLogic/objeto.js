export class objeto
{
    constructor(width, height, x, y, color, direction)
    {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.color = color;
        this.destroyed = false;
        this.direction = direction;
    }

    update()
    {
        this.rotation = Math.atan2(this.direction[1], this.direction[0]);

        return {
            x:this.x, 
            y:this.y, 
            width:this.width, 
            height:this.height,
            rotation: this.rotation
        };
    }

    drawStatic(x, y, ctx)
    {
        ctx.fillStyle = this.color;
        ctx.fillRect(x, y, this.width, this.height);
    }

    move(newx, newy)
    {
        this.x += newx;
        this.y += newy;
    }

    colisiona(otherobj) 
    {
        let myleft = this.x;
        let myright = this.x + (this.width);
        let mytop = this.y;
        let mybottom = this.y + (this.height);
        let otherleft = otherobj.x;
        let otherright = otherobj.x + (otherobj.width);
        let othertop = otherobj.y;
        let otherbottom = otherobj.y + (otherobj.height);

        let colisiona = true;
        if((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            colisiona = false;
        }
        if(colisiona) this.onCollision();
        return colisiona;
    }
    
    onCollision(){}
}

export class proyectil extends objeto
{
    constructor(width, height, x, y, color, player, id, direction, creacion)
    {
        super(width, height, x, y, color);
        this.player = player;
        this.id = id;
        this.direction = direction;
        this.creacion = creacion;
        this.rotation = 0;
    }
}

export class nave extends objeto
{
    constructor(width, height, x, y, urls)
    {
        super(width, height, x, y, "white");

        this.imgActual = 0;
        this.imagenes = [];

        for(let i=0; i<urls.length; i++)
        {
            this.imagenes.push(new Image());
            this.imagenes[i].src = urls[i];
            this.imagenes[i].onload = () => {
                this.imgLoaded = true;
            };
        }
    }

    onCollision()
    {
        
    }

    updateAnimation()
    {
        if(this.imgActual < this.imagenes.length-1) this.imgActual++;
        else this.imgActual = 0;
    }

    update(ctx)
    {
        if(this.imgLoaded == true) ctx.drawImage(this.imagenes[this.imgActual], this.x, this.y, this.width, this.height);
    }

    drawStatic(x, y, ctx)
    {
        if(this.imgLoaded == true)ctx.drawImage(this.imagenes[this.imgActual], x, y, this.width, this.height);
    }
}