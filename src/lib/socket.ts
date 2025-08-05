// src/lib/socket.ts
import { io } from "socket.io-client"

const URL = "http://localhost:3000" // change this to VPS/production later

export const socket = io(URL, {
  autoConnect: false, // connect manually when needed
})
