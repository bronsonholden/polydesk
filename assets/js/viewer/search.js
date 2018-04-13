(function ($) {
  // Our search popover
  var self;

  $(document).bind('keydown', 'ctrl+f', function (e) {
    // Stop default search bar from popping up
    e.preventDefault();
    e.stopPropagation();

    self.show();

    // Give search bar input focus, and queue one-time event to hide the popover when focus is lost
    $('#search-input').focus().one('focusout', function () {
      self.hide();
    }).one('keydown', null, 'esc', function () {
      self.hide();
    });
  });

  $(document).ready(function () {
    // Create the search bar popover
    self = $('#search').popover({
      placement: 'bottom',
      trigger: 'manual',
      content: $('#search')
    }).hide();

    // CTRL+F on an input still brings up the search window, but we want this hotkey to
    // simply hide the search prompt
    $('#search-input').bind('keydown', 'ctrl+f', function (e) {
      e.preventDefault();
      e.stopPropagation();
      self.hide();
    });
  });
})(jQuery);
