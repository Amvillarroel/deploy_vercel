const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const cors = require('cors');
const jwt = require('jsonwebtoken');
//const dbConnection = require('./database')
const PORT =require('./config')

require('dotenv').config();

const app = express();
app.use(express.json());

app.use(cors());

const dbConnection = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});


app.post('/login', (req, res) =>{
    const sql = 'SELECT * FROM login_table WHERE Usuario = ? AND Contraseña = ?';
    
    dbConnection.query(sql, [req.body.email, req.body.password], (err, data) =>{
        if(err)  return res.json("Error de conexión de la BD");
        if(data.length > 0) {
            // Las credenciales son correctas, generamos un token JWT
            const token = jwt.sign({ email: req.body.email }, process.env.JWT_SECRET, { expiresIn: '30m' });
            return res.status(200).json({ token });
        }
        else {
            return res.json("Error en usuario y/o contraseña desde el back");
        }
    })
})

//Verificar si el token en el local storage es válido para mantener la sesión
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

app.listen(PORT, () =>{console.log('Server listening port ', PORT);
});
