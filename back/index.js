require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const app = express();
const port = process.env.PORT || 3000
app.use(express.json());
app.use(cors(
    {
        origin: [process.env.CORS_FRONT],
        methods: ["POST", "GET"],
        credentials: true
    }
));

mongoose.connect(process.env.URL_DB, {useNewUrlParser: true})

//se crea el schema de la BD
const usersSchema = {
    usuario: {type: String, unique: true},
    clave: String,
    url_avatar: String,
}

//se crea el modelo de la BD
const usersModel = mongoose.model("users", usersSchema)

//Crear un usuario y contraseña
app.get('/register', async (req, res) => {
    const { email, password, avatar } = req.query;
    if(email!="" || password != "" || avatar != ""){
    try {
        const newUser = new usersModel({ usuario: email, clave: password, url_avatar: avatar});
        await newUser.save();
        res.status(200).json({ success: true });
    } catch (error) {
        if (error.code === 11000) {
            // Código 11000 indica un error de duplicación (clave única)
            res.status(500).json({ message: 'El usuario ya existe en la BD' });
        } else {
            console.error(error);
            res.status(500).json({ error: true });
        }
    }}
});


    /*const user = new usersModel({ usuario:{ email }, clave:{ password }})
    .then(user.save())
    .cath(error => {
        console.error(error);
        res.status(500).json({ error: 'Error al crear el usuarios' });
    })*/

app.get('/', (req, res)=>{
    const htmlResponse = `
    <html>
        <head>
            <title>
            Node JS y Express en Vercel
            </title>
        </head>
        <body>
        <h1>Soy un proyecto de back en Vercel</h1>
        </body>
    </html>  
    `;
    res.send(htmlResponse)
})

app.get('/login', (req, res) => {
    const { email, password } = req.query; // Obtener datos de la consulta

    usersModel.find({ usuario: email, clave: password })
    .then((users) => {
        if (users.length > 0) {
            const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '30m' });
            const userAvatar = users[0].url_avatar;
            res.status(200).json({ token, userAvatar });
        } else {
            res.status(401).json({ message: 'Credenciales incorrectas' });
        }
    })
    .catch(error => {
        console.error(error);
        res.status(500).json({ error: 'Error al buscar usuarios' });
    });
});

app.post('/islogged', (req, res) => {
    const token = req.body.localStorageToken
    //Si no hay token en el local storage devuelve acceso no autorizado
    if (!token) {
        return res.status(401).json({ message: 'Acceso no autorizado, token no proporcionado' });
      }
    
    //en caso de haber token en el local storage se procede a verificar la integrodad del mismo
    try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    return res.status(200).json({ success: true });
    }
    //mensaje en caso de que después de verificar el token se determine que este es inválido
    catch (error) {
    if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token expirado' });
    }
    return res.status(401).json({ message: 'Token no válido' });
    }

});

app.get('/favicon.ico', (req, res) => res.status(204));//para controlar error en petición get de favicon 
                                                        //que envía la consulta de la base de datos
app.listen(port, () =>{console.log('Server listening port ', port);
});
