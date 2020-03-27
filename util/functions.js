const moment = require('moment');

module.exports = {

  isEmpty: function (obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
    // return Object.keys(obj).length === 0;
    // return Object.keys(obj).length;
    // return obj;
  },

  capitalize: function(string) {
    return string[0].toUpperCase() + string.slice(1);
  },

  getDateString: function(date) {
    return moment(date).clone().locale(moment.locale()).format('L');
  }
}
