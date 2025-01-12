import { useState } from "react";
import useConversation from "../store/zustand/useConversation";
import toast from "react-hot-toast";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const {
    messages,
    selectedConversation,
    setSelectedConversation,
    setMessages,
  } = useConversation();

  const sendMessage = async ({ message }) => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/messages/send/${selectedConversation._id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message }),
        },
      );

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      setMessages([...messages, data.newMessage]);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendMessage };
};

export default useSendMessage;
