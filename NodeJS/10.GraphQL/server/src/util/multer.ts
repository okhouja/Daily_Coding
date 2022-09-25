import { Request } from "express";
import multer, { FileFilterCallback } from "multer";
import path from "path";
import { unlink } from "fs";

import { v4 as uuidv4 } from "uuid";
const guid = uuidv4();

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

export const fileStorage = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    cb: DestinationCallback
  ): void => {
    cb(null, path.join("images"));
  },
  filename: (
    req: Request,
    file: Express.Multer.File,
    cb: FileNameCallback
  ): void => {
    // cb(null, guid + "_" + file.originalname);
    cb(null, new Date().toISOString().replace(/:/g, '.') + '-' + file.originalname);

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

export const clearImage = (filePath: any) => {
  filePath = path.join(filePath);
  unlink(filePath, (err) => {
    if (err) throw err;
    // console.log( "Photo Deleted");
  });
};


export {};
