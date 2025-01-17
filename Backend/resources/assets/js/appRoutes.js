angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', '$httpProvider',
  function ($routeProvider, $locationProvider, $httpProvider) {
    $routeProvider
      .when('/', {
        templateUrl: base_url+'/partials/index',
        controller: 'MainController'
      })
      .when('/:category/:action?/:id?', {
        templateUrl: function (params) {
          var allowedParams = ['category', 'action', 'id'];
          var paramVals = [];
          for (var key in params) {
            if (allowedParams.indexOf(key) !== -1) {
              paramVals.push(params[key]);
            }
          }
          console.log(paramVals.join('/'));
          return base_url+'/partials/' + paramVals.join('/');
        }
      })
      .otherwise({
        redirectTo: base_url+'/'
      });
    
    $locationProvider.html5Mode(true);

    $httpProvider.interceptors.push(['$rootScope', '$q', '$localStorage',
      function ($rootScope, $q, $localStorage) {
        return {
          request: function (config) {
            config.headers = config.headers || {};
            if ($localStorage.token) {
              config.headers.Authorization = 'Bearer ' + $localStorage.token;
            }
            return config;
          },
          response: function (res) {
            if (res.status === 401) {
              // Handle unauthenticated user.
            }
            return res || $q.when(res);
          }
        };
      }
    ]);
  }
]);
