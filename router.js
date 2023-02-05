import router from "express";
import index from "./routes/index";
import users from "./routes/users";

router.use("/", index);
router.use("/users", users);

export default router;
