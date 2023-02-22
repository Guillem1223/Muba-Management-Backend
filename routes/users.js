const express = require("express");

const AuthController = require("../controllers/AuthController.js");
const contractorController = require("../controllers/ContractorController.js");
const contractsController = require("../controllers/ContractsController.js");
const performersController = require("../controllers/PerformersController.js");

const usersController = require("../controllers/UsersController.js");
const verifyToken = require("../middelwares/verifyToken.js");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});
router.get("/find/:role", verifyToken, usersController.findAll);

// post users register
router.post("/reg", AuthController.register);
// contract register
router.post("/contract", contractsController.register);
// login
router.post("/login", AuthController.login);
// delete users
router.delete("/delete/:id", usersController.deleteById);
// update users
router.put("/update/:id", AuthController.update);

//find by id
router.get("/:id", performersController.getById);
router.get("/contractor/:id", contractorController.getById);
module.exports = router;
