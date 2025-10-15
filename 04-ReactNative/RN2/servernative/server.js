//Imports
import bcrypt from 'bcrypt';
import cors from 'cors';
import express from 'express';
import fs from 'fs';
import { OAuth2Client } from 'google-auth-library';
import multer from 'multer';
import path from 'path';
import { connectBD } from './conectbd.js';

const client = new OAuth2Client(["204903815937-mphcir1er2shc5125248ffvanr66r8dr.apps.googleusercontent.com", "04903815937-3lf0nukl1hg9t1pj3f819bjl9c5r5coi.apps.googleusercontent.com"]);

const app = express();
const port = 3031; //Puerto asignado
const uploadPath = path.join(process.cwd(), 'uploads');

if(!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);

app.use(cors()); //Se utiliza Cors para que se puedan hacer llamados a la API desde el LocalHost
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9) + ext;
        cb(null, uniqueName);
    },
});

const upload = multer({ storage });

//Funciones para la BD
async function getUsuario(mail, password)
{
    let db;
    try
    {
        db = await connectBD();
        if(!db) return;
        const sql = 'SELECT * FROM usuarios WHERE mail=?';
        const [result] = await db.execute(sql, [mail]);

        if(result.length != 0)
        {
            const match = await bcrypt.compare(password, result[0].password);
            if(match) return result;
        }
        return result;
    } catch(error)
    {
        console.error(error);
    }
};

async function getAllUsers()
{
    let db;
    try
    {
        db = await connectBD();
        if(!db) return;
        const sql = 'SELECT nombre, mail, telefono, direccion, foto FROM usuarios';
        const [result] = await db.execute(sql);
        return result;
    } catch(error)
    {
        console.error(error);
    }
}

async function getData(mail)
{
    let db;
    try
    {
        db = await connectBD();
        if(!db) return;
        const sql = 'SELECT nombre, mail, telefono, direccion, foto, isGoogleUser FROM usuarios WHERE mail=?';
        const [result] = await db.execute(sql, [mail]);
        return result;
    } catch(error)
    {
        console.error(error);
    }
};

//Permite insertar un nuevo usuario
async function insertInto(nombre, password, mail, telefono, direccion, foto) 
{
    let db;
    try
    {
        db = await connectBD();
        if(!db) return;

        const [re2] = await db.execute("SELECT * FROM usuarios WHERE mail=?", [mail]);
        if(re2.length != 0) return 2;
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = 'INSERT INTO usuarios (nombre, password, mail, telefono, direccion, foto) VALUES (?, ?, ?, ?, ?, ?)';
        const [result] = await db.execute(sql, [nombre, hashedPassword, mail, telefono, direccion, foto]);
        console.log(result.affectedRows);
        return 0;
    } catch(error)
    {
        console.error(error);
    }
};

