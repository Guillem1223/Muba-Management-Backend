import express from "express";
import usersController from "../controllers/UsersController";
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});
// post users register
router.post("/reg", usersController.create);
export default router;
