// Notification types and interface
import { v4 as uuidv4 } from 'uuid';

type NotificationType = 'info' | 'success' | 'warning' | 'error';

interface INotification {
  type: NotificationType;
  message: string;
  id: string;
  date: Date;
}

// Notification namespace with factory utilities
export namespace Notification {
  export type Type = NotificationType;

  export interface Interface extends INotification {
  }


  export function create(
    type: Type,
    message: string,
  ): Interface {
    return {
      id: generateId(),
      type,
      message,
      date: new Date()
    };
  }

  // Shorthand methods
  export const info = (message: string) =>
    create('info', message);

  export const success = (message: string) =>
    create('success', message);

  export const warning = (message: string) =>
    create('warning', message);

  export const error = (message: string) =>
    create('error', message);

  // Utility
  function generateId(): string {
    return uuidv4();
  }
}
