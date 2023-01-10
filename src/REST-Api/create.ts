import { User } from '../repositories/entities/user';
import { add, generateId } from '../repositories/users';
import { badJSONMessage, parseJson } from './common';
import { Code, IResponse, jsonResponse, responseBadReq } from './response';

export const create = async (json: string): Promise<IResponse> => {
  const parsedJson = parseJson(json);
  if (!parseJson) return responseBadReq(badJSONMessage);
  if (
    !User.isValidName(parsedJson?.username) ||
    !User.isValidAge(parsedJson?.age) ||
    !User.isValidHobbies(parsedJson?.hobbies)
  )
    return responseBadReq('Request body does not contain required fields');
  const id = await generateId();
  const user = new User(id, parsedJson?.username, parsedJson?.age, parsedJson?.hobbies);
  return jsonResponse(Code.CREATED, await add(user));
};
