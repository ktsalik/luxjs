var Lux = {
  VERSION: '0.0.1'
};

Lux.install = function(Vue, options) {
  Vue.component('lbutton', this.ButtonComponent);
  Vue.directive('addons-button', this.AddonsButton);
};
