import cluster from 'cluster';
import { IncomingMessage, ServerResponse } from 'http';
import { cpus } from 'os';
import { createServer } from './common';
import { IMsg, masterOnMessage } from './messaging';

let workersRun: number = 0;
const workersNum = cpus().length;
const ports: number[] = Array<number>(workersNum);
let current = -1;

const getFreePort = (): number => {
  const index = ++current >= workersNum ? (current = 0) : current;
  return ports[index];
};

const startLoadBalancer = () =>
  createServer(
    +process.env.TASK3_REST_API_PORT,
    (req: IncomingMessage, res: ServerResponse) => {
      try {
        res.statusCode = 301;
        res.setHeader('Location', `http://localhost:${getFreePort()}${req.url}`);
        res.end();
      } catch (err) {
        res.statusCode = 500;
        res.end(JSON.stringify(err));
      } finally {
        res.destroy();
      }
    }
  );

export const spawn = () => {
  cluster.on('listening', (worker, address) => {
    console.log(`Worker '${worker.process.pid}' is listening '${address.port}'`);
    workersRun++;
    if (workersRun === workersNum) startLoadBalancer();
  });

  cluster.on('exit', (worker, code, signal) => {
    console.log(
      `Worker '${worker.process.pid}' died with code:'${code}', signal:'${signal}`
    );
  });

  for (let i = 1; i <= workersNum; i++) {
    const worker = cluster.fork({
      TASK3_REST_API_PORT: +process.env.TASK3_REST_API_PORT + i
    });
    ports[i - 1] = +process.env.TASK3_REST_API_PORT + i;
    worker.on('message', async (msg: IMsg) => {
      masterOnMessage(msg, worker);
    });
    worker.on('error', (err) => console.log(`worker ${worker.id} error ${err}`));
  }
};
