import { get, getAll, isValidId } from '../repositories/users';
import { badIdMessage, idNotFoundMessage } from './common';
import { IResponse, responseBadReq, responseNotFound, responseOK } from './response';

export const readAll = async (): Promise<IResponse> => {
  return responseOK(getAll());
};

export const read = async (id: string): Promise<IResponse> => {
  if (!isValidId(id)) return responseBadReq(badIdMessage(id));
  const res = get(id);
  if (!res) return responseNotFound(idNotFoundMessage(id));
  return responseOK(get(id));
};
