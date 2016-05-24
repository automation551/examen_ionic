/**
 * Created by carlos on 22/05/2016.
 */
module.exports = function (app) {
    var mongoose = require('mongoose');
    var Asignatura = require('../modelos/asignatura.js');

    //GET - Obtener todos los usuarios de la colecccion usuarios de la BBDD
    ObtenerAsignaturas = function (req, res) {
        Asignatura.find(function (err, asignaturas) {
            if (err) res.send(500, err.message);

            console.log('GET /asignaturas')
            res.status(200).jsonp(asignaturas);
        });
    };

    //POST - Crear asignatura
    CrearAsignatura = function (req, res)
    {
        console.log('entro en crear asig'+req.body);
        resultado = res;
        var asignatura = new Asignatura(req.body)
        asignatura.save(function (err, asignatura){
            if (err) return resultado.send(500, err.message);
            resultado.status(200).jsonp(asignatura);});
    };

    ModificarAsignatura = function (req, res){
        console.log('modificar asignatura')
        resultado=res;
        var entidad = ({
            _id: req.body._id,
            nombre: req.body.nombre
        });
        console.log(entidad);
        Asignatura.findById(req.params.id, function (err, asignatura) {
            asignatura.estudiantes.push(entidad);
            console.log(asignatura);
            asignatura.save(function (err, asignatura){
                if (err) return resultado.send(500, err.message);
                resultado.status(200).jsonp(asignatura);});
        })

    }

    ObtenerAsignaturasporId = function (req, res) {
        Asignatura.findById(req.params.id,function (err, asignatura) {
            if (err) res.send(500, err.message);

            console.log('GET /asignatura por Id'+ asignatura)
            res.status(200).jsonp(asignatura);
        });
    }

    //DELETE - Eliminar estudiante
    EliminarAsignaturaporID = function (req, res) {
        console.log('DELETE asignatura');
        console.log(req.params.id);
        Asignatura.findByIdAndRemove(req.params.id, function (err) {
            if (err) {
                res.send(err)
            }
            res.json({message: 'Asignatura eliminado correctamente'});
        })
    };

//end points
    app.get('/asignatura/ObtenerAsignaturas', ObtenerAsignaturas);
    app.post('/asignatura/CrearAsignatura', CrearAsignatura);
    app.put('/asignatura/ModificarAsignatura/:id', ModificarAsignatura);
    app.delete('/asignatura/EliminarAsignaturaporID/:id', EliminarAsignaturaporID);
    app.get('/asignatura/ObtenerAsignaturasporId/:id', ObtenerAsignaturasporId);

}
