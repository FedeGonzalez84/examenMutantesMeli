// ---------------------------------------------------------------------
// Puerto
// ---------------------------------------------------------------------
// Para variables de entorno
process.env.PORT = process.env.PORT || 3000;
// ---------------------------------------------------------------------
// Entorno
// ---------------------------------------------------------------------
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'
// ---------------------------------------------------------------------
// Base de datos
// ---------------------------------------------------------------------
let urlDB;
if(process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'test'){
    urlDB = 'mongodb://localhost:27017/mutantes';
} else {
    urlDB = process.env.MONGO_URI;
}
process.env.URLDB = urlDB;
