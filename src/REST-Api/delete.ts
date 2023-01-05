import { User } from '../repositories/entities/user';
import { get, isValidId, del as deleteUser } from '../repositories/users';
import { badIdMessage, idNotFoundMessage } from './common';
import {
  Code,
  IResponse,
  jsonResponse,
  responseBadReq,
  responseNotFound
} from './response';

export const del = async (id: string): Promise<IResponse> => {
  if (!isValidId(id)) return responseBadReq(badIdMessage(id));
  const user: User = get(id);
  if (!user) {
    return responseNotFound(idNotFoundMessage(id));
  } else {
    deleteUser(id);
    return jsonResponse(Code.NO_CONTENT, undefined);
  }
};
