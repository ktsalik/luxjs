var Lux = {
  VERSION: '0.0.1'
};

Lux.Button = function() {
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
      var validOptions = {
        type: ['white', 'light', 'dark', 'black', 'link', 'primary', 'info', 'success', 'warning', 'danger'],
        size: ['small', 'medium', 'large'],
        style: ['outlined', 'inverted'],
        state: ['loading', 'active', 'disabled']
      };
      for (var option in validOptions) {
        if (validOptions[option].indexOf(options[option]) > -1) {
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

Lux.addonsButton = function() {
  
  var addons = this;
  
  addons.children().each(function(i, button) {
    $(button).click(function() {
      addons.find('.is-active').removeClass('is-active');
      addons.data('value', $(button).addClass('is-active').data('value'));
    });
  });
  
};

$.fn.button = Lux.Button;

$.fn.addonsButton = Lux.addonsButton;
