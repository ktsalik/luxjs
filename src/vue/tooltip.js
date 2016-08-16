Lux.Tooltip = {};

Lux.Tooltip.directive = {
  params: [
    'placement',
    'trigger'
  ],
  paramWatchers: {
    placement: function(newVal, oldVal) {
      
    },
    trigger: function(newVal, oldVal) {
      
    }
  },
  data: {
    tooltip: null
  },
  bind: function() {
    var vm = this;
    var element = this.el;
    var tooltip = document.createElement('div');
    
    tooltip.classList.add('tooltip');
    tooltip.classList.add('hidden');
    document.body.appendChild(tooltip);
    vm.tooltip = tooltip;
    
    var placement = vm.params.placement || element.dataset.placement || 'auto';
    
    function positionTooltip() {
      var rect = element.getBoundingClientRect();
      var position = {
        left: rect.left + window.pageXOffset,
        top: rect.top + window.pageYOffset
      };
      var fixedOffset = 3;
      if (placement == 'auto') {
        if (element.getBoundingClientRect().top >= tooltip.clientHeight) {
          placement = 'top';
        } else {
          placement = 'bottom';
        }
      }
      switch (placement) {
        case 'top':
          position.left += (element.offsetWidth / 2) - (tooltip.offsetWidth / 2);
          position.top -= tooltip.offsetHeight + fixedOffset;
          break;
        case 'bottom':
          position.left += (element.offsetWidth / 2) - (tooltip.offsetWidth / 2);
          position.top += tooltip.offsetHeight + fixedOffset;
          break;
        case 'left':
          position.left -= tooltip.offsetWidth + fixedOffset;
          break;
        case 'right':
          position.left += element.offsetWidth + fixedOffset;
          break;
      }
      tooltip.style.top = position.top;
      tooltip.style.left = position.left;
    }
    
    element.addEventListener('mouseenter', function() {
      if ((vm.params.trigger || 'hover') == 'hover') {
        positionTooltip();
        tooltip.classList.remove('hidden');
      }
    });
    
    element.addEventListener('mouseleave', function() {
      if ((vm.params.trigger || 'hover') == 'hover') {
        tooltip.classList.add('hidden');
      }
    });
    
    element.addEventListener('click', function() {
      if ((vm.params.trigger || 'hover') == 'click') {
        if (tooltip.classList.contains('hidden')) {
          positionTooltip();
          tooltip.classList.remove('hidden');
        } else {
          tooltip.classList.add('hidden');
        }
      }
    });
  },
  update: function(value) {
    var vm = this;
    
    vm.tooltip.innerHTML = value;
  }
};
