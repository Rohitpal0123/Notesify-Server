const User = require("../../models/user.model");
const bcrypt = require("bcryptjs");
const generateToken = require("./generateToken");
const validate = require("../../lib/jsonValidator");
const loginUserSchema = require("../../jsonschema/User/login");
const RESPONSE_MESSAGE = require("../../lib/responseCode");

class loginUser {
  async userExists(email) {
    try {
      const userExists = await User.findOne({ email: email });
      if (userExists == null) throw "User doesn't exists !";

      return userExists;
    } catch (error) {
      throw error;
    }
  }
  process = async (req, res) => {
    try {
      validate(req.body, loginUserSchema);
      const { email, password } = req.body;

      const user = await this.userExists(email);

      const isPassword = await bcrypt.compare(password, user.password);

      res.status(200).send({
        type: RESPONSE_MESSAGE.SUCCESS,
        data: {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          userName: user.userName,
          email: user.email,
          token: generateToken(user._id)
        }
      });
    } catch (error) {
      res.status(400).send({
        type: RESPONSE_MESSAGE.LOGIN_FAILED,
        error: error
      });
    }
  };
}

module.exports = new loginUser();
