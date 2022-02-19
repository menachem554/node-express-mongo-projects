const fs = require('fs');
const superagent = require('superagent');

// The mission is divide to tree part:
// 1: to read type of a dog from the 'dog.txt' file.
// 2: to fetch random picture of dog from that type using API.
// 3: to write the url picture to the new file

// This is the result using callback function
// fs.readFile(`${__dirname}/dog.txt`, 'utf8', (err, data) => {
//   console.log(`Breed: ${data}`);

//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .end((err, res) => {
//       if (err) return console.log(err.message);
//       console.log(res.body.message);

//       fs.writeFile(`${__dirname}/dog-img.txt`, res.body.message, (err) => {
//         if (err) return console.log(err);
//         console.log('Random dog image saved to file');
//       });
//     });
// });

// This is the result using promise and the async/await function
const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) return reject('File not found😢');
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject('Could not write file😓');
      resolve('success');
    });
  });
};

// Implementing the functions above using 'then' and 'catch'
// readFilePro(`${__dirname}/dog.txt`)
//   .then((data) => {
//     console.log(`Breed: ${data}`);
//     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//   })
//   .then((res) => {
//     console.log(res.body.message);
//     return writeFilePro(`${__dirname}/dog-img.txt`, res.body.message);
//   })
//   .then(() => {
//     console.log('Random dog image saved to file');
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// Implementing the functions above using 'async' and 'await'
const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);

    const res = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    console.log(res.body.message);

    await writeFilePro(`${__dirname}/dog-img.txt`, res.body.message);
    console.log('Random dog image saved to file');
  } catch (err) {
    console.log(err.message);
  }
};

getDogPic();
