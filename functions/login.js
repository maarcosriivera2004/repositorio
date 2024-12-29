// functions/login.js

const mysql = require('mysql2');
const bcrypt = require('bcryptjs');

const db = mysql.createConnection({
  host: 'bgnwbezv162rppz88e7e-mysql.services.clever-cloud.com',
  user: 'usjzyvhsmzwuhjfa',
  password: 'zVJqTkPlVTGLfwARYGfX',
  database: 'bgnwbezv162rppz88e7e'
});

exports.handler = async (event, context) => {
  const { email, password } = JSON.parse(event.body);

  const query = 'SELECT * FROM Usuario WHERE email = ?';
  return new Promise((resolve, reject) => {
    db.query(query, [email], (err, results) => {
      if (err) {
        return reject({ statusCode: 500, body: JSON.stringify({ message: 'Error en la consulta', error: err }) });
      }

      if (results.length > 0) {
        const user = results[0];
        if (bcrypt.compareSync(password, user.password)) {
          resolve({ statusCode: 200, body: JSON.stringify({ message: 'Login exitoso', user_id: user.id }) });
        } else {
          resolve({ statusCode: 400, body: JSON.stringify({ message: 'Contraseña incorrecta' }) });
        }
      } else {
        resolve({ statusCode: 404, body: JSON.stringify({ message: 'Usuario no encontrado' }) });
      }
    });
  });
};
