const sails = require('sails');
const { describe, it, beforeEach } = require('mocha');
const { expect } = require('chai');
const jsep = require('jsep');

describe('Evaluate formula expressions', function () {
  beforeEach(function (done) {
    this.context = sails.helpers.createFormulaContext();
    done();
  });

  // Number tests
  [
    {
      expr: '+1',
      value: 1
    },
    {
      expr: '-0',
      value: 0
    },
    {
      expr: '+0',
      value: 0
    },
    {
      expr: '-1',
      value: -1
    },
    {
      expr: '1 + 1',
      value: 2
    },
    {
      expr: '-1 + 1',
      value: 0
    },
    {
      expr: '-1 + -1',
      value: -2
    },
    {
      expr: '(-1) + (1)',
      value: 0
    },
    {
      expr: '(-1 + 1) - 1',
      value: -1
    },
    {
      expr: '((1 + 1) + 1)',
      value: 3
    },
    {
      expr: '-(1 + 1)',
      value: -2
    },
    {
      expr: '-(-1 + 1)',
      value: 0
    },
    {
      expr: '-(1 + 1)',
      value: -2
    },
    {
      expr: '--1',
      value: 1
    },
    {
      expr: '-(-1)',
      value: 1
    }
  ].forEach((test) => {
    it(test.expr, function (done) {
      const res = sails.helpers.evaluateExpressionNode(jsep(test.expr), this.context);
      expect(res.value).to.be.a('number');
      expect(res.value).to.equal(test.value);
      done();
    });
  });

  // Number comparison tests
  [
    {
      expr: '1 < 2',
      value: true
    },
    {
      expr: '2 < 1',
      value: false
    },
    {
      expr: '1 == 1',
      value: true
    },
    {
      expr: '1 == 2',
      value: false
    },
    {
      expr: '1 <= 1',
      value: true
    },
    {
      expr: '1 <= 2',
      value: true
    },
    {
      expr: '1 >= 1',
      value: true
    },
    {
      expr: '1 >= 2',
      value: false
    },
    {
      expr: '1 != 2',
      value: true
    },
    {
      expr: '1 != 1',
      value: false
    }
  ].forEach((test) => {
    it(test.expr, function (done) {
      const res = sails.helpers.evaluateExpressionNode(jsep(test.expr), this.context);
      expect(res.value).to.be.a('boolean');
      expect(res.value).to.equal(test.value);
      done();
    });
  });

  // Boolean comparison
  [
    {
      expr: '!true',
      value: false
    },
    {
      expr: '!false',
      value: true
    },
    {
      expr: '!!true',
      value: true
    },
    {
      expr: '!!false',
      value: false
    },
    {
      expr: 'true == false',
      value: false
    },
    {
      expr: 'true != false',
      value: true
    },
    {
      expr: 'false == false',
      value: true
    },
    {
      expr: 'true == true',
      value: true
    },
    {
      expr: 'true || true',
      value: true
    },
    {
      expr: 'true || false',
      value: true
    },
    {
      expr: 'true && true',
      value: true
    },
    {
      expr: 'true && false',
      value: false
    },
    {
      expr: 'false && false',
      value: false
    }
  ].forEach((test) => {
    it(test.expr, function (done) {
      const res = sails.helpers.evaluateExpressionNode(jsep(test.expr), this.context);
      expect(res.value).to.be.a('boolean');
      expect(res.value).to.equal(test.value);
      done();
    });
  });


  // String tests
  [
    {
      expr: '"a" + "b"',
      value: 'ab'
    },
    {
      expr: '"1" + "b"',
      value: '1b'
    },
    {
      expr: '"a" + "2"',
      value: 'a2'
    }
  ].forEach((test) => {
    it(test.expr, function (done) {
      const res = sails.helpers.evaluateExpressionNode(jsep(test.expr), this.context);
      expect(res.value).to.be.a('string');
      expect(res.value).to.equal(test.value);
      done();
    });
  });
});
