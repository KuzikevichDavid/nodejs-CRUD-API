import { User } from './entities/user';
import { v4 as uuidv4 } from 'uuid';

interface IDictionary<T> {
  [index: string]: T;
}

interface IRepository<T> {
  generateId(): string;
  add(user: T): T;
  get(id: string): T;
  getAll(): T[];
}

const tst: Record<string, User> = {};

const usersDict: IDictionary<User> = {};

class userRepo implements IRepository<User> {
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
export const add = (user: User): User => users.add(user);
export const get = (id: string): User => users.get(id);
export const getAll = (): User[] => users.getAll();

export const setRepo = (repo: IRepository<User>) => {};

export const u: IRepository<User> = {
  generateId: (): string => uuidv4(),
  add: (user: User): User => (usersDict[user.id] = user),
  get: (id: string): User => usersDict[id],
  getAll: function (): User[] {
    throw new Error('Function not implemented.');
  }
};
