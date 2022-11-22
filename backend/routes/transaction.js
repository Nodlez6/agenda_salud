const express = require("express");

const router = express.Router();

const {
    CreateTransaction,
    GetConfirmation
} = require("../controllers/Transbank");

router.route("/create").post(CreateTransaction);
router.route("/confirmation").post(GetConfirmation);


module.exports = router;