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
    
    var placement = options.placement || $element.data('placement') || 'auto';
    
    var $tooltip;
    if ($element.data('tooltipId')) {
      $tooltip = $('#tooltip_' + $element.data('tooltipId'));
      if (options == 'show') {
        positionTooltip();
        $tooltip.removeClass('hidden');
      } else if(options == 'hide') {
        $tooltip.addClass('hidden');
      }
    } else {
      var tooltipId = $('.tooltip').length + 1;
      $tooltip = $('<div id="tooltip_' + tooltipId + '" class="tooltip hidden"></div>').html(options.content || $element.data('tooltip')).appendTo('body');  
      $element.data('tooltipId', tooltipId);
    }
    
    function positionTooltip() {
      var position = $element.offset();
      var fixedOffset = 3;
      if (placement == 'auto') {
        if ($element[0].getBoundingClientRect().top >= $tooltip.outerHeight()) {
          placement = 'top';
        } else {
          placement = 'bottom';
        }
      }
      switch (placement) {
        case 'top':
          position.left += ($element.outerWidth() / 2) - ($tooltip.outerWidth() / 2);
          position.top -= $tooltip.outerHeight() + fixedOffset;
          break;
        case 'bottom':
          position.left += ($element.outerWidth() / 2) - ($tooltip.outerWidth() / 2);
          position.top += $element.outerHeight() + fixedOffset;
          break;
        case 'left':
          position.left -= $tooltip.outerWidth() + fixedOffset;
          position.top -= ($tooltip.outerHeight() / 2) - ($element.outerHeight() / 2);
          break;
        case 'right':
          position.left += $element.outerWidth() + fixedOffset;
          position.top -= ($tooltip.outerHeight() / 2) - ($element.outerHeight() / 2);
          break;
      }
      $tooltip.css(position);
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

Lux.Form = function(options) {
  
  var forms = this;
  
  forms.each(function(i, form) {
    var elements = form.querySelectorAll('*');
    $(elements).each(function(i, element) {
      var validations = [];
      var attributes = element.attributes;
      for (var i = 0; i < attributes.length; i++) {
        var attribute = attributes.item(i);
        if (attribute.name.substr(0, 6) == 'valid-') {
          switch (attribute.name.substr(6)) {
            case 'required':
              validations.push(function(value) {
                var valid = value.trim() !== '' && value !== undefined;
                return valid
                  ? {
                    status: 'ok'
                  }
                  : {
                    status: 'error',
                    message: "Field is required"
                  };
              });
              break;
            case 'digits':
              var range = attribute.value;
              if (range) {
                validations.push((function(range) {
                  return function(value) {
                    var min = range[0];
                    var max = range[1] || min;
                    var valid = /^\d+$/.test(value);
                    valid = valid && (min == '*' || value.length >= Number(min));
                    valid = valid && (max == '*' || value.length <= Number(max));
                    return valid
                      ? {
                        status: 'ok'
                      }
                      : {
                        status: 'error',
                        message: "Requires " + min + " to " + max + " digits"
                      };
                  };
                })(range.split('-')));
              }
              break;
            case 'email':
              validations.push(function(value) {
                var valid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
                return valid
                  ? {
                    status: 'ok'
                  }
                  : {
                    status: 'error',
                    message: "Invalid email address"
                  };
              });
              break;
            case 'url':
              validations.push(function(value) {
                var valid = new RegExp("^(?:(?:https?|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?!(?:10|127)(?:\\.\\d{1,3}){3})(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))\\.?)(?::\\d{2,5})?(?:[/?#]\\S*)?$", "i").test(value);
                return valid
                  ? {
                    status: 'ok'
                  }
                  : {
                    status: 'error',
                    message: "Invalid url"
                  };
              });
              break;
            case 'number':
              var range = attribute.value;
              validations.push((function(range) {
                return function(value) {
                  if (range) {
                    var min = range[0];
                    var max = range[1] || min;
                    var valid = !isNaN(Number(value)) && value.trim().length > 0;
                    valid = valid && (min == '*' || Number(value) >= Number(min));
                    valid = valid && (max == '*' || Number(value) <= Number(max));
                    return valid
                      ? {
                        status: 'ok'
                      }
                      : {
                        status: 'error',
                        message: "Accepted values are between " + min + " and " + max
                      };
                  }
                };
              })(range.split('-')));
              break;
            case 'length':
              var range = attribute.value;
              if (range) {
                validations.push((function(range) {
                  return function(value) {
                    var min = range[0];
                    var max = range[1] || min;
                    var valid = (min == '*' && value.trim().length > 0) || value.trim().length >= Number(min);
                    valid = valid && (max == '*' || value.trim().length <= Number(max));
                    return valid
                      ? {
                        status: 'ok'
                      }
                      : {
                        status: 'error',
                        message: "Accepted values consist of " + min + " to " + max + " characters"
                      };
                  };
                })(range.split('-')));
              }
              break;
            case 'checked':
              validations.push((function(shouldBe) {
                return function(value) {
                  var valid = value.toString() == shouldBe;
                  return valid
                    ? {
                      status: 'ok'
                    }
                    : {
                      status: 'error',
                      message: "Required to be " + (shouldBe == 'true' ? "checked" : "unchecked")
                    };
                };
              })(attribute.value));
              break;
            case 'equals':
              validations.push((function(values) {
                return function(value) {
                  parsedValues = values.split('|');
                  parsedValues.forEach(function(value, i) { if (value[0] == '#') { parsedValues[i] = $(value).val(); } });
                  var valid = parsedValues.indexOf(value) > -1;
                  return valid
                    ? {
                      status: 'ok'
                    }
                    : {
                      status: 'error',
                      message: "Entered value should equal to " + parsedValues.join(" or ")
                    };
                };
              })(attribute.value));
              break;
          }
        }
      }
      if (validations.length) {
        $(element).on('blur', function() {
          var $element = $(this);
          var hasError = false;
          $element.parent().find('.help').remove();
          validations.forEach(function(validation) {
            var result;
            switch ($element.attr('type')) {
              case 'text':
                result = validation($element.val());
                break;
              case 'checkbox':
                result = validation($element.is(':checked'));
                break;
            }
            if (result.status == 'error') {
              hasError = true;
            }
            if (result.message) {
              var help = $('<div class="help is-' + (result.status == 'error' ? 'danger' : 'success') + '">' + result.message + '</div>');
              $element.parent().append(help);
            }
          });
          if (hasError) {
            $element.removeClass('is-success').addClass('is-danger');
          } else {
            $element.removeClass('is-danger').addClass('is-success');
          }
        });
      }
    });
    
  });
};

$.fn.form = Lux.Form;
