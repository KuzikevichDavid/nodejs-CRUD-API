import { Worker } from 'cluster';
import { User } from '../repositories/entities/user';
import { add, del, generateId, get, getAll, update } from '../repositories/users';

export enum CMD {
  ADD = 1,
  READ = 2,
  READ_ALL = 3,
  UPDATE = 4,
  DELETE = 5,
  GEN_ID = 6,
  ERR = 7
}

export interface IMsgData {
  id: string;
  user: User[];
}

export interface IMsg {
  id: string;
  cmd: CMD;
  data: IMsgData;
}

export const masterOnMessage = async (msg: IMsg, worker: Worker) => {
  try {
    const res: User[] = [];
    let id: string;
    switch (msg.cmd) {
      case CMD.READ:
        res.push(await get(msg.data.id));
        break;
      case CMD.READ_ALL:
        res.push(...(await getAll()));
        break;
      case CMD.GEN_ID:
        id = await generateId();
        break;
      case CMD.DELETE:
        await del(msg.data.id);
        break;
      case CMD.ADD:
        res.push(await add(msg.data.user[0]));
        break;
      case CMD.UPDATE:
        res.push(await update(msg.data.user[0]));
        break;
      default:
        msg.cmd = CMD.ERR;
        break;
    }
    msg.data = { id: id, user: res };
  } catch (err) {
    msg.cmd = CMD.ERR;
  } finally {
    worker.send(msg, (err) => {
      if (err) console.log(err);
    });
  }
};
