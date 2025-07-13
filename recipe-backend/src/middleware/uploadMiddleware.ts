import multer from "multer";

// הגדרת אחסון בזיכרון (ניתן גם לדיסק)
const storage = multer.memoryStorage();

// הפונקציה לסינון סוגי הקבצים המותרים
const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  // מגדירים אילו סוגים מותר להעלות
  const allowedMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "video/mp4"
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// הגדרת מגבלת גודל (למשל 10MB לקבצים)
const maxSizeInBytes = 10 * 1024 * 1024; // 10MB

// יצירת ה middleware
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: maxSizeInBytes },
});

export const recipeMediaUpload = upload.fields([
  { name: "images", maxCount: 4 },
  { name: "video", maxCount: 1 },
]);

// 👤 משתמש - תמונה אחת
export const userImageUpload = upload.single("image");