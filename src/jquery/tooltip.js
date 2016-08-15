Lux.Tooltip = function() {
  var elements = this;
  
  elements.each(function(i, element) {
    var tooltipEl = $('<div class="tooltip hidden"></div>').html($(element).data('tooltip')).appendTo('body');
    
    $(element).hover(function() {
      var position = $(this).offset();
      var fixedOffset = 3;
      position.left += ($(this).outerWidth() / 2) - (tooltipEl.outerWidth() / 2);
      if (this.getBoundingClientRect().top >= tooltipEl.outerHeight()) {
        position.top -= tooltipEl.outerHeight() + fixedOffset;
      } else {
        position.top += tooltipEl.outerHeight() - fixedOffset;
      }
      tooltipEl.css(position);
      tooltipEl.removeClass('hidden');
    }, function() {
      tooltipEl.addClass('hidden');
    });
  });
};

$.fn.tooltip = Lux.Tooltip;