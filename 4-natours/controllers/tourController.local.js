// const fs = require('fs');

// // The tours 'DB'
// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );

// // Validate the tour id
// exports.checkID = (req, res, next, val) => {
//   console.log(`Tour id is ${val}`);
//   if (req.params.id * 1 > tours.length) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Invalid ID'
//     });
//   }
//   next();
// };

// // Validate the body of the request
// exports.checkBody = (req, res, next) => {
//   if (!req.body.name || !req.body.price) {
//     return res.status(400).json({
//       status: 'fail',
//       message: 'Missing name or price'
//     });
//   }
//   next();
// };

// // The CRUD functions for the tours

// // Create a new tour
// exports.createTour = (req, res) => {
//   const newID = tours[tours.length - 1].id + 1;
//   const newTour = Object.assign({ id: newID }, req.body);
//   tours.push(newTour);

//   fs.writeFile(
//     `${__dirname}/dev-data/data/tours-simple.json`,
//     JSON.stringify(tours),
//     err => {
//       res.status(201).json({
//         status: 'success',
//         data: {
//           tour: newTour
//         }
//       });
//     }
//   );
// };

// // Get all tours
// exports.getAllTours = (req, res) => {
//   console.log(req.requestTime);
//   res.status(200).json({
//     status: 'success',
//     requestedAt: req.requestTime,
//     result: tours.length,
//     data: {
//       tours
//     }
//   });
// };

// // Get a tour by id
// exports.getTour = (req, res) => {
//   const id = req.params.id * 1;
//   const tour = tours.find(el => el.id === id);

//   res.status(200).json({
//     status: 'success',
//     data: {
//       tour
//     }
//   });
// };

// // Update a tour by id
// exports.updateTour = (req, res) => {
//   const id = req.params.id * 1;
//   const tour = tours.find(el => el.id === id);
//   const { name, duration, difficulty } = req.body;
//   tour.name = name;
//   tour.duration = duration;
//   tour.difficulty = difficulty;
//   tours[tour.id] = tour;

//   fs.writeFile(
//     `${__dirname}/dev-data/data/tours-simple.json`,
//     JSON.stringify(tours),
//     err => {
//       res.status(201).json({
//         status: 'success',
//         data: {
//           updateTour: tour
//         }
//       });
//     }
//   );
// };

// // Delete a tour by id
// exports.deleteTour = (req, res) => {
//   const id = req.params.id * 1;
//   tours.splice(id);

//   fs.writeFile(
//     `${__dirname}/dev-data/data/tours-simple.json`,
//     JSON.stringify(tours),
//     err => {
//       res.status(204).json({
//         status: 'success',
//         data: null
//       });
//     }
//   );
// };
