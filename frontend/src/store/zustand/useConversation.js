import { create } from "zustand";
import { persist } from "zustand/middleware";

const useConversation = create(
  persist(
    (set) => ({
      selectedConversation: null,
      messages: [],
      setSelectedConversation: (conversation) => {
        set({ selectedConversation: conversation });
      },
      setMessages: (messages) => set({ messages }),
      clearMessages: () => set({ messages: [] }),
      addMessage: (newMessage) =>
        set((state) => ({
          messages: [...state.messages, newMessage],
        })),
    }),
    {
      name: "conversation-storage",
      partialize: (state) => ({
        selectedConversation: state.selectedConversation,
      }),
    },
  ),
);

export default useConversation;
