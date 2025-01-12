import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./authContext";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (authUser) {
      const socketInstance = io(
        "https://chatapp-production-d7q8.onrender.com",
        {
          query: {
            userId: authUser._id,
          },
        },
      );

      setSocket(socketInstance);

      // Ensure socket is not null before calling .on
      socketInstance.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      return () => {
        socketInstance.close(); // Asegurarse de cerrar correctamente
        setSocket(null);
      };
    } else {
      // Close socket connection if authUser is null
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]); // Dependency array added

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
