var Lux = {
  VERSION: '0.0.1'
};

Lux.Button = function() {
  var button = this;
  
  button.addClass('button');
  
  if (arguments[0]) {
    if (arguments[0] == Object) {
      button.options = $.extend(Lux.Button.DEFAULT_OPTIONS, arguments[0]); 
    } else if (typeof arguments[0] == 'function') {
      var onClick = arguments[0];
      button.options = Lux.Button.DEFAULT_OPTIONS;
      button.options.onClick = onClick;
    } else if (typeof arguments[0] == 'string') {
      var state = arguments[0];
      button.options = Lux.Button.DEFAULT_OPTIONS;
      
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
          button.addClass(arguments[0]);
          oppositeAction = function() { button.removeClass(arguments[0]); };
          break;
      }
      
      if (window.Promise && arguments[1] && arguments[1].constructor == Promise) {
        var promise = arguments[1];
        promise.then(oppositeAction);
      }
      
      return button;
    }
  } else {
    button.options = Lux.Button.DEFAULT_OPTIONS;
  }
  
  button.click(button.options.onClick);
  
  button.loading = function(promise) {
    button.addClass('is-loading');
    if (window.Promise && promise && promise.constructor == Promise) promise.then(button.reset);
  };
  
  button.reset = function(promise) {
    button.removeClass('is-loading');
    if (window.Promise && promise && promise.constructor == Promise) promise.then(button.loading);
  };
  
  button.activate = function(promise) {
    button.addClass('is-active');
    if (window.Promise && promise && promise.constructor == Promise) promise.then(button.disactivate);
  };
  
  button.disactivate = function(promise) {
    button.removeClass('is-active');
    if (window.Promise && promise && promise.constructor == Promise) promise.then(button.activate);
  };
  
  button.disable = function(promise) {
    button.addClass('is-disabled');
    if (window.Promise && promise && promise.constructor == Promise) promise.then(button.enable);
  };
  
  button.enable = function(promise) {
    button.removeClass('is-disabled');
    if (window.Promise && promise && promise.constructor == Promise) promise.then(button.disable);
  };
  
  return button;
};

Lux.Button.DEFAULT_OPTIONS = {
  
};

$.fn.button = Lux.Button;
