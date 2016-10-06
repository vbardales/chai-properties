[![Build Status](https://travis-ci.org/CurtisHumphrey/chai-properties.svg?branch=master)](https://travis-ci.org/CurtisHumphrey/chai-properties)
# chai-properties

### Intallation:
```bash
npm install --save chai-properties
```

Properties matcher for chai

Make assertions that values have all the same attributes and values without asserting strict object equality.

### browser-side

include chai properties after chai:

```
<script src="lodash.js"></script>
<script src="chai.js"></script>
<script src="chai-properties.js"></script>
```

### server-side

have chai use chai-properties:

```js
var chai = require('chai');
chai.use(require('chai-properties'));
```

## Assertions


### properties(object)

partially compare object attributes and values

```js
var subject = { a: 'a', b: 'b', c: 'c' };
subject.should.have.properties({ a: 'a' });
subject.should.have.properties({ a: 'a', b: 'b' });
subject.should.not.have.properties({ a: 'a', z: 'z' });
subject.should.not.have.properties({ a: '1' });

expect(subject).to.have.properties({ a: 'a' });
expect(subject).to.have.properties({ a: 'a', b: 'b' });
expect(subject).to.not.have.properties({ a: 'a', z: 'z' });
expect(subject).to.not.have.properties({ a: '1' });

assert.haveProperties(subject, { a: 'a' });
assert.haveProperties(subject, { a: 'a', b: 'b' });
assert.notHaveProperties(subject, { a: 'a', z: 'z' });
assert.notHaveProperties(subject, { a: '1' });
```

## Difference between expectation and actual result

`properties` assertion will show difference between expectation and actual result when asserion will fail.

```js
var subject = { a: 'a', b: 'b', c: 'c' };
expect(subject).to.have.properties({ a: 'a', b: 'c' });
```

```
AssertionError: expected { a: 'a', b: 'b', c: 'c' }
  to have properties { a: 'a', b: 'c' }, but found { a: 'a', b: 'b' }

+ expected - actual

 {
   "a": "a"
-  "b": "b"
-  "c": "c"
+  "b": "c"
 }
```
