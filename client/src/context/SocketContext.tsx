'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { useAuthContext } from './AuthContext';
import { Api } from '@/Constants';

interface SocketContextProps {
  socket: Socket | null;
  activeUsers: any[];
}

export const SocketContext = createContext<SocketContextProps | undefined>(undefined);

export const useSocketContext = () => {
  const context = useContext(SocketContext);

  if (!context) {
    throw new Error(
      'useClassXSocketContext must be used within a SocketContextProvider'
    );
  }

  return context;
};

const SocketContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [activeUsers, setActiveUsers] = useState<any[]>([]);
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (authUser) {
      const socketInstance = io(`${Api}`, {
        query: {
          userId: authUser.userProfileId,
        },
        withCredentials: true
      });

      setSocket(socketInstance);
      socketInstance.on('activeUsers', users => {
        setActiveUsers(users);
      });

      socketInstance.on('private_message_StoC', message => {
        console.log(message);
      });

      return () => {
        socketInstance.off();
        socketInstance.disconnect();
      };
    } else {
      if (socket) {
        socket.off();
        socket.disconnect();
        setSocket(null);
      }
    }
  }, [authUser]);

  const socketValues: SocketContextProps = {
    socket: socket,
    activeUsers: activeUsers,
  };

  return (
    <SocketContext.Provider value={socketValues}>{children}</SocketContext.Provider>
  );
};

export default SocketContextProvider;
