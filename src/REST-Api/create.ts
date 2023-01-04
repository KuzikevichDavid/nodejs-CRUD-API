import { User } from '../repositories/entities/user';
import { add, generateId } from '../repositories/users';
import { Code, IResponse, jsonResponse } from './response';

export const create = async (json: string): Promise<IResponse> => {
  const parsedJson = JSON.parse(json);
  if (
    !User.isValidName(parsedJson?.username) ||
    !User.isValidAge(parsedJson?.age) ||
    !User.isValidHobbies(parsedJson?.hobbies)
  )
    return jsonResponse(Code.BAD_REQ, {
      code: Code.BAD_REQ,
      message: 'Request body does not contain required fields'
    });
  const user = new User(
    generateId(),
    parsedJson?.username,
    parsedJson?.age,
    parsedJson?.hobbies
  );
  return jsonResponse(Code.CREATED, add(user));
};
