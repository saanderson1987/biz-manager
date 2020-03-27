const Controller = require('./controller.js');

const JobOrder = require ('../models/job_order.js');
const jobOrderController = new Controller(JobOrder);

module.exports = jobOrderController;


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
