import { io } from "socket.io-client";

let socket = null;

export const initSocket = (URL, userId) => {
  if (!userId) {
    console.error("initSocket: userId is required");
    return null;
  }

  if (!socket || socket.disconnected) {
    socket = io(URL, {
      transports: ["websocket", "polling"],
      query: { userId },
      withCredentials: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socket.on("connect", () => {
      console.log("✅ Socket connected:", socket.id);
    });

    socket.on("disconnect", (reason) => {
      console.warn("⚠️ Socket disconnected:", reason);
    });

    socket.on("connect_error", (err) => {
      console.error("❌ Socket connection error:", err.message);
    });
  }

  return socket;
};

export const getSocket = () => {
  if (!socket) throw new Error("Socket not initialized!");
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
    console.log("🛑 Socket disconnected manually.");
  }
};