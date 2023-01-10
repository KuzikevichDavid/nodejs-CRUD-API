import { User } from '../repositories/entities/user';
import { get, isValidId, update as upd } from '../repositories/users';
import { badIdMessage, badJSONMessage, idNotFoundMessage, parseJson } from './common';
import { IResponse, responseBadReq, responseNotFound, responseOK } from './response';

export const update = async (id: string, body: string): Promise<IResponse> => {
  if (!isValidId(id)) return responseBadReq(badIdMessage(id));
  const user: User = await get(id);
  if (!user) {
    return responseNotFound(idNotFoundMessage(id));
  } else {
    const json = parseJson(body);
    if (!json) return responseBadReq(badJSONMessage);
    if (typeof json?.age !== 'undefined') {
      if (User.isValidAge(json.age)) user.age = json.age;
      else return responseBadReq(`field age='${json.age}' is not correct`);
    }
    if (typeof json?.username !== 'undefined') {
      if (User.isValidName(json.username)) user.username = json.username;
      else return responseBadReq(`field username='${json.username}' is not correct`);
    }
    if (typeof json?.hobbies !== 'undefined') {
      if (User.isValidHobbies(json.hobbies)) user.hobbies = json.hobbies;
      else return responseBadReq('field hobby is not correct');
    }
    return responseOK(await upd(user));
  }
};
