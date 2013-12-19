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

    if(flag(this, 'negate')) {
      throw new Error('Not implemented yet');
    }

    var assert = true;
    try {
      _.each(expected, function (value, key) {
        (new chai.Assertion(obj)).property(key, value);
      });
    } catch (e) {
      assert = false;
    }

    var diff = _.pick(obj, _.keys(expected));
    var moreMessage = _.size(diff) ? ', but found ' + inspect(diff) : '';

    this.assert(
      assert
      , 'expected #{this} to have properties #{exp}' + moreMessage
      , 'expected #{this} to not have properties #{exp}' + moreMessage
      , expected
      , obj
      , true
    )
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
