const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'inprocode'
});

connection.connect(error => {
  if (error) throw error;
  console.log('Base de datos conectada!');
});

app.get('/api/datos', (req, res) => {
  const sql = 'SELECT * FROM test';
  connection.query(sql, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
