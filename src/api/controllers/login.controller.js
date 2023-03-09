const manager = require("../../managers/login.manager");

let login = async function (req, res) {
  try {
    let details = req.body;
    let user = await manager.findUser(details.email);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User don't exists",
      });
    }

    const isMatch = await user.matchPassword(details.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect Password",
      });
    }

    const token = user.generateToken();

    return res.status(200).json({
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  login,
};
