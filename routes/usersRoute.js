const { Router } = require("express");
const {
  register,
  getUsers,
  getUser,
  loginUser,
  deleteUser,
  updateUser
} = require("../controllers/usersController");

const router = Router();

router.post("/user/register", register);
router.get("/user/pages", getUsers);
router.get("/user/query/:_id", getUser);
router.get("/user/login", loginUser);
router.delete("/user/query/:id", deleteUser);
router.put("/user/:id", updateUser);

module.exports = router;
