$(document).ready(function () {
  function resize() {
    $('#target').css({
      'min-width': '100%',
      'min-height': '100%'
    });

    requestAnimationFrame(resize);
  }

  resize();


  var container = $('#target')[0];

  var graph = new mxGraph(container);

  new mxRubberband(graph);

  graph.setPanning(true);
  mxEvent.disableContextMenu(container);

  var parent = graph.getDefaultParent();

  graph.getModel().beginUpdate();
  try {
    var v1 = graph.insertVertex(parent, null, 'Hello', 20, 20, 80, 30);
    var v2 = graph.insertVertex(parent, null, 'World', 200, 150, 80, 30);
    var e1 = graph.insertEdge(parent, null, '', v1, v2);
  } finally {
    graph.getModel().endUpdate();
  }
});
