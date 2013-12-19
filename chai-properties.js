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

  // contain => _.where, check _.isEqual
  // containOnce => contain, check size of returned array
  // like => _.isEqual

  chai.Assertion.addMethod('properties', function(expected) {
    var obj = flag(this, 'object');

    var msg = flag(this, 'negate') ? ' not ' : '';
    var msgNot = flag(this, 'negate') ? '' : ' not ';

    var diff = _.pick(obj, _.keys(expected));

    var assert = true;
    try {
      _.each(expected, function (value, key) {
        var assertion = new chai.Assertion(diff);

        if (flag(this, 'negate')) {
          flag(assertion, 'negate');
        }

        assertion.property(key, value);
      });
    } catch (e) {
      assert = false;
    }

    this.assert(
      assert
      , 'expected #{this} to ' + msg + 'have properties #{exp}'
      , 'expected #{this} to ' + msgNot + 'have properties #{exp}'
      , expected
      , diff
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
