const manager = require("../../managers/register.manager");

let register = async function (req, res) {
  try {
    let details = req.body;
    let user = await manager.findUser(details.email);

    if (user) {
      return res.status(404).json({
        success: false,
        message: "User Already Exists",
      });
    }

    user = await manager.createUser(details);

    const token = await user.generateToken();

    return res.status(201).json({
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
  register,
};
