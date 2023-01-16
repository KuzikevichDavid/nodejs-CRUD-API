import http from 'http';
import { createServer, getBody } from './common';
import { route } from './route';
import { Code } from '../REST-Api/response';

export const start = () => {
  const port: number = +process.env.TASK3_REST_API_PORT || 4000;

  const server = createServer(
    port,
    async (req: http.IncomingMessage, res: http.ServerResponse) => {
      try {
        console.log(
          `receive request on port:${port} method:${req.method} path:${req.url}`
        );
        const reqBody = await getBody(req);
        console.log(`request body: ${reqBody}`);
        res.setHeader('Content-Type', 'application/json');
        const response = await route(req.method, req.url, reqBody);
        res.statusCode = response.code;
        res.end(response?.body);
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

  return server;
};
