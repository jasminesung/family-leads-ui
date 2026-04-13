import type { Conversation } from "../data";

export function MessageBubble({
  message,
  isAgent,
}: {
  message: Conversation;
  isAgent: boolean;
}) {
  return (
    <div className={`flex ${isAgent ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[75%] rounded-2xl px-4 py-3 ${
          isAgent
            ? "bg-blue-600 text-white"
            : message.actor === "system"
              ? "bg-zinc-200 text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300"
              : "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"
        }`}
      >
        <p className="text-sm">{message.text}</p>
        <p
          className={`mt-1 text-xs ${
            isAgent ? "text-blue-200" : "text-zinc-400"
          }`}
        >
          {message.actor === "agent"
            ? "Agent"
            : message.actor === "system"
              ? "System"
              : "User"}
        </p>
      </div>
    </div>
  );
}
