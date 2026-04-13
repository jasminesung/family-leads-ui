import type { Conversation, Interaction } from "../data";
import { SectionHeader } from "./ui";
import { MessageBubble } from "./MessageBubble";

export function ConversationMessages({
  conversations,
  interaction,
}: {
  conversations: Conversation[];
  interaction: Interaction;
}) {
  return (
    <section className="rounded-lg border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="border-b border-zinc-200 px-6 py-4 dark:border-zinc-800">
        <SectionHeader>Messages</SectionHeader>
      </div>
      {conversations.length > 0 ? (
        <div className="space-y-4 p-6">
          {conversations.map((msg) => (
            <MessageBubble
              key={msg.id}
              message={msg}
              isAgent={msg.actor === "agent"}
            />
          ))}
        </div>
      ) : (
        <ConversationEmptyState interactionData={interaction.data} />
      )}
    </section>
  );
}

function ConversationEmptyState({
  interactionData,
}: {
  interactionData: string;
}) {
  return (
    <div className="px-6 py-12 text-center">
      <p className="text-sm text-zinc-400">
        No messages in this conversation yet.
      </p>
      {interactionData && (
        <div className="mt-4 rounded-lg bg-zinc-50 p-4 dark:bg-zinc-800">
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
            Interaction Summary
          </p>
          <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
            {interactionData}
          </p>
        </div>
      )}
    </div>
  );
}
