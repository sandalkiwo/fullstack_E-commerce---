const express = require("express");

const userSignUpController = require("../controller/userSignUp");
const userSignInController = require("../controller/userSignIn");
const userDetailsController = require("../controller/userDetails");
const authToken = require("../middleware/authToken");
const userLogout = require("../controller/userLogout");
const allUsers = require("../controller/allUsers");
const updateUser = require("../controller/updateUser");
const uploadProductController = require("../controller/uploadProduct");
const getProductController = require("../controller/getProduct");
const updateProductController = require("../controller/updateProduct");

const router = express.Router();

router.post("/signup", userSignUpController);
router.post("/signin", userSignInController);
router.get("/user-details", authToken, userDetailsController);
router.get("/user-logout", userLogout);

// Admin Panel
router.get("/all-user", authToken, allUsers);
router.post("/update-user", authToken, updateUser);

// Product
router.post("/upload-product", authToken, uploadProductController);
router.get("/get-product", getProductController);
router.post("/update-product", authToken, updateProductController);

module.exports = router;
