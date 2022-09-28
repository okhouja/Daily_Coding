import { RequestHandler, Request, Response, NextFunction } from "express";
import { request } from "http";
import { IGetUserAuthInfoRequest } from "../types/types";
import jwt from "jsonwebtoken";

const  authMiddleware = (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    const error: any = new Error("Not authenticated.");
    error.statusCode = 401;
    throw error;
  }
  const token = authHeader.split(" ")[1];
  let decodedToken: any;
  try {
    decodedToken = jwt.verify(token, "somesupersecretsecret");
  } catch (err: any) {
    err.statusCode = 500;
    throw err;
  }
  if (!decodedToken) {
    const error: any = new Error("Not authenticated.");
    error.statusCode = 401;
    throw error;
  }

  req.userId = decodedToken.userId;
  next();
};

export default authMiddleware
// export function bind(arg0: undefined, req: { get: (headerName: any) => null; }, arg2: {}, arg3: () => void): any {
//     throw new Error("Function not implemented.");
// }
