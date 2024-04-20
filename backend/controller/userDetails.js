const userModel = require("../models/userModel");

async function userDetailsController(req, res) {
  try {
    console.log("userId", req.userId);

    const user = await userModel.findById(req.userId);

    res.status(200).json({
      data: user,
      error: false,
      success: true,
      message: "User Details",
    })

    console.log("user", user);

  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
}

module.exports = userDetailsController;
