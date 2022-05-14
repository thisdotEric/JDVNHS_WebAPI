import React from 'react';
import './Notification.css';
import type { NotificationProps } from '@mantine/notifications';
import { Check, X, InfoCircle } from 'tabler-icons-react';

export type NotificationType = 'success' | 'error' | 'info';

export const getNotificationProps = (
  title: string,
  notificationType: NotificationType,
): NotificationProps => {
  let partialNotification: NotificationProps;

  if (notificationType === 'error') {
    partialNotification = {
      title,
      message: null,
      icon: <X stroke="white" height={15} />,
      color: 'red',
    };
  } else if (notificationType === 'info') {
    partialNotification = {
      title,
      message: null,
      icon: <InfoCircle stroke="white" />,
    };
  } else {
    partialNotification = {
      title,
      message: null,
      icon: <Check stroke="white" height={15} />,
      color: 'teal',
    };
  }

  return {
    ...partialNotification,
    autoClose: 2500,
    radius: 'md',
    classNames: {
      root: 'notification-body',
      title: 'notification-description',
      icon: 'notification-icon',
    },
  };
};
