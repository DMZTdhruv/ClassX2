'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import SocketContextProvider from './SocketContext';
import { useAuthContext } from './AuthContext';
import { Api } from '@/Constants';

interface ISocketContextProps {
  socket: Socket | null;
  activeUsers: string[];
}

export const SocketContext = createContext<ISocketContextProps | undefined>(undefined);

export const useClassXSocketContext = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error(
      'useClassXSocketContext must be used within the ClassXContextProvider wrapper'
    );
  }

  return context;
};

const ClassXSocketContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [activeUsers, setActiveUsers] = useState<string[]>([]);

  const { authUser } = useAuthContext();

  useEffect(() => {
    if (authUser) {
      const socketInstance = io(`${Api}`, {
        query: {
          userId: authUser.userProfileId,
        },
      });

      setSocket(socketInstance);
      socketInstance.on('activeUsers', users => {
        setActiveUsers(users);
      });

      socketInstance.emit('hello', {
        greetings: 'hello world',
      });
      return () => {
        socketInstance.close();
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  const value = {
    socket,
    activeUsers,
  };

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
};

export default ClassXSocketContextProvider;
