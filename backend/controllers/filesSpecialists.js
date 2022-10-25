var AWS = require('aws-sdk/clients/s3');
const fs = require('fs');
const multer = require('multer');
const { uploadFile, getFileList,getObject } = require('./s3')
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

const GetFileList = async (req, res) => {
    try {
        
        const result = await getFileList(req.params.path);
        console.log(result)
        res.send(result);
    } catch (error) {
        console.log(error);
    }
};
const GetObject = async (req, res) => {
    console.log("gola")
    try {
        console.log(req.params.path)
        console.log(req.params.key)
        const result = await getObject(req.params.path,req.params.key);
        console.log(result)
        res.send(result);
    } catch (error) {
        console.log(error);
    }
};
module.exports = {
    GetObject,
    GetFileList,
    UploadFile
}
