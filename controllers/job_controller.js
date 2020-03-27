const Controller = require('./controller.js');

const Job = require ('../models/job.js');
const jobController = new Controller(Job);

module.exports = jobController;


// newCompany = {
//   name: 'TestCompany5',
//   status: 'prospect',
//   notes: 'some notes'
// };

// Company.new(newCompany)
//   .then(data => {
//     console.log(data);
//   })
//   .catch(err => {
//     console.log(err);
//   });


// Company.all()
//   .then(data => {
//   console.log(data);
//   })
//   .catch(err => {
//     console.log(err);
//   });

// Company.getById(0)
//   .then(data => {
//   console.log(data);
//   })
//   .catch(err => {
//     console.log(err);
//   });

// Company.update({id: 0, name: 'TestCompany1'})
//   .then(data => {
//     console.log(data);
//   })
//   .catch(err => {
//     console.log(err);
//   });

// Company.delete(7)
//   .then(data => {
//   console.log(data);
//   })
//   .catch(err => {
//     console.log(err);
//   });
