var express = require("express");
var router = express.Router();
var index = require("./routes/index");
var users = require("./routes/users");

router.use("/", index);
router.use("/users", users);

module.exports = router;
