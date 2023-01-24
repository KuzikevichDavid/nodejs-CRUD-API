import { createServer as create } from 'http';
import { Readable } from 'stream';

export const createServer = (port: number, reqListener: unknown) => {
  const res = create(reqListener);
  res.listen(port, () => console.log(`Run server on port ${port}`));
  res.on('error', (err) => console.log(`Server error on port:${port}\n`, err));
  res.on('clientError', (err, socket) => {
    console.log(`Client error on port:${port}\n`, err);
  });
  return res;
};

export const getBody = async (req: Readable): Promise<string> => {
  const buffers: Array<Buffer> = [];
  for await (const chunk of req) {
    buffers.push(chunk);
  }
  return Buffer.concat(buffers).toString();
};
