const express = require("express");
const router = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const {
    UploadFile,
    getArchivosEspecialistas,
    DeleteFile
  } = require("../controllers/filesSpecialists");
 
  router.route("/").post( upload.single('image'),UploadFile);
  router.route("/delete").post(DeleteFile)
  router.route("/:id").get(getArchivosEspecialistas);


  module.exports = router;