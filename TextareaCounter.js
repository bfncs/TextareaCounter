(function ($) {
 
  var checkWordLimit = function (elem) {
    console.log('recalc');
    var count = elem.attr('data-maxwords') - elem.val().split(/\s+/).length;
    elem.parent().find("span.counterWords span").text(count);
  };
  $(document).ready(function () {
    $('textarea[data-maxchars]').each(function () {
      var $this = $(this);
      var $span = $this.parent().find("span.counterChars span");
      $this.bind("keyup change", function() {
        var count = $this.attr('data-maxchars') - $this.val().trim().replace(/\r?\n/g, '\r\n').length;
        $span.text(count);
      });
    });
 
    $('textarea[data-maxwords]').each(function () {
      var $this = $(this);
      var $span = $this.parent().find("span.counterWords span");
      $this.bind("keyup change", function () {
        var count = $this.attr('data-maxwords') - $this.val().trim().split(/\s+/).length;
        $span.text(count);
      });
    });
  });
 
}(jQuery));
