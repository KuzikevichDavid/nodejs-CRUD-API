import { User } from './entities/user';
import { userRepo } from './userRepo';

export interface IRepository<T> {
  generateId(): Promise<string>;
  isValidId(id: string): boolean;
  add(user: T): Promise<T>;
  update(user: T): Promise<T>;
  delete(id: string): Promise<void>;
  get(id: string): Promise<T>;
  getAll(): Promise<T[]>;
}

let users: IRepository<User> = new userRepo();
export const setRepo = (repo: IRepository<User>) => {
  users = repo;
};

export const generateId = async (): Promise<string> => users.generateId();
export const isValidId = (id: string): boolean => users.isValidId(id);
export const add = (user: User): Promise<User> => users.add(user);
export const update = (user: User): Promise<User> => users.update(user);
export const del = async (id: string) => users.delete(id);
export const get = (id: string): Promise<User> => users.get(id);
export const getAll = (): Promise<User[]> => users.getAll();
