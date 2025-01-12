import useGetConversations from "../../hooks/useGetConversations";
import { getRandomEmoji } from "../../utils/emoji";
import Conversation from "./Conversation";

const Conversations = () => {
  const { loading, conversations } = useGetConversations();
  return (
    <section className="py-2 flex flex-col overflow-auto">
      {conversations.map((conversation, idx) => {
        const emoji = getRandomEmoji();
        return (
          <Conversation
            key={conversation._id}
            conversation={conversation}
            emoji={emoji}
            lastIdx={idx === conversations.length - 1}
          />
        );
      })}
    </section>
  );
};

export default Conversations;
