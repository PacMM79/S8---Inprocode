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
  if (error) {
    console.error('Error al conectar a la base de datos:', error);
    process.exit(1); // Salir del proceso si hay un error de conexión
  }
  console.log('Base de datos conectada!');
});

// Ruta para obtener todas las reservas
app.get('/api/bookings', (_req, res) => {
  const query = 'SELECT * FROM bookings';
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error en la consulta SQL:', error);
      return res.status(500).send('Error en la base de datos');
    }
    res.send(results);
  });
});

// Ruta para obtener una reserva por ID
app.get('/api/bookings/:id', (req, res) => {
  const query = 'SELECT * FROM bookings WHERE id = ?';
  connection.query(query, [req.params.id], (error, results) => {
    if (error) {
      console.error('Error en la consulta SQL:', error);
      return res.status(500).send('Error en la base de datos');
    }
    res.send(results[0]);
  });
});

// Ruta para añadir una nueva reserva
app.post('/api/bookings', (req, res) => {
  const newBooking = req.body;
  const query = 'INSERT INTO bookings (name, email, tel, date, time, service, notes) VALUES (?, ?, ?, ?, ?, ?, ?)';
  const values = [newBooking.name, newBooking.email, newBooking.tel, newBooking.date, newBooking.time, newBooking.service, newBooking.notes];
  
  connection.query(query, values, (error, results) => {
    if (error) {
      console.error('Error en la inserción de datos:', error);
      return res.status(500).send('Error en la base de datos');
    }
    res.status(201).send({ id: results.insertId, ...newBooking });
  });
});

// Ruta para modificar una reserva existente
app.put('/api/bookings/:id', (req, res) => {
  const updatedBooking = req.body;
  const query = 'UPDATE bookings SET name = ?, email = ?, tel = ?, date = ?, time = ?, service = ?, notes = ? WHERE id = ?';
  const values = [updatedBooking.name, updatedBooking.email, updatedBooking.tel, updatedBooking.date, updatedBooking.time, updatedBooking.service, updatedBooking.notes, req.params.id];
  
  connection.query(query, values, (error, results) => {
    if (error) {
      console.error('Error en la actualización de datos:', error);
      return res.status(500).send('Error en la base de datos');
    }
    res.send(updatedBooking);
  });
});

// Ruta para eliminar una reserva
app.delete('/api/bookings/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM bookings WHERE id = ?';
  connection.query(query, [id], (error, results) => {
    if (error) {
      console.error('Error en la consulta SQL:', error);
      return res.status(500).send('Error en la base de datos');
    }
    res.send({ message: 'Booking deleted successfully' });
  });
});

// Cerrar la conexión a la base de datos cuando el servidor se cierra
process.on('SIGINT', () => {
  connection.end(err => {
    if (err) {
      console.error('Error al cerrar la conexión a la base de datos:', err);
    } else {
      console.log('Conexión a la base de datos cerrada.');
    }
    process.exit(0);
  });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

// GOOGLE MAPS //

// Ruta para obtener todos los marcadores
app.get('/api/markers', (_req, res) => {
  const query = 'SELECT * FROM markers';
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error en la consulta SQL:', error);
      return res.status(500).send('Error en la base de datos');
    }
    res.send(results);
  });
});

// Ruta para obtener un marcador por ID
app.get('/api/markers/:id', (req, res) => {
  const query = 'SELECT * FROM markers WHERE id = ?';
  connection.query(query, [req.params.id], (error, results) => {
    if (error) {
      console.error('Error en la consulta SQL:', error);
      return res.status(500).send('Error en la base de datos');
    }
    res.send(results[0]);
  });
});

// Ruta para añadir un nuevo marcador
app.post('/api/markers', (req, res) => {
  const newMarker = req.body;
  const query = 'INSERT INTO markers (lat, lng, title, description, category) VALUES (?, ?, ?, ?, ?)';
  const values = [newMarker.lat, newMarker.lng, newMarker.title, newMarker.description, newMarker.category];

  connection.query(query, values, (error, results) => {
    if (error) {
      console.error('Error en la inserción de datos:', error);
      return res.status(500).send('Error en la base de datos');
    }
    res.status(201).send({ id: results.insertId, ...newMarker });
  });
});

// Ruta para modificar un marcador existente
app.put('/api/markers/:id', (req, res) => {
  const updatedMarker = req.body;
  const query = 'UPDATE markers SET lat = ?, lng = ?, title = ?, description = ?, category = ? WHERE id = ?';
  const values = [updatedMarker.lat, updatedMarker.lng, updatedMarker.title, updatedMarker.description, updatedMarker.category, req.params.id];

  connection.query(query, values, (error, results) => {
    if (error) {
      console.error('Error en la actualización de datos:', error);
      return res.status(500).send('Error en la base de datos');
    }
    res.send(updatedMarker);
  });
});

// Ruta para eliminar un marcador
app.delete('/api/markers/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM markers WHERE id = ?';
  connection.query(query, [id], (error, results) => {
    if (error) {
      console.error('Error en la consulta SQL:', error);
      return res.status(500).send('Error en la base de datos');
    }
    res.send({ message: 'Marker deleted successfully' });
  });
});

// CALENDAR //

// Ruta para obtener todos los eventos
app.get('/api/events', (_req, res) => {
  const query = 'SELECT * FROM events';
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error en la consulta SQL:', error);
      return res.status(500).send('Error en la base de datos');
    }
    res.send(results);
  });
});

// Ruta para obtener un evento por ID
app.get('/api/events/:id', (req, res) => {
  const query = 'SELECT * FROM events WHERE id = ?';
  connection.query(query, [req.params.id], (error, results) => {
    if (error) {
      console.error('Error en la consulta SQL:', error);
      return res.status(500).send('Error en la base de datos');
    }
    res.send(results[0]);
  });
});

// Ruta para añadir un nuevo evento
app.post('/api/events', (req, res) => {
  const newEvent = req.body;
  const query = 'INSERT INTO events (title, color, start, end) VALUES (?, ?, ?, ?)';
  const values = [newEvent.title, newEvent.color, newEvent.start, newEvent.end];
  
  connection.query(query, values, (error, results) => {
    if (error) {
      console.error('Error en la inserción de datos:', error);
      return res.status(500).send('Error en la base de datos');
    }
    res.status(201).send({ id: results.insertId, ...newEvent });
  });
});

// Ruta para modificar un evento existente
app.put('/api/events/:id', (req, res) => {
  const updatedEvent = req.body;
  const query = 'UPDATE events SET title = ?, color = ?, start = ?, end = ? WHERE id = ?';
  const values = [updatedEvent.title, updatedEvent.color, updatedEvent.start, updatedEvent.end, req.params.id];
  
  connection.query(query, values, (error, results) => {
    if (error) {
      console.error('Error en la actualización de datos:', error);
      return res.status(500).send('Error en la base de datos');
    }
    res.send(updatedEvent);
  });
});

// Ruta para eliminar un evento
app.delete('/api/events/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM events WHERE id = ?';
  connection.query(query, [id], (error, results) => {
    if (error) {
      console.error('Error en la consulta SQL:', error);
      return res.status(500).send('Error en la base de datos');
    }
    res.send({ message: 'Event deleted successfully' });
  });
});