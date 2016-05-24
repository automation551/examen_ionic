//url base
var _base = "http://localhost:3000";

angular.module('examenionic', ['ionic', 'examenionic.controllers', 'examenionic.services','examenionic.routes'])

.run(function($ionicPlatform, $rootScope, $ionicLoading, $location, $timeout) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.factory('API', ['$http', function ($http) {
  var _api = {
    //GET GROUP
    obtenerEstudiantes: function () {
      return $http.get(_base + '/estudiante/ObtenerEstudiantes');
    },
    obtenerEstudiantesporid: function (id) {
      return $http.get(_base + '/estudiante/ObtenerEstudiantesporID/'+id);
    },
    crearEstudiante: function (estudiante) {
      console.log(id);
      return $http.post(_base + '/estudiante/CrearEstudiante',estudiante);
    },
    eliminarEstudiante: function (id) {
      return $http.delete(_base + '/estudiante/EliminarEstudianteporID/'+id);
    },

    obtenerAsignaturasporid: function (id) {
      return $http.get(_base + '/asignatura/ObtenerAsignaturasporId/'+id);
    },
    obtenerAsignaturas: function () {
      return $http.get(_base + '/asignatura/ObtenerAsignaturas');
    },
    crearAsignaturas: function (asignatura) {
      return $http.post(_base + '/asignatura/CrearAsignatura',asignatura);
    },
    modificarAsignaturas: function (estudiante,id) {
      return $http.put(_base + '/asignatura/ModificarAsignatura/'+id,estudiante);
    },
    eliminarAsignatura: function (id) {
      return $http.delete(_base + '/Asignatura/EliminarAsignaturaporID/'+id);
    }
  };
  return _api;
}])
.controller('inicioctrl',['$scope','$http','API',function($scope){
    $scope.$on('$ionicView.beforeEnter', function(){})
  }])

  .controller('principalctrl',['$scope','$http','API',function($scope,$http,api){
    $scope.$on('$ionicView.beforeEnter', function(){

    })
  }])

  .controller('asignaturactrl',['$scope','$http','API','$state',function($scope,$http,api,$state){
    $scope.$on('$ionicView.beforeEnter', function()
    {
      api.obtenerAsignaturas().success(function(data)
      {
        $scope.asignaturas=data;
      })
      $scope.perfil=function(id)
      {
        $state.go('principal-estudiante-detalle',{
          id:id
        });

      }

      $scope.perfilasignatura=function(id)
      {
        $state.go('principal-asignatura-detalle',{
          id:id
        });

      }

    })

  }])

  .controller('estudiantedetallectrl',['$scope','$http','API','$stateParams',function($scope,$http,API,$stateParams){
    $scope.$on('$ionicView.beforeEnter', function(){
      var id = $stateParams.id;
      API.obtenerEstudiantesporid(id).success(function(data){
        console.log(data);
        $scope.estudiante=data;
      })
    })
  }])
  .controller('asignaturadetallectrl',['$scope','$http','API','$stateParams',function($scope,$http,API,$stateParams){
    $scope.$on('$ionicView.beforeEnter', function(){
      var id = $stateParams.id;
      API.obtenerAsignaturasporid(id).success(function(data){
        console.log(data);
        $scope.asignatura=data;
      })
    })
  }])

  .controller('insertarasignaturactrl',['$scope','$http','API','$stateParams','$state',function($scope,$http,API,$stateParams,$state){
    $scope.$on('$ionicView.beforeEnter', function(){

      var estudiante =(
      {
        _id: $stateParams.idestu,
        nombre: $stateParams.nombreestu
      });
      API.obtenerAsignaturas().success(function(data){
        $scope.asignaturas=data;
      })
      $scope.insertarasig= function(id)
      {
        console.log(estudiante);
        API.modificarAsignaturas(estudiante,id).success(function (data)
        {
          $state.go('principal.estudiantes');
        })
      }
    })
  }])

  .controller('estudiantesctrl',['$scope','$http','API','$state',function($scope,$http,api,$state){

    $scope.$on('$ionicView.beforeEnter', function()
    {
      $scope.insertarestudiante= function(id,nombre){
        console.log('entro en insertar')
        $state.go('principal-insertarasignatura-estudiante',
          {
            idestu:id,
            nombreestu:nombre
          });
      }
      console.log('entro  estudiantes ')
      api.obtenerEstudiantes().success(function(data)
      {
        console.log('entro en obteener estudiantes ')

        $scope.estudiantes=data;
      }).error(function(data){})
      $scope.eliminarEstudiante= function(id){
        api.eliminarEstudiante(id).success(function(data){
          api.obtenerEstudiantes().success(function(datos)
          {

            $scope.estudiantes=datos;
          })

      }).error(function(data){})}
    })
  }]);

