function WorkflowGraph(container) {
  mxGraph.call(this, container);

  this.connectionHandler.targetConnectImage = true;

  var style;

  style = new Object();
  style[mxConstants.STYLE_FONTCOLOR] = '#774400';
  style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
  style[mxConstants.STYLE_PERIMETER_SPACING] = '6';
  style[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_LEFT;
  style[mxConstants.STYLE_LABEL_POSITION] = mxConstants.ALIGN_RIGHT;
  style[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_MIDDLE;
  style[mxConstants.STYLE_FONTSIZE] = '10';
  style[mxConstants.STYLE_FONTSTYLE] = 2;
  style[mxConstants.ARROW_SPACING] = 5;
  style[mxConstants.STYLE_IMAGE_WIDTH] = '16';
  style[mxConstants.STYLE_IMAGE_HEIGHT] = '16';
  this.getStylesheet().putCellStyle('targetPort', style);

  style = new Object();
  style[mxConstants.STYLE_FONTCOLOR] = '#774400';
  style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
  style[mxConstants.STYLE_PERIMETER_SPACING] = '6';
  style[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_LEFT;
  style[mxConstants.STYLE_LABEL_POSITION] = mxConstants.ALIGN_LEFT;
  style[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_MIDDLE;
  style[mxConstants.STYLE_FONTSIZE] = '10';
  style[mxConstants.STYLE_FONTSTYLE] = 2;
  style[mxConstants.ARROW_SPACING] = 5;
  style[mxConstants.STYLE_IMAGE_WIDTH] = '16';
  style[mxConstants.STYLE_IMAGE_HEIGHT] = '16';
  this.getStylesheet().putCellStyle('sourcePort', style);

  style = this.getStylesheet().getDefaultEdgeStyle();
  style[mxConstants.STYLE_LABEL_BACKGROUNDCOLOR] = '#FFFFFF';
  style[mxConstants.STYLE_STROKEWIDTH] = '1';
  style[mxConstants.STYLE_ROUNDED] = true;
  style[mxConstants.STYLE_EDGE] = mxEdgeStyle.EntityRelation;

  var graph = this;

  this.connectionHandler.addListener(mxEvent.CONNECT, function (sender, evt) {
    var edge = evt.getProperty('cell');
    var source = graph.getModel().getTerminal(edge, true);
    var target = graph.getModel().getTerminal(edge, false);

    // TODO: Set edge color based on port type
    graph.setCellStyles('strokeColor', WorkflowTypeColor(source.getType()), [ edge ]);
  });
}

WorkflowGraph.prototype = Object.create(mxGraph.prototype);

WorkflowGraph.prototype.isValidSource = function (terminal) {
  if (!(terminal instanceof WorkflowTerminal)) {
    return false;
  }

  return terminal.isOutput();
}

WorkflowGraph.prototype.isValidTarget = function (terminal) {
  if (!(terminal instanceof WorkflowTerminal)) {
    return false;
  }

  return terminal.isInput();
}

WorkflowGraph.prototype.insertTerminal = function (parent, id, value, type, input, x, y, width, height, style, relative) {
  var geometry = new mxGeometry(x, y, width, height);

  geometry.offset = new mxPoint(-8, 0);
  geometry.relative = (relative !== null) ? relative : false;

  var terminal = new WorkflowTerminal(type, input, value, geometry, style);

  terminal.setId(id);
  terminal.setVertex(true);
  terminal.setConnectable(true);

  this.addCell(terminal, parent);

  return terminal;
}

WorkflowGraph.prototype.isValidConnection = function (source, target) {
  if (!(source instanceof WorkflowTerminal) || !(target instanceof WorkflowTerminal)) {
    return false;
  }

  if (source.isInput() || target.isOutput()) {
    return false;
  }

  if (source.getType() !== target.getType()) {
    return false;
  }

  return true;
}
