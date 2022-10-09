const express = require("express");

const router = express.Router();

const {
  getAllSpecialists,
  createSpecialist,
  getSpecialistsByEspecialidad,
  getSpecialistById
} = require("../controllers/specialistsController");

router.route("/").get(getAllSpecialists).post(createSpecialist);
router.route("/:id").get(getSpecialistById);
router.route("/especialidad/:especialidad").get(getSpecialistsByEspecialidad);

module.exports = router;
