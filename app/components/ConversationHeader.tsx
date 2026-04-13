import Link from "next/link";
import type { Interaction, Lead } from "../data";
import { formatDateTime } from "../data";
import { CHANNEL_ICONS } from "./constants";

export function ConversationHeader({
  interaction,
  lead,
}: {
  interaction: Interaction;
  lead: Lead | null;
}) {
  return (
    <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mx-auto max-w-3xl px-6 py-5">
        <Link
          href={lead ? `/leads/${lead.id}` : "/"}
          className="text-sm text-blue-600 hover:underline dark:text-blue-400"
        >
          ← {lead ? `Back to ${lead.name}` : "Back to leads"}
        </Link>
        <div className="mt-3">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            Conversation
          </h1>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-zinc-500 dark:text-zinc-400">
            <span className="inline-flex items-center gap-1">
              {CHANNEL_ICONS[interaction.channel]}{" "}
              {interaction.channel.toUpperCase()}
            </span>
            <span>•</span>
            <span>{formatDateTime(interaction.date_time)}</span>
            <span>•</span>
            <span
              className={`text-xs font-medium ${
                interaction.direction === "in"
                  ? "text-green-600"
                  : "text-zinc-400"
              }`}
            >
              {interaction.direction === "in" ? "⬅ Inbound" : "➡ Outbound"}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
