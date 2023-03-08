const EventEmitter = require('events');
const http = require('http');

// Events can be triggered with the 'emit' and listening with 'on'
class Sales extends EventEmitter {
  constructor() {
    super();
  }
}

const myEmitter = new Sales();

myEmitter.on('newSale', () => {
  console.log('There was a new sale!');
});

myEmitter.on('newSale', () => {
  console.log('Costumer name: Jonas');
});

myEmitter.on('newSale', (stock) => {
  console.log(`There are now ${stock} items left in stock.`);
});

myEmitter.emit('newSale', 9);

//////////////////

const server = http.createServer();

server.on('request', (req, res) => {
  console.log('Request received!');
  res.end('Request received');
  console.log(req.url);
});

server.on('request', (req, res) => {
  console.log('another request received!😎');
});

server.on('close', (req, res) => {
  console.log('Server closed!');
});

server.listen(3000, () => {
  console.log('Server listening on port 3000!');
});