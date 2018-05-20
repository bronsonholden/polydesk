const BigNumber = require('bignumber.js');

module.exports = {
  friendlyName: 'Cast Number to Precision',
  description: 'Casts a number metadata value to a precision metadata value',
  sync: true,
  inputs: {
    number: {
      type: 'ref',
      required: true
    }
  },
  exits: {
    success: {
      outputFriendlyName: 'Precision number',
      outputDescription: 'The casted precision number'
    }
  },
  fn: (inputs, exits) => {
    var number = sails.helpers.normalizeFormulaOperand(inputs.number);

    if (number.type === 'P') {
      return exits.success(number);
    } else {
      var big = new BigNumber(number.value);

      if (!big.isNaN()) {
        return exits.success({
          type: 'P',
          value: big.toString()
        });
      }
    }

    return exits.success({
      err: 'Unable to cast non-number to precision'
    });
  }
};
