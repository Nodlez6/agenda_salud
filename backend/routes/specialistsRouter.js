const express = require("express");

const router = express.Router();

const {
  getAllSpecialists,
  createSpecialist,
  getSpecialistsByEspecialidad,
  getSpecialistById,
  getPacientsByQuoteAndSpecialist,
  updateSpecialist
} = require("../controllers/specialistsController");

router.route("/").get(getAllSpecialists).post(createSpecialist);
router.route("/:id").get(getSpecialistById).patch(updateSpecialist);
router.route("/especialidad/:especialidad").get(getSpecialistsByEspecialidad);
router.route("/pacientes/:idEspecialidad").get(getPacientsByQuoteAndSpecialist);
module.exports = router;
