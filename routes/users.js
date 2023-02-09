var express = require("express");
var usersController = require("../controllers/UsersController");
const AuthController = require("../controllers/AuthController.js");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});
router.get("/find/:role", usersController.findAll);

// post users register
router.post("/reg", AuthController.register);

module.exports = router;
