import { validate, version } from 'uuid';
import { create } from './REST-Api/create';
import { read, readAll } from './REST-Api/read';
import { Code, IResponse, jsonResponse } from './REST-Api/response';

const api = {
  GET: {
    '/api/users/': read, // api/users/{id}
    '/api/users': readAll // api/users
  },
  POST: { '/api/users': create } // api/users
};

const NOT_FOUND = jsonResponse(Code.NOT_FOUND, {
  code: Code.NOT_FOUND,
  message: 'Resource Not Found'
});

export const route = async (
  method: string,
  srcPath: string,
  body: string
): Promise<IResponse> => {
  let res: IResponse;
  const path = srcPath.endsWith('/') ? srcPath.slice(0, -1) : srcPath;
  const keys = Object.keys(api[method]);
  for (const key of keys) {
    if (path.startsWith(key)) {
      const pathParam = path.substring(key.length);
      if (!pathParam.includes('/')) {
        const param = pathParam.length === 0 ? body : pathParam;
        res = api[method]?.[key](param);
      }
      break;
    }
  }
  return res ?? NOT_FOUND;
};
