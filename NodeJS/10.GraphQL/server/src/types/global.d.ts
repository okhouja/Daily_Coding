declare interface Error {
    name: string
    message: string
    stack?: string
    originalError?: number | string
    statusCode?: number | string
    code?:number
    data:any
  }