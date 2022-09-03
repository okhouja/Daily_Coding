import { Request } from "express";
import multer, { FileFilterCallback } from "multer";
let multerFile: Express.Multer.File;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const guid = uuidv4();

console.log(path.join(__dirname, "images"));
// console.log(path.join(__d, "images"));

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

export const fileStorage = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    cb: DestinationCallback
  ): void => {
    cb(null, (path.join(__dirname, "images")));
  },
  filename: (
    req: Request,
    file: Express.Multer.File,
    cb: FileNameCallback
  ): void => {
    cb(null, guid + "_" + file.originalname);
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
    cb(null, false);
  }
};

export const upload = multer({ storage: fileStorage, fileFilter: fileFilter });

export {};
