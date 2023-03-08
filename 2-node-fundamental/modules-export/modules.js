// We can log the arguments of the module,
// and the wrapper function that gains access to the module.
// console.log(arguments);
// console.log(require('module').wrapper);

// requiring the class from test-module-1
const calculator = require('./test-module-1');
const calc1 = new calculator();
console.log(`5 + 2 = ${calc1.add(2, 5)}`);

// Requiring the functions from test-module-2, 
// Here we got two options: require everything, or require only one function..
const calc2 = require('./test-module-2'); // require everything
console.log(`5 * 2 = ${calc2.multiply(5, 2)}`);
const { divide } = require('./test-module-2'); // require only one function
console.log(`6 / 2 = ${divide(6, 2)}`);

// caching
// Here we export "test-module-3" 3 time, and the result should be the same * 3, 
// but because of the caching, the module will be loaded only once
// and the function will be executed 3 time but the top level code will be executed
// only once. 
require('./test-module-3')();
require('./test-module-3')();
require('./test-module-3')();

