$(document).ready(function () {
  var targetElement = $('body')[0];

  Rpd.renderNext('svg', targetElement, {
    style: 'blender',
    inletAcceptsMultipleLinks: true,
    fullPage: true,
    linkForm: 'curve'
  });

  Rpd.channeltype('workflow/exec', {
    adapt: val => val
  });

  Rpd.nodetype('workflow/start', {
    outlets: {
      '>': {
        alias: 'done',
        type: 'workflow/exec'
      }
    }
  });

  Rpd.nodetype('workflow/end', {
    inlets: {
      '>': {
        alias: 'exec',
        type: 'workflow/exec'
      }
    }
  });

  var patch = Rpd.addPatch('Test Patch');
  patch.addNode('workflow/start');
  var node = patch.addNode('workflow/end');
  console.log(node);

  patch.resizeCanvas();
});
