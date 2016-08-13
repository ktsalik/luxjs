var Lux = {
  VERSION: '0.0.1'
};

Lux.install = function(Vue, options) {
  Vue.component('lux-button', this.ButtonComponent);
  Vue.directive('lux-addons-button', this.AddonsButton);
};

Lux.ButtonComponent = {
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

Lux.AddonsButton = {
  twoWay: true,
  bind: function() {
    var vm = this;
    for (var i = 0; i < vm.el.children.length; i++) {
      vm.el.children[i].addEventListener('click', function() {
        var previousActive = vm.el.querySelector('.is-active');
        if (previousActive) previousActive.setAttribute('class', previousActive.getAttribute('class').replace('is-active', ''));
        vm.set(this.dataset.value);
        this.setAttribute('class', this.getAttribute('class') + ' is-active');
      });
    }
  }
};