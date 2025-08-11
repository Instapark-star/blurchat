// src/types.ts
export interface MessageType {
  id: string;
  text: string;
  sender: string;
  color?: string;
  timestamp?: number;
  privateTo?: string;
  room?: string;
}

export type UserStatus = "online" | "offline" | "idle";

export interface User {
  name: string;
  color?: string;
  status?: UserStatus;
}
