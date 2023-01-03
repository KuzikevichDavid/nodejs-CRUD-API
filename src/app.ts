import http from 'http';
import { createServer } from './server';
import { routing } from './route';
import { Readable } from 'stream';
import { Code } from './REST-Api/response';

const getBody = async (req: Readable): Promise<string> => {
  const buffers = [] as any;
  for await (const chunk of req) {
    buffers.push(chunk);
  }
  return Buffer.concat(buffers).toString();
};

const port = 8000;

const server = createServer(
  port,
  async (req: http.IncomingMessage, res: http.ServerResponse) => {
    try {
      console.log(`receive request on port:${port} method:${req.method} path:${req.url}`);
      const reqBody = await getBody(req);
      console.log(`reqBody: ${reqBody}`);
      res.setHeader('Content-Type', 'application/json');
      const response = await routing(req.method, req.url, reqBody);
      res.statusCode = response.code;
      res.end(response.body);
    } catch (err) {
      console.log(`Internal Server Error ${err}`);
      res.statusCode = Code.ERROR;
      res.end(
        JSON.stringify({
          code: res.statusCode,
          message:
            'Internal Server Error. The server has encountered a situation it does not know how to handle'
        })
      );
    } finally {
      res.destroy();
    }
  }
);

process.on('uncaughtException', (err) => {
  console.log(`uncaughtException ${err}`);
});

process.on('beforeExit', (code) => {
  console.log(`before_exit, code:${code}`);
  server.close();
});
