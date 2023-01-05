export interface IResponse {
  code: number;
  body: string;
}

export enum Code {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQ = 400,
  NOT_FOUND = 404,
  ERROR = 500
}

export const jsonResponse = (code: Code, body: object): IResponse => {
  return { code: code, body: JSON.stringify(body) };
};

export const responseOK = (body: object): IResponse => {
  return jsonResponse(Code.OK, body);
};

export const responseNoContent = (): IResponse => {
  return { code: Code.NO_CONTENT, body: undefined };
};

const response = (code: Code, message: string): IResponse => {
  return jsonResponse(code, { code: code, message: message });
};

export const responseBadReq = (message: string): IResponse => {
  return response(Code.BAD_REQ, message);
};

export const responseNotFound = (message: string): IResponse => {
  return response(Code.NOT_FOUND, message);
};

export const responseInternalErr = (message: string): IResponse => {
  return response(Code.ERROR, message);
};
