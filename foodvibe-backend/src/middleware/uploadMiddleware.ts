import multer from "multer";

const storage = multer.memoryStorage();

const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif", "image/jpg"];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const maxSizeInBytes = 10 * 1024 * 1024;

export const singleImageUpload = multer({
  storage,
  fileFilter,
  limits: { fileSize: maxSizeInBytes },
}).single("image");
