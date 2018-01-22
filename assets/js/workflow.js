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

  graph.connectionHandler.createEdgeState = function (me) {
    var edge = graph.createEdge(null, null, null, null, null, 'edgeStyle=orthogonalEdgeStyle;curved=1');

    return new mxCellState(this.graph.view, edge, this.graph.getCellStyle(edge));
  }

  graph.connectionHandler.isConnectableCell = function (cell) {
    return true;
  }

  mxEdgeHandler.prototype.isConnectableCell = function (cell) {
    return graph.connectionHandler.isConnectableCell(cell);
  }

  graph.getLabel = function (cell) {
    if (this.getModel().isVertex(cell)) {
      if (this.isCellCollapsed(cell)) {
        return '<table style="overflow: hidden;" width="100%" height="100%" border="1" cellpadding="4"><tr><th>Table1</th></tr></table>';
      } else {
        return '<table style="overflow: hidden;" width="100%" height="100%" border="1" cellpadding="4"><tr colspan="2"><th>Table1</th></tr><tr><td>Column1</td><td>string</td></tr></table>';
      }
    }
  }

  try {
    var v1 = graph.insertVertex(parent, null, 'Hello', 20, 20, 80, 30, 'align=left');
    v1.setConnectable(false);
    var v2 = graph.insertVertex(parent, null, 'World', 200, 150, 80, 30, 'align=left');
    v2.setConnectable(false);

    graph.insertTerminal(v1, null, 'Trigger', 'string', false, 0, 0.25, 16, 16, 'port;image=editors/images/overlays/flash.png;align=right;imageAlign=right;spacingRight=18', true);
    graph.insertTerminal(v2, null, 'Trigger', 'string', true, 0, 0.25, 16, 16, 'port;image=editors/images/overlays/flash.png;align=right;imageAlign=right;spacingRight=18', true);

    graph.updateCellSize(v1);
    graph.updateCellSize(v2);
  } finally {
    graph.getModel().endUpdate();
  }
});
