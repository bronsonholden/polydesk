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
  graph.setConnectable(true);
  mxEvent.disableContextMenu(container);

  var parent = graph.getDefaultParent();

  graph.getModel().beginUpdate();

  graph.getAllConnectionConstraints = function (terminal) {
    if (terminal && this.model.isVertex(terminal.cell)) {
      return [
        new mxConnectionConstraint(new mxPoint(1, 0), false, 'Exec')
      ];
    }
  }

  mxConstraintHandler.prototype.intersects = function (icon, point, source, existingEdge) {
    return (!source || existingEdge) || mxUtils.intersects(icon.bounds, point);
  }

  graph.connectionHandler.createEdgeState = function (me) {
    var edge = graph.createEdge(null, null, null, null, null, 'edgeStyle=orthogonalEdgeStyle;curved=1');

    return new mxCellState(this.graph.view, edge, this.graph.getCellStyle(edge));
  }

  graph.connectionHandler.isConnectableCell = function (cell) {
    return false;
  }

  mxEdgeHandler.prototype.isConnectableCell = function (cell) {
    return graph.connectionHandler.isConnectableCell(cell);
  }

  try {
    var v1 = graph.insertVertex(parent, null, 'Hello', 20, 20, 80, 30);
    var v2 = graph.insertVertex(parent, null, 'World', 200, 150, 80, 30);

  } finally {
    graph.getModel().endUpdate();
  }
});
