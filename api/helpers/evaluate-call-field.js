const jsep = require('jsep');

module.exports = {
  friendlyName: 'Evaluate Call Expression: field()',
  description: 'Evaluates a formula function call: field()',
  sync: true,
  inputs: {
    arguments: {
      type: 'ref',
      required: true
    },
    context: {
      type: 'ref',
      required: true
    }
  },
  exits: {
    success: {
      outputFriendlyName: 'Operation Result',
      outputDescription: 'Result of the operation'
    }
  },
  fn: (inputs, exits) => {
    var field, set;

    // field("fieldname")
    // field("setname", "fieldname")
    if (inputs.arguments.length === 1) {
      field = inputs.arguments[0].value;
      set = _.last(inputs.context.setStack);
    } else if (inputs.arguments.length === 2) {
      set = inputs.arguments[0].value;
      field = inputs.arguments[1].value;
    } else {
      return exits.success({
        err: 'Invalid arguments for function: field'
      });
    }

    if (typeof field !== 'string' || typeof set !== 'string') {
      return exits.success({
        err: 'Invalid set/field specification'
      });
    }

    var circular = false;

    _.each(inputs.context.formulaStack, (val) => {
      if (val.field === field && val.set === set) {
        circular = true;
        return false;
      }
    });

    if (circular) {
      return exits.success({
        err: 'Circula formula'
      });
    }

    var metadataField = _.get(inputs.context.metadataSets, [ set, field ]);

    if (!metadataField) {
      return exits.success({
        err: `Invalid metadata field <${set}, ${field}>`
      });
    }

    // If not a formula, just return the value
    if (metadataField.type !== 'F') {
      return exits.success({
        type: metadataField.type,
        value: metadataField.value
      });
    }

    // If not already calculated, do so
    if (!_.has(inputs.context.formulaResults, [ set, field ])) {
      inputs.context.setStack.push(set);
      inputs.context.formulaStack.push({
        set: set,
        field: field
      });

      var result = sails.helpers.evaluateExpressionNode(jsep(inputs.context.metadataSets[set][field].value), inputs.context);
      inputs.context.setStack.pop();
      inputs.context.formulaStack.pop();

      if (result) {
        _.set(inputs.context.formulaResults, [ set, field ], result);
      }

      return exits.success(result);
    } else {
      return exits.success(_.get(inputs.context.formulaResults, [ set, field ]));
    }
  }
};
