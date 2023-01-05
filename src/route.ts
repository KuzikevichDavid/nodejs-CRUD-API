import { create } from './REST-Api/create';
import { del } from './REST-Api/delete';
import { read, readAll } from './REST-Api/read';
import { IResponse, responseNotFound } from './REST-Api/response';
import { update } from './REST-Api/update';

const api = {
  GET: {
    '/api/users/': read, // api/users/{id}
    '/api/users': readAll // api/users
  },
  POST: { '/api/users': create }, // api/users
  PUT: { '/api/users/': update }, // api/users/{id}
  DELETE: { '/api/users/': del } // api/users/{id}
};

const NOT_FOUND = responseNotFound('Resource Not Found');

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
        res = api[method]?.[key](param, body);
      }
      break;
    }
  }
  return res ?? NOT_FOUND;
};
