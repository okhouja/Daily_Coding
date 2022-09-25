import session from "express-session";

declare module 'express-session' {
  export interface SessionData {
    user: { [key: string]: any };
    isLoggedIn: boolean;
  }
}

declare module "image" {
  const value: any;
  export = value;
}

export {};

