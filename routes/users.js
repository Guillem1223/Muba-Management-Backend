var express = require("express");
var usersController = require("../controllers/UsersController");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});
router.get("/find", usersController.findAll);
// post users register
router.post("/reg", usersController.create);

module.exports = router;
