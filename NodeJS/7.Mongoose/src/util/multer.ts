import { Request } from "express";
import multer, { FileFilterCallback } from "multer";
let multerFile: Express.Multer.File;
const path = require("path");


type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

export const fileStorage = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    cb: DestinationCallback
  ): void => {
    cb(null, (path.join(__dirname, "../upload/images")));
  },
  filename: (
    req: Request,
    file: Express.Multer.File,
    cb: FileNameCallback
  ): void => {
    cb(null, new Date().toISOString() + "-" + file.originalname);
  },
});

export const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
): void => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(
      new Error("Image uploaded is not of type jpg/jpeg or png") as any,
      false
    );
  }
};

export const upload = multer({ storage: fileStorage, fileFilter: fileFilter });

export {};
