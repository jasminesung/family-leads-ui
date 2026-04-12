import type { Interaction } from "../data";
import { formatTimestamp } from "../data";
import { CHANNEL_ICONS } from "./constants";
import { SectionHeader } from "./ui";

export function InteractionHistory({
  interactions,
}: {
  interactions: Interaction[];
}) {
  return (
    <section className="rounded-lg border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="border-b border-zinc-200 px-6 py-4 dark:border-zinc-800">
        <SectionHeader>Interaction History</SectionHeader>
      </div>
      {interactions.length > 0 ? (
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-zinc-100 bg-zinc-50/50 dark:border-zinc-800 dark:bg-zinc-800/30">
              <th className="px-6 py-2.5 text-xs font-medium text-zinc-500">Date</th>
              <th className="px-6 py-2.5 text-xs font-medium text-zinc-500">Channel</th>
              <th className="px-6 py-2.5 text-xs font-medium text-zinc-500">Direction</th>
              <th className="px-6 py-2.5 text-xs font-medium text-zinc-500">Summary</th>
              <th className="px-6 py-2.5 text-xs font-medium text-zinc-500">Intent</th>
            </tr>
          </thead>
          <tbody>
            {interactions.map((ix) => (
              <tr
                key={ix.id}
                className="border-b border-zinc-50 dark:border-zinc-800/50"
              >
                <td className="whitespace-nowrap px-6 py-3 text-zinc-500">
                  {formatTimestamp(ix.time)}
                </td>
                <td className="px-6 py-3">
                  <span className="inline-flex items-center gap-1 text-zinc-700 dark:text-zinc-300">
                    {CHANNEL_ICONS[ix.channel]} {ix.channel.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-3">
                  <span
                    className={`text-xs font-medium ${ix.direction === "inbound" ? "text-green-600" : "text-zinc-400"}`}
                  >
                    {ix.direction === "inbound" ? "⬅ In" : "➡ Out"}
                  </span>
                </td>
                <td className="max-w-md px-6 py-3 text-zinc-700 dark:text-zinc-300">
                  {ix.summary}
                </td>
                <td className="px-6 py-3">
                  <span className="rounded bg-zinc-100 px-2 py-0.5 text-xs font-mono text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                    {ix.intent}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="px-6 py-8 text-center text-sm text-zinc-400">
          No interactions recorded yet.
        </div>
      )}
    </section>
  );
}
