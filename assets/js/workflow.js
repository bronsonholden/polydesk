$(document).ready(function () {
  var container = $('#target')[0];

  var graph = new WorkflowGraph(container);

  new mxRubberband(graph);

  graph.setPanning(true);
  graph.setConnectable(true);
  graph.setHtmlLabels(true);
  graph.setAllowDanglingEdges(false);

  mxEvent.disableContextMenu(container);

  var parent = graph.getDefaultParent();

  graph.getModel().beginUpdate();

  mxConstraintHandler.prototype.intersects = function (icon, point, source, existingEdge) {
    return (!source || existingEdge) || mxUtils.intersects(icon.bounds, point);
  }

  graph.connectionHandler.isConnectableCell = function (cell) {
    return true;
  }

  mxEdgeHandler.prototype.isConnectableCell = function (cell) {
    return graph.connectionHandler.isConnectableCell(cell);
  }

  try {
    var v1 = graph.insertVertex(parent, null, 'Hello', 20, 20, 150, 50);
    v1.setConnectable(false);
    var v2 = graph.insertVertex(parent, null, 'World', 200, 150, 150, 50);
    v2.setConnectable(false);

    var row = v1.insert(new mxCell('test', new mxGeometry(0, 0, 75, 25), 'table'));
    row.setVertex(true);
    var row = v1.insert(new mxCell('test', new mxGeometry(75, 0, 75, 25), 'table'));
    row.setVertex(true);

    var port = graph.insertTerminal(v1, null, 'Source', 'string', false, 1, 0.5, 16, 16, 'sourcePort;align=right', true);
    port.geometry.offset = new mxPoint(-8, -8);
    var port = graph.insertTerminal(v2, null, 'Target', 'string', true, 0, 0.5, 16, 16, 'targetPort;align=left', true);
    port.geometry.offset = new mxPoint(-8, -8);
  } finally {
    graph.getModel().endUpdate();
  }
});
