const fs = require("fs");
const http = require("http");
const url = require("url");

// const slugify = require("slugify");

const replaceTemplate = require("./modules/replaceTemplate");

// Files: Read and write files in Node.js
////////////////////////////////////////////////////////////////////////////////////////
// this function reads from file, and writes to another file (callback hell👺)

// fs.readFile("txt/start.txt", "utf-8", (err, data1) => {
//   if (err) return console.log(`Error: ${err}`);
//   fs.readFile(`txt/${data1}.txt`, "utf-8", (err, data2) => {
//     if (err) return console.log(`Error: ${err}`);
//     console.log(data2);
//     fs.readFile(`txt/append.txt`, "utf-8", (err, data3) => {
//       if (err) return console.log(`Error: ${err}`);
//       console.log(data3);

//       fs.writeFile("txt/final.txt", `${data2}\n${data3}`, "utf-8", (err) => {
//         if (err) return console.log(`Error: ${err}`);
//         console.log("Your file has been written");
//       });
//     });
//   });
// });

// console.log("reading files");

/////////////////////////////////////////////////////////////////////////////////////////

// Server

// read the data needed to present the farm
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);
// const slugs = dataObj.map(el => slugify(el.productName, { lower: true }));

// create server
const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  // Overview page
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" });

    const cardHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join("");
    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardHtml);

    res.end(output);

    // Product page
  } else if (pathname === "/product") {
    res.writeHead(200, { "Content-type": "text/html" });
    const product = dataObj.find((el) => el.product === query.product);
    const output = replaceTemplate(tempProduct, product);
    res.end(output);

    // API
  } else if (pathname === "/api") {
    res.writeHead(200, { "Content-type": "text/html" });
    res.end(data);

    // Not found
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
    });
    res.end("<h1>Page not found!</h1>");
  }
});

server.listen(3000, "127.0.0.1", () => {
  console.log("Listening on port 3000");
});
