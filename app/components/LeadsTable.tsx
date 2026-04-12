import Link from "next/link";
import type { Lead, Event } from "../data";
import { formatTimestamp } from "../data";
import { StatusBadge } from "./ui";

export function LeadsTable({
  leads,
  getNextEvent,
}: {
  leads: Lead[];
  getNextEvent: (lead: Lead) => Event | null | undefined;
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-800/50">
            <th className="px-4 py-3 font-medium text-zinc-600 dark:text-zinc-300">Name</th>
            <th className="px-4 py-3 font-medium text-zinc-600 dark:text-zinc-300">Goal</th>
            <th className="px-4 py-3 font-medium text-zinc-600 dark:text-zinc-300">Status</th>
            <th className="px-4 py-3 font-medium text-zinc-600 dark:text-zinc-300">Next Action</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => {
            const nextEvent = getNextEvent(lead);
            return (
              <tr
                key={lead.id}
                className="border-b border-zinc-100 transition-colors hover:bg-zinc-50 dark:border-zinc-800/50 dark:hover:bg-zinc-800/30"
              >
                <td className="px-4 py-3">
                  <Link
                    href={`/leads/${lead.id}`}
                    className="font-medium text-blue-600 hover:underline dark:text-blue-400"
                  >
                    {lead.name}
                  </Link>
                  <div className="text-xs text-zinc-400">{lead.phone}</div>
                </td>
                <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300">{lead.goal}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={lead.status} />
                </td>
                <td className="px-4 py-3 text-zinc-500 dark:text-zinc-400">
                  {nextEvent ? (
                    <span className="flex items-center gap-1.5 text-xs">
                      <span className="uppercase font-semibold">{nextEvent.action}</span>
                      <span>·</span>
                      <span>{formatTimestamp(nextEvent.time)}</span>
                    </span>
                  ) : (
                    <span className="text-xs text-zinc-300 dark:text-zinc-600">—</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
