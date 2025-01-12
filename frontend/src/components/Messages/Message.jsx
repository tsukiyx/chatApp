import { useAuthContext } from "../../context/authContext";
import useConversation from "../../store/zustand/useConversation";
import { extractTime } from "../../utils/extractTime";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();

  // Validación adicional para evitar errores después del refresh
  if (!authUser || !selectedConversation) {
    return null;
  }

  const fromSender = message.senderId === authUser._id;
  const chatClassName = fromSender ? "chat-end" : "chat-start";
  const formatedTime = extractTime(message.createdAt);
  const profilePic = fromSender
    ? authUser.profilePic
    : selectedConversation?.profilePic;
  const bubbleBgColor = fromSender ? "bg-blue-500" : "bg-gray-500";
  const shakeClass = message.shouldShake ? "shake" : "";

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          {profilePic && <img alt="Profile" src={profilePic} />}
        </div>
      </div>
      <div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass}`}>
        {message.message}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {formatedTime}
      </div>
    </div>
  );
};

export default Message;
