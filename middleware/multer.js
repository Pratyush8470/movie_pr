const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
        const img = Date.now() + '-' + file.originalname
        cb(null, file.fieldname + '-' + img)
    }
})

const upload = multer({ storage });

module.exports = upload;