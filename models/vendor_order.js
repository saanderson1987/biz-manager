const Model = require('./model.js');
const pgp = require('pg-promise')();
const db = require('../db.js');

class VendorOrderModel extends Model {
  getByQuery(queryParams) {
    queryParams.joinTable = new pgp.helpers.TableName('company');
    queryParams.joinClause = ' INNER JOIN ${joinTable} on company.id = t1.vendor_id'
    return super.getByQuery(queryParams);
  }

  getById(id) {
    const joinTable = new pgp.helpers.TableName('company');
    const joinClause = ' INNER JOIN ${joinTable} on company.id = t1.vendor_id'
    return super.getById(id, {joinTable, joinClause});
  }

  new(record) {
    return super.new(record).then(newRecord => {
      return this.getById(newRecord.id);
    })
  }
}

const VendorOrder = new VendorOrderModel('vendor_order');
module.exports = VendorOrder;
