require('dotenv').config()
const fs = require('fs')
const S3 = require('aws-sdk/clients/s3')

const bucketName = process.env.AWS_BUCKET;
const region = process.env.AWS_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey
})

// uploads a file to s3
function uploadFile(file) {
  

  const uploadParams = {
    Bucket: bucketName,
    Body: file.buffer,
    Key: "public/"+file.originalname
  }

  return s3.upload(uploadParams).promise()
}
exports.uploadFile = uploadFile


// file list from s3
function getFileList(path) {
  const ListParams = {
    Prefix: path,
    Bucket: bucketName
    
  }
  

  return s3.listObjectsV2(ListParams).promise()
}
exports.getFileList = getFileList

