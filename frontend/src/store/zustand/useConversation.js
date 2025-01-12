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
      // Añadir método para limpiar mensajes cuando se cambia de conversación
      clearMessages: () => set({ messages: [] }),
      // Añadir método para añadir un nuevo mensaje
      addMessage: (newMessage) =>
        set((state) => ({
          messages: [...state.messages, newMessage],
        })),
    }),
    {
      name: "conversation-storage",
      partialize: (state) => ({
        selectedConversation: state.selectedConversation,
        // No persistimos los mensajes para evitar inconsistencias
      }),
    },
  ),
);

export default useConversation;
