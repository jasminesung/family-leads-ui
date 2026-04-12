"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  getLeadById,
  getEventById,
  getInteractionsByLeadId,
  getContextByLeadId,
} from "../../data";
import { StatusBadge } from "../../components/ui";
import { NextEventCard } from "../../components/NextEventCard";
import { AgentContextCard } from "../../components/AgentContext";
import { InteractionHistory } from "../../components/InteractionHistory";

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
          <Link href="/" className="mt-4 inline-block text-blue-600 hover:underline">
            ← Back to leads
          </Link>
        </div>
      </div>
    );
  }

  const nextEvent = lead.next_event_id ? getEventById(lead.next_event_id) ?? null : null;
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
      <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto max-w-5xl px-6 py-5">
          <Link href="/" className="text-sm text-blue-600 hover:underline dark:text-blue-400">
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
            <StatusBadge status={lead.status} />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-6 px-6 py-8">
        <NextEventCard
          event={nextEvent}
          leadName={lead.name}
          onTrigger={handleTriggerEvent}
        />
        {context && <AgentContextCard context={context} />}
        <InteractionHistory interactions={interactions} />
      </main>
    </div>
  );
}
