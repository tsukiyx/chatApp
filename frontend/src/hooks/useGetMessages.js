import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../store/zustand/useConversation";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation, clearMessages } =
    useConversation();

  useEffect(() => {
    const controller = new AbortController();

    const getMessages = async () => {
      if (!selectedConversation?._id) {
        clearMessages();
        return;
      }

      setLoading(true);
      try {
        const res = await fetch(`/api/messages/${selectedConversation._id}`, {
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error("Failed to fetch messages");
        }

        const data = await res.json();

        if (data.error) {
          throw new Error(data.error);
        }

        setMessages(data);
      } catch (error) {
        if (error.name === "AbortError") {
          return;
        }
        toast.error(error.message);
        clearMessages();
      } finally {
        setLoading(false);
      }
    };

    getMessages();

    return () => {
      controller.abort();
    };
  }, [selectedConversation?._id, setMessages, clearMessages]);

  return { messages, loading };
};

export default useGetMessages;
