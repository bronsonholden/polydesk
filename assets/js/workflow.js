$(document).ready(function () {
  var targetElement = $('body')[0];

  Rpd.renderNext('html', targetElement, {
    style: 'quartz',
    inletAcceptsMultipleLinks: true,
    fullPage: true,
    linkForm: 'curve'
  });

  var patch = Rpd.addPatch('Test Patch');
  var node = patch.addNode('test-node');

  patch.resizeCanvas();
});
