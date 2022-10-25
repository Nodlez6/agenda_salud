const express = require("express");
const router = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const {
    UploadFile,
    GetFileList,
    GetObject,
    getArchivosEspecialistas
  } = require("../controllers/filesSpecialists");
 
  router.route("/").post( upload.single('image'),UploadFile);
  //router.route("/:path").get(GetFileList);
  router.route("/:path/:key").get(GetObject);
  router.route("/:id").get(getArchivosEspecialistas);


  module.exports = router;