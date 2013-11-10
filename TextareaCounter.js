(function ($) {

  $.fn.TextareaCounter = function (options) {
    var opts = $.extend($.fn.TextareaCounter.defaults, options);
    return this.each(function () {
      var $this = $(this),
        $status = $this.parent().find(opts.statusSelector),
        $statusCount = $status.find(opts.statusCountSelector),
        truncate = $this.parent().find('[data-truncate]'),
        maxLen = $this.attr(opts.maxLengthAttribute),
        countFn = opts.countFn,
        lastVal = $this.val();

      $this.bind('keyup change', function () {
        var left = maxLen - countFn($this.val());
        if (0 > left) {
          if(truncate.length) {
            if($status.hasClass('counterWords')) {
              lastVal = $this.val().split(" ").splice(0,maxLen).join(" ");
            } else {
              lastVal = $this.val().substr(0, maxLen);
            }
          }
          if (!$this.hasClass('ui-state-error')) {
            $this.val(lastVal);
            $status.addClass('ui-state-error');
            $statusCount.text('0');
          }
        } else {
          lastVal = $this.val();
          $statusCount.text(left);
          if (0 < left) {
            $status.removeClass('ui-state-error');
          }
        }
      });
    });
  };
  $.fn.TextareaCounter.defaults = {
    'statusSelector': 'span.counterChars',
    'statusCountSelector': 'span',
    'maxLengthAttribute': 'data-maxchars',
    'countFn': function (val) {return val.trim().replace(/\r?\n/g, '\r\n').length; }
  };

  $(document).ready(function () {
    $('textarea[data-maxchars]').TextareaCounter();
    $('textarea[data-maxwords]').TextareaCounter({
      'statusSelector': 'span.counterWords',
      'maxLengthAttribute': 'data-maxwords',
      'countFn': function (val) {return val.trim().split(/\s+/).length; }
    });
  });

}(jQuery));