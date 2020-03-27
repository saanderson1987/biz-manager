const Controller = require('./controller.js');

const VendorOrder = require ('../models/vendor_order.js');
const vendorOrderController = new Controller(VendorOrder);

module.exports = vendorOrderController;


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
