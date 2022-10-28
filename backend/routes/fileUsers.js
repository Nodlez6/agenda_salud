const express = require("express");
const router = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const {
    UploadFile,
    getArchivosUsuariosByUsuario,
    DeleteFile,
    getArchivosUsuariosByEspecialista

  } = require("../controllers/filesUsers");
 
  router.route("/").post( upload.single('image'),UploadFile);
  router.route("/delete").post(DeleteFile)
  router.route("/:id_especialista/:id_usuario").get(getArchivosUsuariosByEspecialista);
  router.route("/:id_usuario").get(getArchivosUsuariosByUsuario);


  module.exports = router;