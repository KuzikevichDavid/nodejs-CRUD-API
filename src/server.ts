import { createServer as create } from "http";

export const createServer = (port: number, reqListener) => {
    const res = create(reqListener)
    res.listen(port, () => console.log(`Run server on port ${port}`))
    res.on('error', (err) => console.log(`Server error on port:${port}\n`, err) )
    res.on('clientError', (err, socket) => {
        console.log(`Client error on port:${port}\n`, err);
        socket.end();
    })
    return res;
}

