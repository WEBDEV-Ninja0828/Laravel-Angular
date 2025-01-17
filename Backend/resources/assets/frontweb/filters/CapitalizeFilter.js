angular.module('app.filters')
.filter('capitalize', function() {
    return function(input, all) {
      var reg = (all) ? /([^\W_]+[^\s-]*) */g : /([^\W_]+[^\s-]*)/;
      return (!!input) ? input.replace(reg, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}) : '';
    }
  })

.filter('spaceless',function(){
    return function(input){
        if (input) {
            return input.replace('_', ' ');    
        }
    }
});