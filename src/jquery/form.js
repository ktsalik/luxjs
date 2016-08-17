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
