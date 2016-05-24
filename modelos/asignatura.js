var mongoose = require('mongoose');
Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;

var Estudiante = new Schema(
    {
            _id: {type: Schema.ObjectId, ref: 'Estudiante'},
            nombre: {type: String},

    });

var asignaturaEsquema = new Schema(
    {

            nombre:  { type: String },
            estudiantes:[Estudiante ]
    });

module.exports = mongoose.model('Asignatura', asignaturaEsquema);

