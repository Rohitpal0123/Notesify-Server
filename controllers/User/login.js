const User = require("../../models/user.models");
const bcrypt = require("bcryptjs");
const generateToken = require("./generateToken");

class loginUser {
  async userExists(email) {
    try {
      const userExists = await User.findOne({ email: email });
      if (userExists == null) throw "User doesn't exists !";

      return userExists;
    } catch (error) {
      console.log("🚀 ~ error:", error);
      throw error;
    }
  }
  process = async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await this.userExists(email);

      const isPassword = await bcrypt.compare(password, user.password);
      if (!isPassword) throw "Invaild Password !";

      res.status(200).json({
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.userName,
        email: user.eamil,
        token: generateToken(user._id)
      });
    } catch (error) {
      console.log("🚀 ~ error:", error);
      res.status(400).json(error);
    }
  };
}

module.exports = new loginUser();
