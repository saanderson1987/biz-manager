const express = require("express");
const isEmpty = require("../util/functions").isEmpty;

class Controller {
  constructor(model) {
    this.model = model;
    this.index = this.index.bind(this);
    this.getById = this.getById.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  index(req, res) {
    const query = req.query;
    // if (isEmpty(query) || (query.columns && Object.keys(query).length === 1) ) {
    //   const columns = query.columns ? query.columns : null;
    //   this.send(this.model.all(columns), res);
    // } else {
    this.send(this.model.getByQuery(req.query), res);
    // }
  }

  getById(req, res) {
    this.send(this.model.getById(req.params.id), res);
  }

  create(req, res) {
    console.log(req.body);
    const record = req.body;
    this.send(this.model.new(record), res);
  }

  update(req, res) {
    console.log(req.body);
    const record = req.body;
    this.send(this.model.update(record), res);
  }

  delete(req, res) {
    this.send(this.model.delete(req.params.id), res);
  }

  send(query, res) {
    return query
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  }
}

module.exports = Controller;
