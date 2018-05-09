(function ($) {
  // Our search popover
  var self;
  // Search results
  var results;
  var atResult;
  var maxResults;
  var searchTerm;

  $(document).bind('keydown', 'ctrl+f', function (e) {
    // Stop default search bar from popping up
    e.preventDefault();
    e.stopPropagation();

    if (self.is(':visible')) {
      return self.hide();
    }

    self.show();

    results = null;

    // Give input focus to the search input bar
    $('#search-input').focus();

    // Queue one-time event to hide the popover when focus is lost
    $(document).one('keydown', null, 'esc', function () {
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

    // Begin search on enter (return), close dialog on Esc
    $('#search-input').bind('keydown', 'return', function () {
      $('#search-next-result').click();
    }).bind('keydown', 'esc', function () {
      self.hide();
    });

    // Highlight and scroll to next search result
    $('#search-next-result').click(function () {
      var term = $('#search-input').val();

      if (!term) {
        return;
      }

      // Simply don't do search with fewer than 3 characters to match
      if (term.length < 3) {
        return;
      }

      if (term !== searchTerm || !results) {
        // Remove old search results
        $('span.highlighted').removeClass('highlighted');

        // Save new term
        searchTerm = term;
        results = $('.textLayer > div:contains(' + searchTerm + ')');
        maxResults = results.length;
        atResult = 0;
      }

      // No more results
      if (atResult >= maxResults) {
        console.log('No more results');
        return;
      }

      // Get element for this result
      var el = results.get(atResult);

      // Go to next result
      atResult += 1;

      // Get text before and after result so we can highlight just the matching text
      var text = $(el).text();
      var from = text.indexOf(searchTerm);
      var to = from + searchTerm.length;
      var before = text.slice(0, from);
      var result = text.slice(from, to);
      var after = text.slice(to);

      $(el).html(`${before}<span class="highlighted">${result}</span>${after}`);
      el.scrollIntoView();
    });
  });
})($);
