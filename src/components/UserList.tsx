// src/components/UserList.tsx
import React from "react";
import { User } from "@/types";
import { cn } from "@/lib/utils";

export default function UserList({ users, currentUser }: { users: User[]; currentUser: string }) {
  return (
    <aside className="w-56 border-r border-white/10 bg-zinc-900 hidden md:flex flex-col">
      <h3 className="p-4 font-semibold text-white">Users</h3>
      <ul className="p-2 space-y-2 overflow-y-auto">
        {users.map((u) => (
          <li key={u.name} className={cn("flex items-center gap-2 p-2 rounded-md", u.name === currentUser ? "bg-white/10 font-semibold" : "hover:bg-white/5")}>
            <span className={cn("w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold", u.color || "bg-white/10")}>{u.name}</span>
            <div className="flex-1 text-white">{u.name}</div>
            <div
              aria-hidden
              title={u.status ?? "offline"}
              className={cn("w-3 h-3 rounded-full", u.status === "online" ? "bg-green-500" : u.status === "idle" ? "bg-yellow-400" : "bg-gray-500")}
            />
          </li>
        ))}
      </ul>
    </aside>
  );
}
