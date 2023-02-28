import { io, Socket } from "socket.io-client";

interface SocketData extends Socket{
    isProfessional?: boolean;
    isWaiting?: boolean;
}

export const socket: SocketData = io("http://192.168.1.70:9999", {autoConnect: false})
