"use client";

import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

const ToastifyMessage = () => {
  const dispatch = useDispatch();

  const data = useCallback((message, showToastify, resetAction) => {
    if (message) {
      showToastify(message);
      dispatch(resetAction());
    }
  }, [dispatch]);

  return data;
};

export default ToastifyMessage;