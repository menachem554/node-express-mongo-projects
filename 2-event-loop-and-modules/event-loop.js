const fs = require('fs');
const crypto = require('crypto');

// To understand how threadpool works,  we will use one function that will be executed
// after a delay of two 2 seconds,
// and at the same time we executed 4 functions that encrypt a password.
// and we will see which of the functions finishes first execution,
// and how you can play with it by determining how many TRADE will be implemented
// in threadpool using the UV_THREADPOOL_SIZE...
const start = Date.now();
process.env.UV_THREADPOOL_SIZE = 1;

// Options for play with execution in the threadpool
setTimeout(() => console.log('Timer 1 finished'), 0);
setImmediate(() => console.log('Immediate 1 finished'));

fs.readFile('test-file.txt', () => {
  console.log('I/O finished');
  console.log('----------------');

  setTimeout(() => console.log('Timer 2 finished'), 0);
  setTimeout(() => console.log('Immediate 3 finished'), 2000);
  setImmediate(() => console.log('Immediate 2 finished'));

  // The deference between 'process.nextTick' and 'setImmediate' is that the 'process.nextTick'
  // will be executed first because it is append before every *face* in the eventLoop
  // unlink 'setImmediate' that executed every round of the eventLoop
  process.nextTick(() => console.log('Process.nextTick'));

  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'password encrypted');
  });

  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'password encrypted');
  });

  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'password encrypted');
  });

  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'password encrypted');
  });
});

// This will be print first because is not in function 
console.log('Hello from the top-level code');
