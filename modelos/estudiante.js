/**
 * Created by raul on 5/4/16.
 */

var mongoose = require('mongoose');
Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;



var estudianteEsquema = new Schema({
    nombre:    	    {	type: String  },
    direccion:      {  	type: String  },
    telefonos:
        [
            {
                nombre: String, value: String
            }
        ]
});

module.exports = mongoose.model('Usuario', estudianteEsquema);