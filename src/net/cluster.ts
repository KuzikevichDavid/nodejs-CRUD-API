import cluster from 'cluster';
import { IncomingMessage, request, ServerResponse } from 'http';
import { cpus } from 'os';
import { createServer } from './common';
import { IMsg, masterOnMessage } from './messaging';

let workersRun: number = 0;
const workersNum = cpus().length;
const ports: number[] = Array<number>(workersNum);
let current = -1;

const getFreePort = (): number => {
  return ports[++current % workersNum];
};

const startLoadBalancer = () =>
  createServer(
    +process.env.TASK3_REST_API_PORT,
    async (req: IncomingMessage, res: ServerResponse) => {
      try {
        const options = {
          port: getFreePort(),
          path: req.url,
          method: req.method,
          headers: req.headers
        }
        await new Promise((resolve) => {
          req.pipe(request(options, async (clientRes) => {
            res.statusCode = clientRes.statusCode;
            res.setHeader('content-type', clientRes.headers['content-type'])
            const result = clientRes.pipe(res);
            res.end();
            resolve(result);
          }));
        });
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
