// server.js

const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Conexión a la base de datos
const db = mysql.createConnection({
  host: 'bgnwbezv162rppz88e7e-mysql.services.clever-cloud.com',
  user: 'usjzyvhsmzwuhjfa',
  password: 'zVJqTkPlVTGLfwARYGfX',
  database: 'bgnwbezv162rppz88e7e'
});

// Middleware para parsear JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para manejar el login
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM Usuario WHERE email = ?';
  db.query(query, [email], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error en la consulta', error: err });
    }

    if (results.length > 0) {
      const user = results[0];
      if (bcrypt.compareSync(password, user.password)) {
        res.status(200).json({ message: 'Login exitoso', user_id: user.id });
      } else {
        res.status(400).json({ message: 'Contraseña incorrecta' });
      }
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  });
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
