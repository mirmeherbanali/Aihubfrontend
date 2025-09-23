"use client";

import { useEffect } from "react";
import { initSocket } from "@/lib/socket";
import { useDispatch } from "react-redux";
import { addNotification } from "@/store/slices/notification.slice";

const useSocket = (URL, userId, eventType) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userId || !eventType) return;
    const socket = initSocket(URL, userId);
    if (!socket) return;

    const handleEvent = (data) => {
      dispatch(addNotification(data));
    };

    socket.on(eventType, handleEvent);

    return () => {
      socket.off(eventType, handleEvent);
    };
  }, [URL, userId, eventType, dispatch]);
};

export default useSocket;