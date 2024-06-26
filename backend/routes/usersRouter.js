const express = require("express");
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser
} = require("../controllers/userController");

const router = express.Router();

router.route("/").get(getAllUsers).post(createUser);
router.route("/:id").get(getUserById).patch(updateUser);


module.exports = router;
