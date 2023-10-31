const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const cors = require('cors');


const app = express();
app.use(express.json());

app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "123456",
    database: "login"
});

app.post('/', (req, res) =>{
    const sql = 'SELECT * FROM login_table WHERE Usuario = ? AND Contraseña = ?';
    
    db.query(sql, [req.body.email, req.body.password], (err, data) =>{
        if(err) return res.json("Error de conexión de la BD");
        if(data.length > 0) {
            return res.json("Logueo exitoso")
        }
        else {
            return res.json("Error en usuario y/o contraseña")
        }
        
    })
})

app.listen(3000, () =>{console.log('Server listening port ', 3000);
});
