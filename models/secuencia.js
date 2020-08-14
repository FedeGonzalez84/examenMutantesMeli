const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let secuenciaSchema = new Schema({
    dna: {
        type: String
    },
    esMutante: {
        type: Boolean
    }
    
});

module.exports = mongoose.model('Secuencia', secuenciaSchema);
