var AWS = require('aws-sdk/clients/s3');
const fs = require('fs');
const multer = require('multer');
const { uploadFile,deleteFile  } = require('./s3')
const prisma = require("../prisma/prismaClient");

const bucketName = process.env.AWS_BUCKET;
const region = process.env.AWS_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3= new AWS({
    region,
    accessKeyId,
    secretAccessKey
});
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const UploadFile = async (req, res) => {
    try {
        console.log(req.query)
        path=req.query.nombre+"_"+req.query.apellido+"_"+req.query.id+"/Mis_Archivos/"
        const file = req.file;
        console.log(file)
        const result = await uploadFile(file,path);
        res.send(result);
        const nombrefile=file.originalname.replace(" ","+")
        const downlink="https://agenda-salud.s3.amazonaws.com/"+path+nombrefile
        const archivos_especialistas=await prisma.archivos_especialistas.create({
            data:{
                id_especialista:Number(req.query.id),
                url:downlink,
                nombre_archivo:file.originalname
            }
        })

    } catch (error) {
        console.log(error);
    }
};

const DeleteFile = async (req, res) => {
    try {
    
        path=req.body.nombre+"_"+req.body.apellido+"_"+req.body.id+"/Mis_Archivos/"
        const result = await deleteFile(path+req.body.nombre_archivo);
        res.send(result);
        const borrar_Archivo=await prisma.archivos_especialistas.delete({
            where:{
                id:Number(req.body.id_bdd)
            }
        })
    } catch (error) {
        console.log(error);
    }
};

const getArchivosEspecialistas = async (req, res) => {
    try {
        const { id } = req.params;
        const archivos_especialistas = await prisma.archivos_especialistas.findMany({
            where: { id_especialista: Number(id) }
        });
        res.status(200).json(archivos_especialistas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
module.exports = {
    DeleteFile,
    UploadFile,
    getArchivosEspecialistas
}
