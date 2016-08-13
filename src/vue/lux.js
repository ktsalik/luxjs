var Lux = {
  VERSION: '0.0.1'
};

Lux.install = function(Vue, options) {
  Vue.component('lux-button', this.ButtonComponent);
  Vue.directive('lux-addons-button', this.AddonsButton);
};
