var Lux = {
  VERSION: '0.0.1'
};

Lux.install = function(Vue, options) {
  Vue.directive('lbutton', this.Button.directive);
  Vue.directive('buttonGroup', this.ButtonGroup.directive);
};
