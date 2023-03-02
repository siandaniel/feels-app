import { io, Socket } from "socket.io-client";

interface SocketData extends Socket {
  isProfessional?: boolean;
  isWaiting?: boolean;
  connectionID?: string;
  username?: string;
  fullname?: string;
}

export const socket: SocketData = io("https://feels-api.onrender.com/", {
  autoConnect: false,
});
