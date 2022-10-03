const express = require("express");

const router = express.Router();

const {
  getAllSpecialists,
  createSpecialist,
  getSpecialistsByEspecialidad,
} = require("../controllers/specialistsController");

router.route("/").get(getAllSpecialists).post(createSpecialist);
router.route("/:especialidad").get(getSpecialistsByEspecialidad);

module.exports = router;
