/**
 * Created by carlos on 22/05/2016.
 */
module.exports = function (app) {
    var mongoose = require('mongoose');
    var Estudiante = require('../modelos/estudiante.js');

    //GET - Obtener todos los usuarios de la colecccion usuarios de la BBDD
    ObtenerEstudiantes = function (req, res) {
        Estudiante.find(function (err, estudiantes) {
            if (err) res.send(500, err.message);

            console.log('GET /estudiantes')
            res.status(200).jsonp(estudiantes);
        });
    };
    ObtenerEstudiantesporId = function (req, res) {
        Estudiante.findById(req.params.id,function (err, estudiante) {
            if (err) res.send(500, err.message);

            console.log('GET /estudiantes por Id'+ estudiante)
            res.status(200).jsonp(estudiante);
        });
    };
    //POST - Crear estudiante
    CrearEstudiante = function (req, res)
    {
        resultado = res;
        var estudiante = new Estudiante(req.body)
        estudiante.save(function (err, estudiante){
            if (err) return resultado.send(500, err.message);
                    resultado.status(200).jsonp(estudiante);});
    };

    //DELETE - Eliminar estudiante
    EliminarEstudianteporID = function (req, res) {
        console.log('DELETE estudiante');
        console.log(req.params.id);
        Estudiante.findByIdAndRemove(req.params.id, function (err) {
            if (err) {
                res.send(err)
            }
            ObtenerEstudiantes(req,res);
        })
    };

//end points
    app.get('/estudiante/ObtenerEstudiantes', ObtenerEstudiantes);
    app.get('/estudiante/ObtenerEstudiantesporID/:id', ObtenerEstudiantesporId);
    app.post('/estudiante/CrearEstudiante', CrearEstudiante);
    app.delete('/estudiante/EliminarEstudianteporID/:id', EliminarEstudianteporID);
}