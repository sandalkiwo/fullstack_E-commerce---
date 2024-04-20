const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function userSignInController(req, res) {
  try {
    const { email, password } = req.body;

    if (!email) {
      throw new Error("pliese provide email");
    }
    if (!password) {
      throw new Error("pliese provide password");
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      throw Error("User not found");
    }

    const match = await bcrypt.compare(password, user.password);

    console.log("checkPassword", match);

    if (match) {
      const tokenData = {
        _id: user._id,
        email: user.email,
      };

      const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, {
        expiresIn: 60 * 60 * 8,
      });

      const tokenOption = {
        httpOnly: true,
        secure: true,
      };

      res.cookie("token", token, tokenOption).json({
        message: "Login Succesfully",
        data: token,
        success: true,
        error: false,
      });
    } else {
      throw Error("Wrong password");
    }
  } catch (error) {
    res.json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
module.exports = userSignInController;
