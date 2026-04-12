"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  getLeadById,
  getEventById,
  getInteractionsByLeadId,
  getContextByLeadId,
  formatTimestamp,
} from "../../data";

const statusColors: Record<string, string> = {
  new: "bg-blue-100 text-blue-800",
  engaged: "bg-yellow-100 text-yellow-800",
  hot: "bg-orange-100 text-orange-800",
  converted: "bg-green-100 text-green-800",
  lost: "bg-red-100 text-red-800",
};

const actionIcons: Record<string, string> = {
  call: "📞",
  sms: "💬",
  email: "📧",
};

export default function LeadDetailPage() {
  const params = useParams();
  const leadId = Number(params.id);
  const lead = getLeadById(leadId);

  if (!lead) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            Lead not found
          </h1>
          <Link
            href="/"
            className="mt-4 inline-block text-blue-600 hover:underline"
          >
            ← Back to leads
          </Link>
        </div>
      </div>
    );
  }

  const nextEvent = lead.next_event_id
    ? getEventById(lead.next_event_id)
    : null;
  const interactions = getInteractionsByLeadId(leadId);
  const context = getContextByLeadId(leadId);

  function handleTriggerEvent() {
    if (!nextEvent) return;
    alert(
      `Triggering ${nextEvent.action.toUpperCase()} to ${lead!.name}...\n\nThis would initiate the AI agent to ${nextEvent.action === "call" ? "call" : nextEvent.action === "sms" ? "text" : "email"} the parent.`
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Header */}
      <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto max-w-5xl px-6 py-5">
          <Link
            href="/"
            className="text-sm text-blue-600 hover:underline dark:text-blue-400"
          >
            ← All Leads
          </Link>
          <div className="mt-3 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                {lead.name}
              </h1>
              <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">
                {lead.phone} · {lead.goal}
              </p>
            </div>
            <span
              className={`inline-block rounded-full px-3 py-1 text-xs font-medium capitalize ${statusColors[lead.status]}`}
            >
              {lead.status}
            </span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-6 px-6 py-8">
        {/* Next Event Card */}
        {nextEvent ? (
          <section className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Next Scheduled Action
            </h2>
            <div className="mt-3 flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">
                    {actionIcons[nextEvent.action]}
                  </span>
                  <span className="text-lg font-semibold capitalize text-zinc-900 dark:text-zinc-50">
                    {nextEvent.action}
                  </span>
                  <span className="text-sm text-zinc-400">
                    · {formatTimestamp(nextEvent.time)}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                  {nextEvent.summary}
                </p>
              </div>
              <button
                onClick={handleTriggerEvent}
                className="shrink-0 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700 active:bg-blue-800"
              >
                Trigger {nextEvent.action.toUpperCase()}
              </button>
            </div>
          </section>
        ) : (
          <section className="rounded-lg border border-dashed border-zinc-300 bg-white p-6 text-center dark:border-zinc-700 dark:bg-zinc-900">
            <p className="text-sm text-zinc-400">
              No upcoming actions scheduled for this lead.
            </p>
          </section>
        )}

        {/* Context Preview */}
        {context && (
          <section className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Agent Context
            </h2>
            <pre className="mt-3 max-h-48 overflow-auto whitespace-pre-wrap rounded-md bg-zinc-50 p-4 font-mono text-xs leading-relaxed text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
              {context.data}
            </pre>
          </section>
        )}

        {/* Interaction History */}
        <section className="rounded-lg border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="border-b border-zinc-200 px-6 py-4 dark:border-zinc-800">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Interaction History
            </h2>
          </div>
          {interactions.length > 0 ? (
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-zinc-100 bg-zinc-50/50 dark:border-zinc-800 dark:bg-zinc-800/30">
                  <th className="px-6 py-2.5 text-xs font-medium text-zinc-500">
                    Date
                  </th>
                  <th className="px-6 py-2.5 text-xs font-medium text-zinc-500">
                    Channel
                  </th>
                  <th className="px-6 py-2.5 text-xs font-medium text-zinc-500">
                    Direction
                  </th>
                  <th className="px-6 py-2.5 text-xs font-medium text-zinc-500">
                    Summary
                  </th>
                  <th className="px-6 py-2.5 text-xs font-medium text-zinc-500">
                    Intent
                  </th>
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
                        {actionIcons[ix.channel]} {ix.channel.toUpperCase()}
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
      </main>
    </div>
  );
}
