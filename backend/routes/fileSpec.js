const express = require("express");
const router = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const {
    UploadFile
  } = require("../controllers/filesSpecialists");
 
  router.route("/").post( upload.single('image'),UploadFile);


  module.exports = router;