declare interface Error {
    name: string
    message: string
    stack?: string
    statusCode?: number | string
  }