import { useState } from "react";

const useMessage = () => {
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const clearMessage = () => {
    setMessage("");
    setMessageType("");
  };

  return {
    message,
    messageType,
    setMessage,
    setMessageType,
    clearMessage
  };
};

export default useMessage;