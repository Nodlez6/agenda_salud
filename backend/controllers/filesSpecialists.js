var AWS = require('aws-sdk/clients/s3');
const fs = require('fs');
const multer = require('multer');
const { uploadFile,deleteFile  } = require('./s3')
const prisma = require("../prisma/prismaClient");


const UploadFile = async (req, res) => {
    try {
        console.log(req.query)
        path="Especialista_"+req.query.id+"/Mis_Archivos/"
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
        console.log(req.query)
        path="Especialista_"+req.query.id+"/Mis_Archivos/"
        const result = await deleteFile(path+req.query.nombre_archivo);
        res.send(result);
        const borrar_Archivo=await prisma.archivos_especialistas.delete({
            where:{
                id:Number(req.query.id_bdd)
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
        console.log(archivos_especialistas)
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
