const express = require("express");

const router = express.Router();

const {
    getMostHoursTaken,
    getQuantityByPaciente
} = require("../controllers/statisticsController");


router.route("/:id").get(getMostHoursTaken);
router.route("/pacient/:id").get(getQuantityByPaciente);

module.exports = router;
