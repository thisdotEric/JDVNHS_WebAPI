import { createContext } from 'react';

export interface Notification {
  text: string;
  type: 'success' | 'error';
}

export interface NotificationContextValue {
  notification: Notification;
  setNotification: (notification: Notification) => void;
}

const HeaderContext = createContext<NotificationContextValue>({
  notification: {
    text: '',
    type: 'success',
  },
  setNotification: (notification: Notification) => {},
});

export default HeaderContext;
