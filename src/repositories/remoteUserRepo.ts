import cluster from 'cluster';
import EventEmitter from 'events';
import { genId, isValidId as isValidUuid } from './idUtils';
import { CMD, IMsg, IMsgData } from '../net/messaging';
import { User } from './entities/user';
import { IRepository } from './users';

export class remoteUserRepo extends EventEmitter implements IRepository<User> {
  constructor() {
    super();

    cluster.worker.on('message', (m: IMsg) => {
      this.emit(m.id, m);
    });
  }

  async getData(msg: IMsg): Promise<IMsgData> {
    return new Promise((resolve, reject) => {
      cluster.worker.send(msg, () => {
        this.once(msg.id, (msg: IMsg) => {
          if (msg.cmd === CMD.ERR) reject(new Error('Master Data Error'));
          resolve(msg.data);
        });
      });
    });
  }

  async generateId(): Promise<string> {
    const msg: IMsg = { id: genId(), cmd: CMD.GEN_ID, data: null };
    return (await this.getData(msg)).id;
  }

  isValidId(id: string): boolean {
    return isValidUuid(id);
  }
  async add(user: User): Promise<User> {
    const msg: IMsg = {
      id: genId(),
      cmd: CMD.ADD,
      data: { id: user.id, user: new Array(user) }
    };
    return (await this.getData(msg)).user[0];
  }
  async update(user: User): Promise<User> {
    const msg: IMsg = {
      id: genId(),
      cmd: CMD.UPDATE,
      data: { id: user.id, user: new Array(user) }
    };
    return (await this.getData(msg)).user[0];
  }
  async delete(id: string): Promise<void> {
    const msg: IMsg = { id: genId(), cmd: CMD.DELETE, data: { id: id, user: null } };
    await this.getData(msg);
    return;
  }
  async get(id: string): Promise<User> {
    const msg: IMsg = { id: genId(), cmd: CMD.READ, data: { id: id, user: null } };
    return (await this.getData(msg)).user[0];
  }
  async getAll(): Promise<User[]> {
    const msg: IMsg = { id: genId(), cmd: CMD.READ_ALL, data: null };
    return (await this.getData(msg)).user;
  }
}
