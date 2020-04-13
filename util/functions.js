const moment = require("moment");

module.exports = {
  isEmpty: function (obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
    // return Object.keys(obj).length === 0;
  },

  capitalize: function (string) {
    return typeof string === "string"
      ? string[0].toUpperCase() + string.slice(1)
      : string;
  },

  uncapitalize: function (string) {
    return typeof string === "string"
      ? string[0].toLowerCase() + string.slice(1)
      : string;
  },

  getDateString: function (date) {
    return date ? moment(date).locale(moment.locale()).format("L") : date;
  },
};
