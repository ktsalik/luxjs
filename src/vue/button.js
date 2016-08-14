Lux.Button = {
  replace: true,
  template: '<button class="button" ' +
    'v-bind:class="[ ' +
    'type !== undefined ? \'is-\' + type : \'\', ' +
    'size !== undefined ? \'is-\' + size : \'\', ' +
    'outlined == true ? \'is-outlined\' : \'\', ' +
    'inverted == true ? \'is-inverted\' : \'\', ' +
    'loading == true ? \'is-loading\' : \'\', ' +
    'active == true ? \'is-active\' : \'\', ' +
    'disabled == true ? \'is-disabled\' : \'\', ' +
    ']">{{{text || content}}}</button>',
  props: [
    'text',
    'content',
    'type',
    'size',
    'outlined',
    'inverted',
    'loading',
    'active',
    'disabled'
  ]
};

Lux.ButtonGroup = {
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