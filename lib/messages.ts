// lib/messages.ts
export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

declare global {
  var __messages: ContactMessage[] | undefined;
}

const messages: ContactMessage[] = globalThis.__messages ?? (globalThis.__messages = []);

export function addMessage(data: Omit<ContactMessage, 'id' | 'createdAt'>) {
  const item: ContactMessage = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    ...data,
  };
  messages.push(item);
  return item;
}

export function getMessages() {
  return messages;
}