(function(plugin){
  if (
    typeof require === 'function'
    && typeof exports === 'object'
    && typeof module === 'object'
  ) {
    // NodeJS
    module.exports = plugin;
  } else if (
    typeof define === 'function'
    && define.amd
  ) {
    // AMD
    define(function () {
      return plugin;
    });
  } else {
    // Other environment (usually <script> tag): plug in to global chai instance directly.
    chai.use(plugin);
  }
}(function(chai, utils){
  var _;
  var flag = utils.flag;
  var inspect = utils.inspect;

  if (
    typeof window === 'object'
    && typeof window._ == 'function'
  ) {
    // browser-side
    _ = window._;
  } else {
    // server-side
    _ = require('lodash');
  }

  chai.Assertion.addMethod('properties', function(expected) {
    var obj = flag(this, 'object');

    function check(testDescr, testVal) {
      _.each(obj, function (val, attr) {
        if (!(attr in testVal)) {
          throw Error();
        }

        if (typeof val !== typeof testVal[attr]) {
          throw Error();
        }

        if (_.isArray(val)) {
          if (_.size(val) !== _.size(testVal[attr])) {
            throw Error();
          }

          check(val, testVal[attr]);
        }

        if (_.isObject(val)) {
          check(val, testVal[attr]);
          return;
        });

        if (val !== testVal[attr]) {
          throw Error();
        }
      })
    }

    var assert = true;
    try {
      _.each(expected, function (value, key) {
        var assertion = new chai.Assertion(obj);

        if (flag(this, 'negate')) {
          return assertion.not.property(key, value);
        }

        assertion.property(key, value);
      }, this);
    } catch (e) {
      console.log(e)
      assert = false;
    }

    if (flag(this, 'negate')) {
      assert = !assert;
    }
    console.log(obj, expected, flag(this, 'negate'), diff, '>', assert)
    var diff = _.pick(obj, _.keys(expected));

    this.assert(
      assert
      , 'expected #{this} to have properties #{exp}' + (_.size(diff) ? ', but found ' + inspect(diff) : '')
      , 'expected #{this} to not have properties #{exp}' + (_.size(diff) ? ', but found ' + inspect(diff) : '')
      , expected
      , obj
    );

    console.log('HERE');
  });

  //export tdd style
  var assert = chai.assert;
  assert.haveProperties = function (val, exp, msg) {
    new chai.Assertion(val, msg).to.have.properties(exp);
  };
  assert.notHaveProperties = function (val, exp, msg) {
    new chai.Assertion(val, msg).to.not.have.properties(exp);
  };
}));
