const User = require("../../models/user.model");
const bcrypt = require("bcryptjs");
const generateToken = require("./generateToken");

class signupUser {
  async userNameExists(email) {
    try {
      const userNameExists = await User.findOne({ email: email });
      if (userNameExists != null) throw "Username already exists !";
    } catch (error) {
      console.log("🚀 ~ error:", error);
      throw error;
    }
  }
  async emailExists(email) {
    try {
      const emailExists = await User.findOne({ email: email });
      if (emailExists != null) throw "Email is already used !";
    } catch (error) {
      console.log("🚀 ~ error:", error);
      throw error;
    }
  }
  process = async (req, res) => {
    try {
      const { firstName, lastName, userName, email, password } = req.body;

      await this.emailExists(email);
      await this.userNameExists(userName);

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = await User.create({
        firstName: firstName,
        lastName: lastName,
        userName: userName,
        email: email,
        password: hashedPassword
      });

      if (!newUser) throw "User not signed up !";

      res.status(200).json({
        _id: newUser._id,
        firstName: firstName,
        lastName: lastName,
        userName: userName,
        email: newUser.email,
        token: generateToken(newUser._id)
      });
    } catch (error) {
      console.log("🚀 ~ error:", error);
      res.status(400).json(error);
    }
  };
}

module.exports = new signupUser();
