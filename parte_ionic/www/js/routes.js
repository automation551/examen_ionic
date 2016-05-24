angular.module('examenionic.routes', [])
  .config(function($stateProvider, $urlRouterProvider)
  {
    $stateProvider.state('principal', {
      url: '/principal',
      abstract: true,
      templateUrl: 'templates/principal.html'
    })

    // Each tab has its own nav history stack:

    .state('principal.inicio', {
      url: '/inicio',
      views: {
        'principal-inicio': {
          templateUrl: 'templates/principal-inicio.html',
          controller: 'inicioctrl'
        }
      }
    })

    .state('principal.estudiantes', {
      url: '/estudiantes',
      views: {
        'principal-estudiantes': {
          templateUrl: 'templates/principal-estudiantes.html',
          controller: 'estudiantesctrl'
        }
      }
    })
    .state('principal-estudiante-detalle', {
      url: '/estudiante/:id',
      templateUrl: 'templates/principal-estudiante-detalle.html',
      controller: 'estudiantedetallectrl'

    })

      .state('principal-asignatura-detalle', {
        url: '/asignatura/:id',
        templateUrl: 'templates/principal-asignatura-detalle.html',
        controller: 'asignaturadetallectrl'

      })
      .state('principal-insertarasignatura-estudiante', {
        url: '/insertar/:idestu/:nombreestu',
        templateUrl: 'templates/principal-insertarasignatura-estudiante.html',
        controller: 'insertarasignaturactrl'

      })

      .state('principal.asignaturas', {
      url: '/asignaturas',
      views: {
        'principal-asignaturas': {
          templateUrl: 'templates/principal-asignaturas.html',
          controller: 'asignaturactrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/principal/inicio');

})
