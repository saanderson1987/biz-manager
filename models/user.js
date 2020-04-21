const Model = require("./model.js");
const bcrypt = require("bcryptjs");

class UserModel extends Model {
  new(record) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(record.password, salt);
    record.password = hash;
    return super.new(record);
  }
}

const User = new UserModel("users");
module.exports = User;

// const test = {
//   username: "test2",
//   password: "test2",
// };

// User.new(test).then((user) => console.log(user));
