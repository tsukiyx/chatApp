import { useEffect } from "react";
import useConversation from "../../store/zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import NoChatSelected from "./NoChatSelected";

const MessagesContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);
  return (
    <section className="md:min-w-[450px] flex flex-col">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <div className="bg-slate-500 px-4 py-2 mb-2">
            <span className="label-text">To: </span>
            <span className="text-gray-900 font-bold">
              {selectedConversation.username}
            </span>
          </div>
          <Messages />
          <MessageInput />
        </>
      )}
    </section>
  );
};

export default MessagesContainer;
