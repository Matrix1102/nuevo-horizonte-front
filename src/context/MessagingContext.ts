import { createContext } from 'react';

type Folder = 'recibidos' | 'enviados' | 'borradores' | 'papelera';

export type Message = {
  id: string;
  from: string;
  to: string;
  subject: string;
  body: string;
  date: string;
  folder: Folder;
  read?: boolean;
};

export type MessagingContextType = {
  messages: Message[];
  setMessages: (messages: Message[]) => void;
  unreadCount: number;
  markAsRead: (messageId: string) => void;
  addMessage: (message: Omit<Message, 'id'>) => void;
  getUnreadCountForUser: (userName: string) => number;
};

export const MessagingContext = createContext<MessagingContextType | undefined>(undefined);
