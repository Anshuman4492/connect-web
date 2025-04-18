import { io } from "socket.io-client";
import P2P from "socket.io-p2p";
import { BASE_URL } from "./constants";

export const createSocketConnection = () => {
  if (location.hostname === "localhost") {
    return io(BASE_URL);
  } else return io("/", { path: "/api/socket.io" });
};

export const createP2PConnection = (socket) => {
  const p2p = new P2P(
    socket,
    {
      peerOpts: {
        trickle: false,
      },
      autoUpgrade: false,
    },
    () => {
      // Connected callback
      p2p.emit("peer-obj", `Hello there. I am ${p2p.peerId}`);
    }
  );

  return p2p;
};
