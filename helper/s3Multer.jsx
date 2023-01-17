

const multer = require("multer")

// const config = require("../config")

const fs = require("fs");

// aws.config.update({
//   secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
//   accessKeyId: config.AWS_PUBLIC_ACCESS_KEY,
//   region: config.S3_REGION
// })

// const BUCKET = config.S3_BUCKET
// const s3 = new aws.S3();

// const upload = multer({
//     storage: multerS3({
//         bucket: BUCKET,
//         s3: s3,
//         acl: "public-read", //permission
//         key: (req, file, cb) => {
//             cb(null, Date.now()+file.originalname)
//         }
//     })
// })

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "images/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    },
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/png" ||
        file.mimetype === "video/mp4" ||
        file.mimetype === "pdf"
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};


const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
});



const uploadFile = (req, res) => {
    console.log("UPLOAD FILE ", req.file)
    res.json({
        type: "success",
        message: "successfully uploaded",
        file: req.file,
        //    data: req.file.key
        data: req.file.filename,

    })
}

module.exports = {
    upload,
    uploadFile

}