const solution = require('../solution');
const express = require("express");
const Secuencia = require('../models/secuencia');

// Llama a la librería express
const app = express();

// ---------------------------------------------------------------------
// Peticion POST /mutant
app.post('/mutant', (req, res) => {
    const dna = req.body.dna;   
    
    // Valido que el numero de elementos sea correcto
    if(!validarEntrada(dna)){
        return res.status(400).json(({
            ok: "False",
            message: "La cantidad de elementos en la secuencia es incorrecta"
        }))
    }

    // Busco si la secuencia no fue cargada previamente
    buscarSecuencia(dna)
        .then( response => {
            if(response) return res.status(409).json({
                ok: "False",
                message: "La secuencia ya se encuentra en la base de datos" 
            });
            else {
                // Determino si es mutante
                const esMutante = solution.isMutant(dna);

                // Creo el modelo secuencia para almacenarlo en la base de datos
                let secuencia = new Secuencia({ dna: `${dna}`, esMutante });

                // Almaceno el objeto secuencia y envio respuesta
                secuencia.save( (err, _) => {
                    if(err) return res.status(400).json(); // Error al almacenar en base de datos
                    if(esMutante) return res.status(200).json(); // Si es mutante
                    return res.status(403).json(); // Si es humano       
                }); 
            }
        })
        .catch( _ => {
            return res.status(404);
        })
      
});
// ---------------------------------------------------------------------
// Peticion POST /stats 
app.post('/stats', (req, res) => {
    // Cuento la cantidad de cada tipo de secuencia
    Promise.all([ Secuencia.countDocuments({ esMutante: true}), 
                  Secuencia.countDocuments({ esMutante: false})])
            .then(([cantMutantes, cantHumanos]) => {                
                return res.status(200).json({
                    count_mutant_dna: cantMutantes,
                    count_human_dna: cantHumanos,
                    ratio:  calculoRatio(cantHumanos, cantMutantes)
                })
            })
            .catch( _ => {
                return res.status(404);
            });
    
});
// ---------------------------------------------------------------------
// Funcion para calcular el ratio
const calculoRatio = (cantHumanos, cantMutantes) => {
    if( (cantHumanos ===0  && cantMutantes === 0)) return 0;
    if (cantHumanos === 0) return cantMutantes;
    return cantMutantes/cantHumanos;
}
// ---------------------------------------------------------------------
// Funcion que busca si ya existe la secuencia en la base de datos
const buscarSecuencia = async (dna) => {
    const dnaString = `${dna}`;
    const result = await Secuencia.findOne({ dna: dnaString }).exec();
    return result;
}
// ---------------------------------------------------------------------
// Valida que la cantidad de elementos en la entrada sea correcta
const validarEntrada = (dna) => {
    const longitudDNA = dna.length;
    if( longitudDNA < 4) return false; // Valido la longitu del array
    for( let secuencia of dna){
        if(secuencia.length !== longitudDNA) return false;
    }
    return true;
}
// ---------------------------------------------------------------------


module.exports = app;