angular
  .module('lux', []);
angular
  .module('lux')
  .directive('lButton', function() {
    return {
      restrict: 'EA',
      link: function(scope, element, attrs) {
        element.addClass('button');
        
        attrs.$observe('type', function(val) {
          var validTypes = ['white', 'light', 'dark', 'black', 'link', 'primary', 'info', 'success', 'warning', 'danger'];
          element.removeClass('is-' + validTypes.join(' is-'));
          if (validTypes.indexOf(val) > -1) {
            element.addClass('is-' + val);
          }
        });
        
        attrs.$observe('size', function(val) {
          var validSizes = ['small', 'medium', 'large'];
          element.removeClass('is-' + validSizes.join(' is-'));
          if (validSizes.indexOf(val) > -1) {
            element.addClass('is-' + val);  
          }
        });
        
        ['outlined', 'inverted', 'loading', 'active', 'disabled'].forEach(function(styleState) {
          attrs.$observe(styleState, function(val) {
            if (val == 'false') { // because boolean values end up as string values
              element.removeClass('is-' + styleState);
            } else {
              element.addClass('is-' + styleState);
            }
          });
        });
      }
    };
  })
  .directive('addonsButton', function() {
    return {
      restrict: 'A',
      scope: {
        selected: '=addonsButton'
      },
      link: function(scope, element, attrs) {
        angular.forEach(element.children(), function(button) {
          angular.element(button).on('click', function() {
            angular.element(element[0].querySelector('.is-active')).removeClass('is-active');
            angular.element(this).addClass('is-active');
            scope.selected = this.dataset.value;
            setTimeout(function() { scope.$apply(); }, 0); // force diggest
          });
        });
      }
    };
  })