async function editInto(nombre, password, mail, telefono, direccion, foto, oldmail, oldpassword, isGoogleUser) 
{
    let db;
    try
    {
        db = await connectBD();
        if(!db) return 5;

        if(!isGoogleUser)
        {
            const [re2] = await db.execute("SELECT * FROM usuarios WHERE mail=? AND mail<>?", [mail, oldmail]);
            if(re2.length != 0) return 2;
            let sql = 'SELECT * FROM usuarios WHERE mail=?';
            let [result] = await db.execute(sql, [oldmail]);
            if(result.length != 0)
            {
                console.log(oldpassword, result[0].password)
                const match = await bcrypt.compare(oldpassword, result[0].password);
                if(!match) return 3;
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            sql = 'UPDATE usuarios SET nombre=?, password=?, mail=?, telefono=?, direccion=?, foto=? WHERE mail=?';
            [result] = await db.execute(sql, [nombre, hashedPassword, mail, telefono, direccion, foto, oldmail]);
            console.log(result.affectedRows);
            return 0;
        }
        else
        {
            const sql = 'UPDATE usuarios SET nombre=?, telefono=?, direccion=?, foto=? WHERE mail=?';
            const [result] = await db.execute(sql, [nombre, telefono, direccion, foto, oldmail]);
            console.log(result.affectedRows);
            return 0;
        }
    } catch(error)
    {
        console.error(error);
    }
};

app.post('/googleLogin', express.json(), async (req, res) => {
    const { idToken, accessToken } = req.body;
    try 
    {
        let email, name, picture;
  
        if(idToken) 
        {
            const ticket = await client.verifyIdToken({
                idToken,
                audience: ["204903815937-mphcir1er2shc5125248ffvanr66r8dr.apps.googleusercontent.com", "04903815937-3lf0nukl1hg9t1pj3f819bjl9c5r5coi.apps.googleusercontent.com"],
            });
            const payload = ticket.getPayload();
            email = payload.email;
            name = payload.name;
            picture = payload.picture;
        } 
        else if(accessToken) 
        {
            const userInfoRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            const userInfo = await userInfoRes.json();
            email = userInfo.email;
            name = userInfo.name;
            picture = userInfo.picture;
        } 
        else 
        {
            return res.json({ success: false, message: 'Token faltante' });
        }
  
        const db = await connectBD();
        const [existing] = await db.execute('SELECT * FROM usuarios WHERE mail=?', [email]);
  
        let localImagePath = '';
  
        if(existing.length === 0) 
        {
            if(picture) 
            {
                const response = await fetch(picture);
                const buffer = await response.arrayBuffer();
                const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}.jpg`;
                const imagePath = path.join(uploadPath, filename);
  
                fs.writeFileSync(imagePath, Buffer.from(buffer));
                console.log(`Imagen de Google guardada en ${imagePath}`);
  
                localImagePath = `./uploads/${filename}`;
            }
  
            const sql = 'INSERT INTO usuarios (nombre, password, mail, telefono, direccion, foto, isGoogleUser) VALUES (?, ?, ?, ?, ?, ?, ?)';
            await db.execute(sql, [name, '', email, '', '', localImagePath, true]);
            console.log(`Usuario Google creado: ${email}`);
        } 
        else 
        {
            console.log(`Usuario Google ya existe: ${email}`);
        }
        res.json({ success: true, mail: email });
    } 
    catch (error) 
    {
      console.error('Error en Google Login:', error);
      res.json({ success: false, error: error.message });
    }
});
  

app.post('/editUsuario', upload.single('image'), async function(req,res){
    const { nombre, password, mail, telefono, direccion, image, oldmail, oldpassword, isGoogleUser } = req.body; //Valores del usuario
    const google = isGoogleUser == 'true';
    const base64Data = image.replace(/^data:image\/(png|jpeg|jpg|gif);base64,/, '');
    const imageBuffer = Buffer.from(base64Data, 'base64');
    const imag = './uploads/' + Date.now() + '.jpg';
    fs.writeFile(imag, imageBuffer, (err) => {
        if (err) {
            console.error('Error saving image:', err);
        } else {
            console.log(`Image saved successfully to ${imag}`);
        }
    });
    await editInto(nombre, password, mail, telefono, direccion, imag, oldmail, oldpassword, google)
    .then(async result => {
        console.log(result);
        res.json(result);
    })
    .catch(err => res.status(500).send(err));
});

//Metodos para que el usuario pueda interactuar con la base de datos
app.post('/addUsuario', upload.single('image'), async function(req,res){
    const { nombre, password, mail, telefono, direccion, image } = req.body; //Valores del usuario
    const base64Data = image.replace(/^data:image\/(png|jpeg|jpg|gif);base64,/, '');
    const imageBuffer = Buffer.from(base64Data, 'base64');
    const imag = './uploads/' + Date.now() + '.jpg';
    fs.writeFile(imag, imageBuffer, (err) => {
        if (err) {
            console.error('Error saving image:', err);
        } else {
            console.log(`Image saved successfully to ${imag}`);
        }
    });
    await insertInto(nombre, password, mail, telefono, direccion, imag)
    .then(async result => {
        res.json(result);
    })
    .catch(err => res.status(500).send(err));
});

//Metodos para que el usuario pueda interactuar con la base de datos
app.post('/getUsuario', express.json(), async function(req,res){
    const { mail, password } = req.body; //Valores del usuario
    await getUsuario(mail, password)
    .then(async result => {
        if(result.length < 1) res.json(0);
        else res.json(1);
    })
    .catch(err => res.status(500).send(err));
});

app.post('/getData', express.json(), async function(req,res){
    const { mail } = req.body; //Valores del usuario
    await getData(mail)
    .then(async result => {
        res.json(result);
    })
    .catch(err => res.status(500).send(err));
});

app.get('/getUsuarios', async (req, res) => {
    let usu = await getAllUsers();
    res.json(usu);
});

//Iniciando el servidor
app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});