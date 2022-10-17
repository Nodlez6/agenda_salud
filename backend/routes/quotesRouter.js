const express = require("express");

const router = express.Router();

const {
  createQuote,
  deleteQuote,
  getQuotesByPacient,
  getQuotesBySpecialistWithoutInclude
} = require("../controllers/quotesController");

router.route("/pacient/:pacientId").get(getQuotesByPacient)
router.route("/specialistWithout/:specialistId").get(getQuotesBySpecialistWithoutInclude)
router.route("/").post(createQuote);
router.route("/:id").delete(deleteQuote);


module.exports = router;
