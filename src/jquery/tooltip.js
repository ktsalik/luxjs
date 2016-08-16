Lux.Tooltip = function(options) {
  var elements = this;
  
  options = options || {};
  
  elements.each(function(i, element) {
    var $element = $(element);
    
    var $tooltip;
    if ($element.data('tooltipId')) {
      $tooltip = $('#tooltip_' + $element.data('tooltipId'));
    } else {
      var tooltipId = $('.tooltip').length + 1;
      $tooltip = $('<div id="tooltip_' + tooltipId + '" class="tooltip hidden"></div>').html(options.content || $element.data('tooltip')).appendTo('body');  
      $element.data('tooltipId', tooltipId);
    }
    
    var placement = options.placement || $element.data('placement') || 'auto';
    
    function positionTooltip() {
      var position = $element.offset();
      var fixedOffset = 3;
      if (placement == 'auto') {
        if ($element[0].getBoundingClientRect().top >= tooltip.outerHeight()) {
          placement = 'top';
        } else {
          placement = 'bottom';
        }
      }
      switch (placement) {
        case 'top':
          position.left += ($element.outerWidth() / 2) - (tooltip.outerWidth() / 2);
          position.top -= $tooltip.outerHeight() + fixedOffset;
          break;
        case 'bottom':
          position.left += ($element.outerWidth() / 2) - (tooltip.outerWidth() / 2);
          position.top += $tooltip.outerHeight() + fixedOffset;
          break;
        case 'left':
          position.left -= $tooltip.outerWidth() + fixedOffset;
          break;
        case 'right':
          position.left += $element.outerWidth() + fixedOffset;
          break;
      }
      tooltip.css(position);
    }
    
    $element.off('mouseenter.tooltip mouseleave.tooltip click.tooltip'); // remove any previous handlers
    var trigger = options.trigger || $element.data('trigger') || 'hover';
    $element.data('trigger', trigger);
    if (trigger == 'hover') {
      $element.on('mouseenter.tooltip', function() {
        positionTooltip();
        $tooltip.removeClass('hidden');
      });
      $element.on('mouseleave.tooltip', function() {
        $tooltip.addClass('hidden');
      });
    } else if (trigger == 'click') {
      $element.on('click.tooltip', function() {
        if ($tooltip.hasClass('hidden')) {
          positionTooltip();
          $tooltip.removeClass('hidden');
        } else {
          $tooltip.addClass('hidden');
        }
      });
    }
  });
};

$.fn.tooltip = Lux.Tooltip;
