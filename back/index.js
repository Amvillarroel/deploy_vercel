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
        origin: ["https://deploy-vercel-frontend-nine.vercel.app"],
        methods: ["POST", "GET"],
        credentials: true
    }
));

mongoose.connect("mongodb+srv://amvillarroel:amnel123@cluster0.er2efnj.mongodb.net/LOGIN?retryWrites=true&w=majority", {useNewUrlParser: true})

//se crea el schema de la BD
const usersSchema = {
    usuario: String,
    clave: String,
}

//se crea el modelo de la BD
const usersModel = mongoose.model("users", usersSchema)

//Crear un usuario y contraseña
/*const user = new usersModel({
    usuario:'carlos@correo.com',
    clave:'123456789'
})

user.save();*/

app.get('/', (req, res)=>{
    res.send("hello word")
})

app.get('/login', (req, res) => {
    const { email, password } = req.query; // Obtener datos de la consulta

    usersModel.find({ usuario: email, clave: password }).then((users) => {
        if (users.length > 0) {
            const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '30m' });
            res.status(200).json({ token });
        } else {
            res.status(401).json({ message: 'Credenciales incorrectas' });
        }
    }).catch(error => {
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
