/* angular.spinner.min.*/
!function(a){"use strict";function b(a,b){a.module("angularSpinner",[]).factory("usSpinnerService",["$rootScope",function(a){var b={};return b.spin=function(b){a.$broadcast("us-spinner:spin",b)},b.stop=function(b){a.$broadcast("us-spinner:stop",b)},b}]).directive("usSpinner",["$window",function(c){return{scope:!0,link:function(d,e,f){function g(){d.spinner&&d.spinner.stop()}var h=b||c.Spinner;d.spinner=null,d.key=a.isDefined(f.spinnerKey)?f.spinnerKey:!1,d.startActive=a.isDefined(f.spinnerStartActive)?f.spinnerStartActive:d.key?!1:!0,d.spin=function(){d.spinner&&d.spinner.spin(e[0])},d.stop=function(){d.startActive=!1,g()},d.$watch(f.usSpinner,function(a){g(),d.spinner=new h(a),(!d.key||d.startActive)&&d.spinner.spin(e[0])},!0),d.$on("us-spinner:spin",function(a,b){b===d.key&&d.spin()}),d.$on("us-spinner:stop",function(a,b){b===d.key&&d.stop()}),d.$on("$destroy",function(){d.stop(),d.spinner=null})}}}])}"function"==typeof define&&define.amd?define(["angular","spin"],b):b(a.angular)}(window);

(function(){
    angular.module('ngLoadingSpinner', ['angularSpinner'])
    .directive('usSpinner',   ['$http', '$rootScope' ,function ($http, $rootScope){
        return {
            link: function (scope, elm, attrs)
            {
                $rootScope.spinnerActive = false;
                scope.isLoading = function () {
                    return $http.pendingRequests.length > 0;
                };

                scope.$watch(scope.isLoading, function (loading)
                {
                    $rootScope.spinnerActive = loading;
                    if(loading){
                        elm.removeClass('ng-hide');
                    }else{
                        elm.addClass('ng-hide');
                    }
                });
            }
        };

    }]);
}).call(this);