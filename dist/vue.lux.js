var Lux = {
  VERSION: '0.0.1'
};

Lux.install = function(Vue, options) {
  Vue.directive('lbutton', this.Button.directive);
  Vue.directive('buttonGroup', this.ButtonGroup.directive);
};

Lux.Button = {};

Lux.Button.options = {
  type: ['white', 'light', 'dark', 'black', 'link', 'primary', 'info', 'success', 'warning', 'danger'],
  size: ['small', 'medium', 'large'],
  style: ['outlined', 'inverted'],
  state: ['loading', 'active', 'disabled']
};

Lux.Button.directive = {
  params: [
    'type',
    'size',
    'style',
    'state',
    'loading',
    'active',
    'disabled'
  ],
  paramWatchers: (function() {
    var watchers = {};
    var options = Lux.Button.options;
    
    for (var option in options) {
      watchers[option] = function(newVal, oldVal) {
        this.el.classList.remove('is-' + oldVal);
        if (options[option].indexOf(newVal) > -1) {
          this.el.classList.add('is-' + newVal);
        }
      };
    }
    
    options.state.forEach(function(state) {
      watchers[state] = function(newVal, oldVal) {
        this.el.classList.remove('is-' + state);
        if (newVal !== false && newVal !== 'false') {
          this.el.classList.add('is-' + state);
        }
      }
    });
    
    return watchers;
  })(),
  bind: function() {
    var vm = this;
    
    vm.el.classList.add('button');
    
    var params = vm.params;
    var options = Lux.Button.options;
    
    for (var option in options) {
      if (option in params && options[option].indexOf(params[option]) > -1) {
        vm.el.classList.add('is-' + params[option]);
      }
    }
    
    options.state.forEach(function(state) {
      if (state in params && params[state] != false && params[state] != 'false') {
        vm.el.classList.add('is-' + state);
      }
    });
  }
};

Lux.ButtonGroup = {};

Lux.ButtonGroup.directive = {
  twoWay: true,
  bind: function() {
    var vm = this;
    
    vm.el.classList.add('control');
    vm.el.classList.add('has-addons');
    
    for (var i = 0; i < vm.el.children.length; i++) {
      vm.el.children[i].addEventListener('click', function() {
        vm.set(this.dataset.value);
      });
    }
  },
  update: function(value) {
    var vm = this;
    
    Vue.nextTick(function() {
      var previousActive = vm.el.querySelector('.is-active');
      if (previousActive) previousActive.classList.remove('is-active');
      vm.el.querySelector('[data-value="' + value + '"]').classList.add('is-active');
    });
  }
};