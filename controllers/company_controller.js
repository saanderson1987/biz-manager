const Controller = require('./controller.js');

const Company = require ('../models/company.js');
const companyController = new Controller(Company);

module.exports = companyController;


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
