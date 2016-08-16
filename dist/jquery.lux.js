var Lux = {
  VERSION: '0.0.1'
};

Lux.Button = {};

Lux.Button.options = {
  type: ['white', 'light', 'dark', 'black', 'link', 'primary', 'info', 'success', 'warning', 'danger'],
  size: ['small', 'medium', 'large'],
  style: ['outlined', 'inverted'],
  state: ['loading', 'active', 'disabled']
};

Lux.Button.Plugin = function() {
  var button = this;
  
  button.addClass('button');
  
  button.loading = function(promise) {
    return button.addClass('is-loading');
    if (promise) promise.then(function() { button.reset(); }).catch(function() { button.reset(); })
  };
  
  button.reset = function(promise) {
    return button.removeClass('is-loading');
    if (promise) promise.then(function() { button.reset(); }).catch(function() { button.loading(); })
  };
  
  button.activate = function(promise) {
    return button.addClass('is-active');
    if (promise) promise.then(function() { button.reset(); }).catch(function() { button.disactivate(); })
  };
  
  button.disactivate = function(promise) {
    return button.removeClass('is-active');
    if (promise) promise.then(function() { button.reset(); }).catch(function() { button.activate(); })
  };
  
  button.disable = function(promise) {
    return button.addClass('is-disabled');
    if (promise) promise.then(function() { button.reset(); }).catch(function() { button.enable(); })
  };
  
  button.enable = function(promise) {
    return button.removeClass('is-disabled');
    if (promise) promise.then(function() { button.reset(); }).catch(function() { button.disable(); })
  };
  
  if (arguments[0]) {
    if (arguments[0].constructor == Object) {
      options = arguments[0];
      var btnOptions = Lux.Button.options;
      
      for (var option in btnOptions) {
        if (option in options && btnOptions[option].indexOf(options[option]) > -1) {
          button.addClass('is-' + options[option]);
        }
      }
      if (options.onClick) {
        button.click(options.onClick);
      }
    } else if (typeof arguments[0] == 'function') {
      button.click(options.onClick);
    } else if (typeof arguments[0] == 'string') {
      var state = arguments[0];
      var oppositeAction;
      
      switch (state) {
        case 'loading':
          button.addClass('is-loading');
          oppositeAction = function() { button.removeClass('is-loading'); };
          break;
        case 'reset':
          button.removeClass('is-loading');
          oppositeAction = function() { button.addClass('is-loading'); };
          break;
        case 'active':
          button.addClass('is-active');
          oppositeAction = function() { button.removeClass('is-active'); };
          break;
        case 'inactive':
          button.removeClass('is-active');
          oppositeAction = function() { button.addClass('is-active'); };
          break;
        case 'disable':
          button.addClass('is-disabled');
          oppositeAction = function() { button.removeClass('is-disabled'); };
          break;
        case 'enable':
          button.removeClass('is-disabled');
          oppositeAction = function() { button.addClass('is-disabled'); };
          break;
        default:
          var customClass = arguments[0];
          button.addClass(customClass);
          oppositeAction = function() { button.removeClass(customClass); };
          break;
      }
      
      if (arguments[1] && typeof arguments[1].then == 'function') {
        var promise = arguments[1];
        promise.then(oppositeAction).catch(oppositeAction);
      }
    }
  }
  
  return button;
};

Lux.ButtonGroup = function() {
  
  var btnGroup = this;
  
  btnGroup.addClass('control has-addons');
  
  btnGroup.children().each(function(i, button) {
    $(button).click(function() {
      btnGroup.find('.is-active').removeClass('is-active');
      btnGroup.data('value', $(button).addClass('is-active').data('value'));
    });
  });
  
};

$.fn.button = Lux.Button.Plugin;

$.fn.buttonGroup = Lux.ButtonGroup;

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
