const express = require("express");

const router = express.Router();

const {
  getAllSpecialists,
  createSpecialist,
} = require("../controllers/specialistsController");

router.route("/").get(getAllSpecialists).post(createSpecialist);

module.exports = router;
