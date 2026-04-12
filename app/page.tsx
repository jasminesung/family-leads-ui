import Link from "next/link";
import { LEADS, getEventById, formatTimestamp } from "./data";

const statusColors: Record<string, string> = {
  new: "bg-blue-100 text-blue-800",
  engaged: "bg-yellow-100 text-yellow-800",
  hot: "bg-orange-100 text-orange-800",
  converted: "bg-green-100 text-green-800",
  lost: "bg-red-100 text-red-800",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto max-w-5xl px-6 py-5">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            ⚽ Soccer Camp Leads
          </h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            {LEADS.length} families · Summer 2025 enrollment
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-8">
        <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-800/50">
                <th className="px-4 py-3 font-medium text-zinc-600 dark:text-zinc-300">
                  Name
                </th>
                <th className="px-4 py-3 font-medium text-zinc-600 dark:text-zinc-300">
                  Goal
                </th>
                <th className="px-4 py-3 font-medium text-zinc-600 dark:text-zinc-300">
                  Status
                </th>
                <th className="px-4 py-3 font-medium text-zinc-600 dark:text-zinc-300">
                  Next Action
                </th>
              </tr>
            </thead>
            <tbody>
              {LEADS.map((lead) => {
                const nextEvent = lead.next_event_id
                  ? getEventById(lead.next_event_id)
                  : null;
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
                      <div className="text-xs text-zinc-400">
                        {lead.phone}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300">
                      {lead.goal}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${statusColors[lead.status]}`}
                      >
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-zinc-500 dark:text-zinc-400">
                      {nextEvent ? (
                        <span className="flex items-center gap-1.5 text-xs">
                          <span className="uppercase font-semibold">
                            {nextEvent.action}
                          </span>
                          <span>·</span>
                          <span>{formatTimestamp(nextEvent.time)}</span>
                        </span>
                      ) : (
                        <span className="text-xs text-zinc-300 dark:text-zinc-600">
                          —
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
