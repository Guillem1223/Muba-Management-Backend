const express = require("express");
const router = express.Router();
const index = require("./routes/index");
const users = require("./routes/users");

router.use("/", index);
router.use("/users", users);
// router.use("/performers", performers)
router.use("/auth", auth);
module.exports = router;
