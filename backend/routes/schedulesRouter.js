const express = require("express");

const router = express.Router();

const {
  getAllSchedule,
  createSchedule,
  getScheduleBySpecialistWithPeriodicidad,
  getScheduleBySpecialistWithoutPeriodicidad,
  deleteSchedule,
} = require("../controllers/scheduleController");

router.route("/").get(getAllSchedule).post(createSchedule);
router.route("/:id").delete(deleteSchedule);
router.route("/with/:id").get(getScheduleBySpecialistWithPeriodicidad);
router.route("/without/:id").get(getScheduleBySpecialistWithoutPeriodicidad);

module.exports = router;
