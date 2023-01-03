import { get, getAll } from '../repositories/users';
import { Code, IResponse, jsonResponse } from './response';

export const readAll = async (): Promise<IResponse> => {
  return jsonResponse(Code.OK, getAll());
};

export const read = async (id: string): Promise<IResponse> => {
  const res = get(id);
  if (!res)
    return jsonResponse(Code.NOT_FOUND, {
      code: Code.NOT_FOUND,
      message: `User with id=${id} not found`
    });
  return jsonResponse(Code.OK, get(id));
};
