var express = require("express"),// Express: Framework HTTP para Node.js
    mongoose = require('mongoose'), // Mongoose: Libreria para conectar con MongoDB
    bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    cors = require('cors');

// Conexión a la base de datos de MongoDB que tenemos en local
mongoose.connect('mongodb://127.0.0.1:27017/examen_ionic', function (err, res) {
  if (err) throw err;
  console.log('Conectado correctamente a la Base de Datos');
});

var app = express();
app.all('/*', function (req, res, next) {
  // CORS headers
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());

//API rutas
routes = require('./routes/estudiantes')(app);
routes = require('./routes/asignaturas')(app);

var server = require('http').Server(app);

server.listen(3000, function () {
  console.log("Servidor escuchando en, http://localhost:3000");
});

