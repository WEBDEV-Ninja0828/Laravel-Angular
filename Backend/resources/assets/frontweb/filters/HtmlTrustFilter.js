angular.module('app.filters')
.filter('trustAsHTML', ['$sce', function($sce){
	return function(text) {
		return $sce.trustAsHtml(text);
	};
}]);
	