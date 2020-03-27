const db = require('../db.js');
const pgp = require('pg-promise')();

const table = new pgp.helpers.TableName('company');
const tableName = 'company';

exports.all = function() {
  // return db.any('SELECT * FROM company');
  const query = pgp.as.format('SELECT * FROM $1', table) + ' ORDER BY name';
  return db.any(query);
};

exports.getById = function(id) {
  // if (id === null || id === undefined || typeof test !== 'number') {
  //   return new Promise((resolve, reject) => {
  //     reject({message: "Error: Please enter a valid id"});
  //   });
  // }
  // return db.one('SELECT * FROM company WHERE id = $1', [id]);
  if (isInvalidId(id)) return error('id');
  const query = pgp.as.format('SELECT * FROM ${table} WHERE id = ${id}', {
    table: table,
    id
  });
  // return db.one(query);
  // return db.one(query)
  //   .then((data) => {
  //     return new Promise((resolve, reject) => {
  //       resolve(data);
  //     });
  //   })
  //   .catch((err) => {
  //     if (err.code === 0) return error('id');
  //   });
  return returnIfIdExists(db.one(query));
};

function returnIfIdExists(query) {
  return query
    .then((data) => {
      return new Promise((resolve, reject) => {
        resolve(data);
      });
    })
    .catch((err) => {
      if (err.code === 0) return error('id');
    });
}

exports.new = function(data) {
  const columns = Object.keys(data);
  // const colSet = new pgp.helpers.ColumnSet(columns, {table: 'company'});
  const colSet = new pgp.helpers.ColumnSet(columns, {table: tableName});
  const query = pgp.helpers.insert(data, colSet) + ' RETURNING *';
  return db.one(query);
};

exports.update = function(data) {
  data['?id'] = data.id;
  delete data.id;
  const columns = Object.keys(data);
  const colSet = new pgp.helpers.ColumnSet(columns, {table: tableName});
  const query = pgp.helpers.update(data, colSet) + ' WHERE id = ' + data['?id'] + ' RETURNING *';
  return db.one(query);
};

exports.delete = function(id) {
  const table = new pgp.helpers.TableName('company');
  const query = pgp.as.format('DELETE FROM ${table} WHERE id = ${id} RETURNING id', {
    id: id,
    table: table
  })
  // return db.one(query);
  return returnIfIdExists(db.one(query));
};

function isInvalidId(id) {
  return id === null || id === undefined || typeof id !== 'number';
}

function error(type) {
  if (!type) type = errorMessageType;
  const message = {
    errorMessageType : 'Error: wrong error message type',
    id: "Error: Please enter a valid id",
  };
  return new Promise((resolve, reject) => {
    reject({ message: message[type] });
  });
}
