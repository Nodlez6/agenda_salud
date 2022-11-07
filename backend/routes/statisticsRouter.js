const express = require("express");

const router = express.Router();

const {
    getMostHoursTaken
} = require("../controllers/statisticsController");


router.route("/:id").get(getMostHoursTaken);

module.exports = router;
