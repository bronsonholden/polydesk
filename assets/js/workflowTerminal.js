function WorkflowTerminal(type, input, value, geometry, style) {
  mxCell.call(this, value, geometry, style);

  this.type = type;
  this.input = input;
}

WorkflowTerminal.prototype = Object.create(mxCell.prototype);

WorkflowTerminal.prototype.isInput = function () {
  return this.input;
}

WorkflowTerminal.prototype.isOutput = function () {
  return !this.input;
}

WorkflowTerminal.prototype.getType = function () {
  return this.type;
}

WorkflowTerminal.prototype.setType = function (type) {
  this.type = type;
}

WorkflowTerminal.prototype.setIsInput = function (input) {
  this.input = input;
}

WorkflowTerminal.prototype.setIsOutput = function (output) {
  this.input = !output;
}
