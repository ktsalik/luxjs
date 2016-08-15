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

Lux.Button = {};

Lux.Button.options = {
  type: ['white', 'light', 'dark', 'black', 'link', 'primary', 'info', 'success', 'warning', 'danger'],
  size: ['small', 'medium', 'large'],
  style: ['outlined', 'inverted'],
  state: ['loading', 'active', 'disabled']
};

Lux.Button.directive = function() {
  return {
    restrict: 'EA',
    link: function(scope, element, attrs) {
      element.addClass('button');
      
      var options = Lux.Button.options;
      
      for (var option in options) {
        attrs.$observe(option, (function(option) {
          return function(val) {
            element.removeClass('is-' + options[option].join(' is-'));
            if (options[option].indexOf(val) > -1) {
              element.addClass('is-' + val);
            }
          };
        })(option));
      }
      
      options.state.forEach(function(state) {
        attrs.$observe(state, function(val) {
          element.removeClass('is-' + state);
          if (val === false || val === 'false') {
            element.removeClass('is-' + state);
          } else {
            element.addClass('is-' + state);
          }
        });
      });
    }
  };
};

angular
  .module('Lux')
  .directive('lbutton', Lux.Button.directive)
  .directive('buttonGroup', function() {
    return {
      restrict: 'A',
      scope: {
        selected: '=buttonGroup'
      },
      link: function(scope, element, attrs) {
        
        var btnGroup = angular.element(element).addClass('control has-addons');
        
        angular.forEach(btnGroup.children(), function(button) {
          angular.element(button).on('click', function() {
            scope.selected = this.dataset.value;
            setTimeout(function() { scope.$apply(); }, 0); // force diggest
          });
        });
        
        scope.$watch('selected', function(newVal, oldVal) {
          angular.element(btnGroup[0].querySelector('[data-value="' + oldVal + '"]')).removeClass('is-active');
          angular.element(btnGroup[0].querySelector('[data-value="' + newVal + '"]')).addClass('is-active');
        });
      }
    };
  })
