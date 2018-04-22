$(document).ready(function () {
  $(document).on('click', '.document-viewer-apply', function () {
    var metadataSets = {};

    $('.metadata-field-wrapper').each(function () {
      var setName = $(this).closest('.metadata-set').find('.metadata-set-label').val();
      var fieldName = $(this).find('.metadata-field-label').val();
      var type = $(this).find('.metadata-field .form-control').attr('fieldtype');
      var order = parseInt($(this).find('.metadata-field .form-control').attr('fieldorder'));
      var value = $(this).find('.metadata-field .form-control').val();

      if (!metadataSets[setName]) {
        metadataSets[setName] = {};
      }

      switch (type) {
      case 'F':
        metadataSets[setName][fieldName] = {
          type: type,
          value: decodeURI($(this).find('.metadata-field .form-control').attr('formula')),
          order: order
        };
        break;
      case 'NL':
        metadataSets[setName][fieldName] = {
          type: type,
          value: [],
          order: order
        };

        $(this).find('.metadata-field').each(function () {
          metadataSets[setName][fieldName].value.push($(this).find('.form-control').val());
        });

        break;
      default:
        metadataSets[setName][fieldName] = {
          type: type,
          value: value,
          order: order
        };
        break;
      }
    });

    var metadataOrdering = $('.metadata-set').map(function () {
      return $(this).closest('.metadata-set').find('.metadata-set-label').val();
    }).get().sort(function (a, b) {
      return metadataSets[a].setorder - metadataSets[b].setorder;
    });

    io.socket.post(window.location.pathname + '/metadata', {
      metadataSets: metadataSets,
      metadataOrdering: metadataOrdering,
      save: false
    }, function (data, res) {

      if (res.headers.location) {
        window.location.pathname = res.headers.location;
      } else {
        $.growl.notice({
          message: res.body.message,
          title: 'Success!',
          location: 'viewer'
        });
      }
    });
  });
});
