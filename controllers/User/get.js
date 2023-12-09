const User = require("../../models/user.model");

class getUsers {
  process = async (req, res) => {
    try {
      const users = await User.find({});
      console.log("🚀 ~ users:", users);
      if (!users) throw "User does not exists !";

      res.status(200).json(users);
    } catch (error) {
      console.log("🚀 ~ error:", error);
      res.status(400).json(error);
    }
  };
}

module.exports = new getUsers();
