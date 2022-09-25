import {unlink} from "fs";

export const deleteFile: any = (filePath: string) => {
  unlink(filePath, (err) => {
    if (err) {
      throw err;
    }
  });
};
export default deleteFile;
export {};
