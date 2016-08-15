var Lux = {
  VERSION: '0.0.1'
};

angular
  .module('Lux', [])
  .run(function() {
    if (angular.version.major < 1 || angular.version.minor < 3 || angular.version.dot < 1) {
      console.warn('Lux requires AngularJS version higher than 1.3.1');
    }
  });
