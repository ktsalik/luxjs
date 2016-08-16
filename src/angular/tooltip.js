Lux.Tooltip = {};

Lux.Tooltip.directive = function() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      var tooltip = angular.element('<div class="tooltip hidden"></div>');
      tooltip.html(attrs.tooltip);
      document.body.appendChild(tooltip[0]);
      
      attrs.$observe('tooltip', function(value) {
        tooltip.html(value);
      });
      
      var placement = attrs.placement || element.data('placement') || 'auto';
      
      function positionTooltip() {
        var rect = element[0].getBoundingClientRect();
        var position = {
          left: rect.left + window.pageXOffset,
          top: rect.top + window.pageYOffset
        };
        var fixedOffset = 3;
        if (placement == 'auto') {
          if (element[0].getBoundingClientRect().top >= tooltip[0].clientHeight) {
            placement = 'top';
          } else {
            placement = 'bottom';
          }
        }
        switch (placement) {
          case 'top':
            position.left += (element[0].offsetWidth / 2) - (tooltip[0].offsetWidth / 2);
            position.top -= tooltip[0].offsetHeight + fixedOffset;
            break;
          case 'bottom':
            position.left += (element[0].offsetWidth / 2) - (tooltip[0].offsetWidth / 2);
            position.top += tooltip[0].offsetHeight + fixedOffset;
            break;
          case 'left':
            position.left -= tooltip[0].offsetWidth + fixedOffset;
            break;
          case 'right':
            position.left += element[0].offsetWidth + fixedOffset;
            break;
        }
        tooltip.css(position);
      }
      
      var trigger = attrs.trigger || element.data('trigger') || 'hover';
      
      element
        .on('mouseenter', function() {
          if (trigger == 'hover') {
            positionTooltip();
            tooltip.removeClass('hidden');
          }
        })
        .on('mouseleave', function() {
          if (trigger =='hover') {
            tooltip.addClass('hidden');
          }
        })
        .on('click', function() {
          if (trigger == 'click') {
            if (tooltip.hasClass('hidden')) {
              positionTooltip();
              tooltip.removeClass('hidden');
            } else {
              tooltip.addClass('hidden');
            }
          }
        });
    }
  };
};

angular
  .module('Lux')
  .directive('tooltip', Lux.Tooltip.directive);
