const express = require("express");

const router = express.Router();

const {
    CreateTransaction
} = require("../controllers/Transbank");

router.route("/create").post(CreateTransaction);


module.exports = router;