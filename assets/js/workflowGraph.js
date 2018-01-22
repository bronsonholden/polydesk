function WorkflowGraph(container) {
  return mxGraph.call(this, container);
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
