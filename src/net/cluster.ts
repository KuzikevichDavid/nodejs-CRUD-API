import cluster, { Worker } from 'cluster';
import { cpus } from 'os';
import { User } from '../repositories/entities/user';

enum CMD {
  CREATE = 1,
  READ = 2,
  UPDATE = 3,
  DELETE = 4
}

interface IMsg {
  cmd: CMD;
  data: User[];
}

const messageHandler = (msg: IMsg) => {
  null;
};

const workers: Worker[] = [];

const spawn = () => {
  const workersNum = cpus().length / 2;

  const settings = {
    exec: process.argv[2]
  };

  cluster.on('online', (worker) => {
    console.log(`Worker '${worker.process.pid}' is listening`);
  });

  cluster.on('exit', (worker, code, signal) => {
    console.log(
      `Worker '${worker.process.pid}' died with code:'${code}', and signal:'${signal}`
    );
  });

  for (let i = 0; i < workersNum; i++) {
    const worker = cluster.fork({ TASK3_REST_API_PORT: process.env.TASK3_REST_API_PORT });
    worker.on('message', messageHandler);
    worker.on('error', (err) => console.log(`worker ${worker.id} error ${err}`));
    worker.process.stdout.pipe(process.stdout, { end: false });

    workers.push(worker);
  }
};

spawn();
