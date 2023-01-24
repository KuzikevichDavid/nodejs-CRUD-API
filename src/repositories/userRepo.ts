import { User } from './entities/user';
import { genId, isValidId as isValidUuid } from './idUtils';
import { IRepository } from './users';

const usersDict: Record<string, User> = {};

export class userRepo implements IRepository<User> {
  async update(user: User): Promise<User> {
    return (usersDict[user.id] = user);
  }

  async delete(id: string) {
    delete usersDict[id];
  }

  isValidId(id: string): boolean {
    return isValidUuid(id);
  }

  async generateId(): Promise<string> {
    return genId();
  }

  async add(user: User): Promise<User> {
    return (usersDict[user.id] = user);
  }

  async get(id: string): Promise<User> {
    return usersDict[id];
  }

  async getAll(): Promise<User[]> {
    return Object.getOwnPropertyNames(usersDict).map<User>((i) => usersDict[i]);
  }
}
