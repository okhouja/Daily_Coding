  declare namespace Express {
    export interface Request {
        userId?: RequestUserId;
        post?: any;
        isAuth?: boolean;
        // save: any;
        // posts: any;
        // user: string | undefined;

    }
    export interface graphql{
      post?: any;

    }
    // export interface Response {
    //     userId: any;
    // }
  }