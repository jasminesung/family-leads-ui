import type { Event } from "../data";
import { formatDateTime } from "../data";
import { CHANNEL_ICONS } from "./constants";
import { SectionHeader } from "./ui";

export function PastActionsCard({ events }: { events: Event[] }) {
  if (events.length === 0) {
    return null;
  }

  return (
    <section className="rounded-lg border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="border-b border-zinc-200 px-6 py-4 dark:border-zinc-800">
        <SectionHeader>Past Actions</SectionHeader>
      </div>
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-zinc-100 bg-zinc-50/50 dark:border-zinc-800 dark:bg-zinc-800/30">
            <th className="px-6 py-2.5 text-xs font-medium text-zinc-500">
              Date
            </th>
            <th className="px-6 py-2.5 text-xs font-medium text-zinc-500">
              Action
            </th>
            <th className="px-6 py-2.5 text-xs font-medium text-zinc-500">
              Goal
            </th>
            <th className="px-6 py-2.5 text-xs font-medium text-zinc-500">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr
              key={event.id}
              className="border-b border-zinc-50 dark:border-zinc-800/50"
            >
              <td className="whitespace-nowrap px-6 py-3 text-zinc-500">
                {formatDateTime(event.scheduled_time)}
              </td>
              <td className="px-6 py-3">
                <span className="inline-flex items-center gap-1 text-zinc-700 dark:text-zinc-300">
                  {CHANNEL_ICONS[event.action]} {event.action.toUpperCase()}
                </span>
              </td>
              <td className="max-w-xs px-6 py-3 text-zinc-700 dark:text-zinc-300">
                {event.goal}
              </td>
              <td className="px-6 py-3">
                <StatusBadge status={event.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

function StatusBadge({ status }: { status: string }) {
  const statusStyles: Record<string, string> = {
    completed:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    pending:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    failed: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    scheduled:
      "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  };

  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${statusStyles[status] ?? "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"}`}
    >
      {status}
    </span>
  );
}
