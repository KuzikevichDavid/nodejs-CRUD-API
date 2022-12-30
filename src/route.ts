import { validate, version } from "uuid";
import { create } from "./REST-Api/create"
import { read, readAll } from "./REST-Api/read"
import { Code, IResponse, jsonResponse } from "./REST-Api/response";

const api = {
    'GET': { 
        '/api/users':  readAll, // api/users
        '/api/users/': read // api/users/{id}
    },
    'POST': { '/api/users': create } // api/users
}

export const routing = async (metod: string, path: string, json: string) : Promise<IResponse> => {
    const srcPath = path.endsWith('/') ? path.slice(-1) : path;
    const iParam = srcPath.lastIndexOf('/');
    const src = srcPath.substring(0, iParam + 1)
    const param = srcPath.substring(iParam + 1);
    let trueParam: string, trueSrc: string;
    if (validate(param) && version(param) === 4) {
        trueParam = param;
        trueSrc = src;
    } else {
        trueParam = json;
        trueSrc = srcPath;
    };
    const res = api[metod]?.[trueSrc];
    if (res) {
        return await res(trueParam);
    } else { 
        return jsonResponse(Code.NOT_FOUND, { code: Code.NOT_FOUND, message: 'Resourse Not Found'});
    }
}