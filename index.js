require('./config/config');
const solution = require('./solution');
const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Secuencia = require('./models/secuencia');
 
// ---------------------------------------------------------------------
// Llama a la librería express
const app = express();

// ---------------------------------------------------------------------
// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ---------------------------------------------------------------------
// Rutas
app.use( require('./routes/mutante'));

// ---------------------------------------------------------------------
// Conectar con mongodb
mongoose.connect(process.env.URLDB,
 {    useNewUrlParser: true,    
      useUnifiedTopology: true},
      (err, res) => { 
          if (err) throw err;    
    console.log('Base de datos Online');
}); 
// ---------------------------------------------------------------------
// Escuchando el servidor
app.listen(process.env.PORT, () => {
    console.log("Escuchando puerto: " + process.env.PORT ); });