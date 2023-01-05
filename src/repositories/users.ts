import { User } from './entities/user';
import { v4 as uuidv4, validate, version } from 'uuid';

interface IRepository<T> {
  generateId(): string;
  isValidId(id: string): boolean;
  add(user: T): T;
  update(id: string, user: T): T;
  delete(id: string): void;
  get(id: string): T;
  getAll(): T[];
}

const usersDict: Record<string, User> = {};

class userRepo implements IRepository<User> {
  update(id: string, user: User): User {
    return (usersDict[id] = user);
  }

  delete(id: string): void {
    delete usersDict[id];
  }

  isValidId(id: string): boolean {
    return validate(id) && version(id) === 4;
  }

  generateId(): string {
    return uuidv4();
  }

  add(user: User): User {
    return (usersDict[user.id] = user);
  }

  get(id: string): User {
    return usersDict[id];
  }

  getAll(): User[] {
    return Object.getOwnPropertyNames(usersDict).map<User>((i) => usersDict[i]);
  }
}

const users: IRepository<User> = new userRepo();

export const generateId = (): string => users.generateId();
export const isValidId = (id: string): boolean => users.isValidId(id);
export const add = (user: User): User => users.add(user);
export const update = (id: string, user: User): User => users.update(id, user);
export const del = (id: string): void => users.delete(id);
export const get = (id: string): User => users.get(id);
export const getAll = (): User[] => users.getAll();

export const setRepo = (repo: IRepository<User>) => {};

export const u: IRepository<User> = {
  generateId: (): string => uuidv4(),
  add: (user: User): User => (usersDict[user.id] = user),
  get: (id: string): User => usersDict[id],
  getAll: function (): User[] {
    throw new Error('Function not implemented.');
  },
  isValidId: function (id: string): boolean {
    throw new Error('Function not implemented.');
  },
  update: function (id: string, user: User): User {
    throw new Error('Function not implemented.');
  },
  delete: function (id: string): void {
    throw new Error('Function not implemented.');
  }
};
