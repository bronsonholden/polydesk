const BigNumber = require('bignumber.js');

module.exports = {
  friendlyName: 'Evaluate Binary Number',
  description: 'Evaluates a binary operation on two native number metadata values',
  sync: true,
  inputs: {
    node: {
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
    if (!inputs.node) {
      return exits.success({
        err: 'Invalid expression node'
      });
    }

    switch (inputs.node.type) {
    case 'CallExpression':
      return exits.success(sails.helpers.evaluateCallExpression(inputs.node.callee.name, inputs.node.arguments, inputs.context));
    case 'Literal':
      return exits.success(sails.helpers.normalizeFormulaOperand(inputs.node.value));
    case 'UnaryExpression':
      var operand = sails.helpers.evaluateExpressionNode(inputs.node.argument, inputs.context);

      if (!operand) {
        return exits.success({
          err: 'Invalid operand type: ' + typeof operand
        });
      }

      switch (operand.type) {
      case 'N':
        return exits.success(sails.helpers.evaluateUnaryNumber(operand, inputs.node.operator));
      case 'P':
        return exits.success(sails.helpers.evaluateUnaryPrecision(operand, inputs.node.operator));
      case 'B':
        return exits.success(sails.helpers.evaluateUnaryBoolean(operand, inputs.node.operator));
      default:
        return exits.success({
          err: 'Unsupported operand type for operation ' + inputs.node.operator
        });
      }
    case 'BinaryExpression':
    case 'LogicalExpression':
      var left = sails.helpers.evaluateExpressionNode(inputs.node.left, inputs.context);
      var right = sails.helpers.evaluateExpressionNode(inputs.node.right, inputs.context);

      if (!left || !right) {
        return exits.success({
          err: 'Invalid arguments for operator ' + inputs.node.operator
        });
      }

      if (left.err) {
        return exits.success({
          err: left.err
        });
      } else if (right.err) {
        return exits.success({
          err: right.err
        });
      }

      var adapter = {
        'B,B': (lval, rval, operator) => {
          return sails.helpers.evaluateBinaryBoolean(lval, rval, operator);
        },
        'N,N': (lval, rval, operator) => {
          return sails.helpers.evaluateBinaryNumber(lval, rval, operator);
        },
        'N,P': (lval, rval, operator) => {
          var tmp = new BigNumber(lval.value);

          // Cast native number to precision
          return sails.helpers.evaluateBinaryPrecision({
            type: 'P',
            value: tmp.toString()
          }, rval, operator);
        },
        'P,N': (lval, rval, operator) => {
          var tmp = new BigNumber(rval.value);

          // Cast native number to precision
          return sails.helpers.evaluateBinaryPrecision(lval, {
            type: 'P',
            value: tmp.toString()
          }, operator);
        },
        'P,P': (lval, rval, operator) => {
          return sails.helpers.evaluateBinaryPrecision(lval, rval, operator);
        },
        'S,S': (lval, rval, operator) => {
          return sails.helpers.evaluateBinaryString(lval, rval, operator);
        }
      };

      var spec = `${left.type},${right.type}`;

      if (adapter[spec]) {
        return exits.success(adapter[spec](left, right, inputs.node.operator));
      } else {
        return exits.success({
          err: 'Unsupported operation ' + inputs.node.operator
        });
      }
    default:
      return exits.success({
        err: 'Unsupported expression'
      });
    }
  }
};
