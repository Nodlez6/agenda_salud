var AWS = require('aws-sdk/clients/s3');
const fs = require('fs');
const multer = require('multer');

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
        console.log(req.file)
        const file = req.file;
        const params = {
            Bucket: bucketName,
            Key: file.name,
            Body: file.data
        };
        s3.upload(params, (error, data) => {
            if (error) {
                res.status(500).send(error);
            }
            res.status(200).send(data);
        });
    } catch (error) {
        console.log(error);
    }
};
module.exports = {
    UploadFile
}
