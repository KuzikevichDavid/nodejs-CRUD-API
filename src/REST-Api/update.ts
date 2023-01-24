import { User } from '../repositories/entities/user';
import { get, isValidId, update as upd } from '../repositories/users';
import {
  badIdMessage,
  badJSONMessage,
  idNotFoundMessage,
  notValidJSON,
  parseJson
} from './common';
import { IResponse, responseBadReq, responseNotFound, responseOK } from './response';

export const update = async (id: string, body: string): Promise<IResponse> => {
  if (!isValidId(id)) return responseBadReq(badIdMessage(id));
  const user: User = await get(id);
  if (!user) {
    return responseNotFound(idNotFoundMessage(id));
  } else {
    const json = parseJson(body);
    if (!json) return responseBadReq(badJSONMessage);
    if (
      !User.isValidName(json?.username) ||
      !User.isValidAge(json?.age) ||
      !User.isValidHobbies(json?.hobbies) ||
      Object.keys(json).length !== 3
    ) {
      return responseBadReq(notValidJSON);
    } else {
      user.username = json.username;
      user.age = json.age;
      user.hobbies = json.hobbies;
      return responseOK(await upd(user));
    }
  }
};
