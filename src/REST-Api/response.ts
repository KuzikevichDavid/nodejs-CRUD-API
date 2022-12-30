export interface IResponse{
    code: number
    body: string
}

export enum Code{
    OK = 200,
    CREATED = 201,
    BAD_REQ = 400,
    NOT_FOUND = 404,
    ERROR = 500
} 

export const jsonResponse = (code: number, body) : IResponse => {
    return { code: code, body: JSON.stringify(body) }
}
