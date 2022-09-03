import fs from "fs";

export const deleteFile: any = (filePath: string) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      throw err;
    }
  });
};
export default deleteFile;
export {};
