import { Server as NetServer } from "http";
import { Server as ServerIO } from "socket.io";
import { NextApiRequest } from "next";

import { NextApiResponseServerIO } from "@/types";


export const config = {
    api: {
        bodyParser: false
    }
};

export default function ioHandler(req: NextApiRequest, res: NextApiResponseServerIO) {
    if (!res.socket.server.io) {
        const path = "/api/socket/io";
        const httpServer: NetServer = res.socket.server as any;
        const io = new ServerIO(httpServer, {
            path: path,
            addTrailingSlash: true
        });
        res.socket.server.io = io;
    }
    res.end();
}