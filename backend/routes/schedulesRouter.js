const express = require("express");

const router = express.Router();

const {
  getAllSchedule,
  createSchedule,
} = require("../controllers/scheduleController");

router.route("/").get(getAllSchedule).post(createSchedule);

module.exports = router;
