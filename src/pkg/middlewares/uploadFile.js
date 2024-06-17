const httpStatus = require("http-status");
const path = require("path");
const multer = require("multer");

const diskStoragePhoto = multer.diskStorage({
  // konfigurasi lokasi penyimpanan file
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../../uploads/photo"));
  },
  // konfigurasi penamaan file yang unik
  filename: function (req, file, cb) {
    let fileName = `img-${new Date().getTime()}`;
    cb(null, fileName + path.extname(file.originalname));
  },
});

const uploadPhoto = multer({
  storage: diskStoragePhoto,
  // limits: 8192000,
  limits: { fileSize: 8192000 }, // 8Mb
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype !== "image/png" &&
      file.mimetype !== "image/jpg" &&
      file.mimetype !== "image/jpeg" &&
      file.mimetype !== "image/webp"
    ) {
      return cb(new Error("Only .png, .jpg, .webp and .jpeg format allowed!"));
    } else {
      cb(null, true);
    }
  },
});

exports.uploadPhoto = async (req, res, next) => {
  uploadPhoto.single("photo")(req, res, function (err) {
    try {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        throw err;
      } else if (err) {
        // An unknown error occurred when uploading.
        throw err;
      }

      // Everything went fine.
      next();
    } catch (error) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      });
    }
  });
};

const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const destinationPath = file.fieldname.startsWith('image') ? "../../../uploads/book/image" : "../../../uploads/book/file";
    cb(null, path.join(__dirname, destinationPath));
  },
  filename: function (req, file, cb) {
    const prefix = file.fieldname.startsWith('image') ? 'image-' : 'file-';
    cb(null, prefix + new Date().getTime() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: diskStorage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB (dalam byte)
  fileFilter: (req, file, cb) => {
    if (
      (file.fieldname.startsWith('image') && !['image/png', 'image/jpg', 'image/jpeg', 'image/webp', 'image/gif'].includes(file.mimetype)) ||
      (file.fieldname.startsWith('file') && !['application/pdf'].includes(file.mimetype))
    ) {
      return cb(new Error("Format not allowed!"));
    } else {
      cb(null, true);
    }
  },
});

exports.uploadFile = async (req, res, next) => {
  upload.fields([{ name: 'image', maxCount: 1 }, { name: 'file', maxCount: 1 }])(req, res, function (err) {
    try {
      if (err instanceof multer.MulterError) {
        throw err;
      } else if (err) {
        throw err;
      }

      next();
    } catch (error) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      });
    }
  });
};

