// console.log(arguments);
// console.log(require('module').wrapper);

// module.exports
const calculator = require('./test-module-1');
const calc1 = new calculator();
console.log(calc1.add(2, 5));

// exports the whole file ass object or one export from the file
// const calc2 = require('./test-module-2');
const { add } = require('./test-module-2');
console.log(add(2, 5));

// caching
// The functions will be excused 3 time,
// But the top level code will be require one time and be excused one time
require('./test-module-3')();
require('./test-module-3')();
require('./test-module-3')();

