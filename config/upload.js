const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({

    destination: function(req, file, cb){

        cb(null, "./uploads");

    },

    filename: function(req, file, cb){

        const ext = path.extname(file.originalname);

        cb(null, Date.now() + ext);

    }

});

const fileFilter = (req, file, cb) => {

    const allowedTypes = [

        "image/jpeg",

        "image/jpg",

        "image/png",

        "application/pdf"

    ];

    if (allowedTypes.includes(file.mimetype)) {

        cb(null, true);

    } else {

        cb(new Error("File harus JPG, PNG, atau PDF"));

    }

};

module.exports = multer({

    storage,

    fileFilter

});