export const parseJson = (json: string): any => {
  try {
    return JSON.parse(json);
  } catch (err) {
    if (err instanceof SyntaxError) return undefined;
    else throw err;
  }
};

export const badJSONMessage = 'Request body incorrect';

export const notValidJSON =
  'Request body not contain required fields or they are invalid';

export const badIdMessage = (id: string) => `${id} isn't valid 'id' string`;

export const idNotFoundMessage = (id: string) => `User with id=${id} not found`;
