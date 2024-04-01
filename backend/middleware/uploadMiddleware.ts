import multer from "multer";
import path from "path";
import { Request } from "express";

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (
    _req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ) => {
    // Save files in the uploads directory
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (
    _req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
  ) => {
    // Create a unique filename with the original extension
    const fileExt = path.extname(file.originalname);
    const fileName = `${Date.now()}-${file.originalname
      .replace(fileExt, "")
      .replace(/[^a-z0-9]/gi, "_")
      .toLowerCase()}${fileExt}`;
    cb(null, fileName);
  },
});

const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  // Allow only image files
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// Multer upload middleware
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB upload limit
  },
});

export default upload;
