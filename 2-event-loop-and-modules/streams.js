const fs = require('fs');
const server = require('http').createServer();

// Read data from a file and send to the client

// Option 1: with the fs readFile module
// server.on('request', (req, res) => {
//   fs.readFile('test-file.txt', (err, data) => {
//     if (err) console.log(err);
//     res.end(data);
//   });
// });

// Option 2: with fs readable stream
// In *stream the file is reeding in pieces, (chunk), and every piece 
// will send to the browser immediately 
// server.on('request', (_req, res) => {
//   const readable = fs.createReadStream('test-file.txt');
//   readable.on('data', (chunk) => {
//     res.write(chunk);
//   });
//   readable.on('end', () => {
//     res.end();
//   });
//   readable.on('error', err => {
//       console.log(err);
//       res.statusCode = 500;
//       res.end('File not found');
//   })
// });

// Option 3: with fs readable stream and piping
// Tge *piping* job is to balance between the time it takes to read the file
// and the time it takes to print it, 
server.on('request', (_req, res) => {
    const readable = fs.createReadStream('test-file.txt');
    readable.pipe(res);
});


server.listen(3000, () => {
  console.log('Server listening on port 3000!');
});
