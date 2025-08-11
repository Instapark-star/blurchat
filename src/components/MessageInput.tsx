import * as React from "react";

interface MessageInputProps {
  onSend: (text: string) => void;
}

export default function MessageInput({ onSend }: MessageInputProps) {
  const [text, setText] = React.useState("");

  const handleSend = () => {
    if (text.trim() !== "") {
      onSend(text.trim());
      setText("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="p-4 border-t border-white/10 bg-black flex">
      <input
        className="flex-1 p-2 rounded-l bg-gray-800 text-white outline-none"
        type="text"
        placeholder="Type a message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <button
        className="bg-blue-500 px-4 rounded-r text-white font-semibold hover:bg-blue-600"
        onClick={handleSend}
      >
        Send
      </button>
    </div>
  );
}
