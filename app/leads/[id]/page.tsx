"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import type { Lead, Event, Interaction, LeadContext } from "../../data";
import {
  fetchLeadById,
  fetchEventsByLeadId,
  fetchInteractionsByLeadId,
  fetchContextByLeadId,
} from "../../api";
import { StatusBadge, KeyValueRow, GroupHeading } from "../../components/ui";
import { CHANNEL_ICONS } from "../../components/constants";
import { NextEventCard } from "../../components/NextEventCard";
import { AgentContextCard } from "../../components/AgentContext";
import { InteractionHistory } from "../../components/InteractionHistory";

export default function LeadDetailPage() {
  const params = useParams();
  const leadId = params.id as string;

  const [lead, setLead] = useState<Lead | null>(null);
  const [nextEvent, setNextEvent] = useState<Event | null>(null);
  const [interactions, setInteractions] = useState<Interaction[]>([]);
  const [context, setContext] = useState<LeadContext | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const leadData = await fetchLeadById(leadId);
      if (!leadData) {
        setLoading(false);
        return;
      }
      setLead(leadData);

      const [events, ixs, ctx] = await Promise.all([
        fetchEventsByLeadId(leadId),
        fetchInteractionsByLeadId(leadId),
        fetchContextByLeadId(leadId),
      ]);

      const sorted = events.sort((a, b) => b.scheduled_time - a.scheduled_time);
      setNextEvent(sorted[0] ?? null);
      setInteractions(ixs);
      setContext(ctx ?? null);
      setLoading(false);
    }
    load();
  }, [leadId]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <p className="text-sm text-zinc-400">Loading…</p>
      </div>
    );
  }

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

  function handleTriggerEvent() {
    if (!nextEvent || !lead) return;
    alert(
      `Triggering ${nextEvent.action.toUpperCase()} to ${lead.name}...\n\nThis would initiate the AI agent to ${nextEvent.action === "call" ? "call" : nextEvent.action === "sms" ? "text" : "email"} the parent.`
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
                {lead.phone_no} · {lead.goal}
              </p>
            </div>
            <StatusBadge status={lead.status} />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-6 px-6 py-8">
        {/* Lead Info Card */}
        <section className="rounded-lg border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="grid gap-px bg-zinc-100 dark:bg-zinc-800 sm:grid-cols-2">
            {/* Contact Preferences */}
            <div className="bg-white p-5 dark:bg-zinc-900">
              <GroupHeading>contact_info</GroupHeading>
              <dl className="space-y-1 text-sm">
                <KeyValueRow label="preferred_channel" value={`${CHANNEL_ICONS[lead.preferred_channel] ?? ""} ${lead.preferred_channel}`} />
                <KeyValueRow label="preferred_language" value={lead.preferred_language} />
                <KeyValueRow label="best_contact_window" value={lead.best_contact_window} />
                <KeyValueRow
                  label="channel_response_rate"
                  value={Object.entries(lead.channel_response_rate ?? {})
                    .map(([k, v]) => `${k}: ${(v * 100).toFixed(0)}%`)
                    .join(", ")}
                />
              </dl>
            </div>

            {/* Family Data */}
            <div className="bg-white p-5 dark:bg-zinc-900">
              <GroupHeading>
                {(lead.family_data ?? []).length === 1 ? "family" : "families"}
              </GroupHeading>
              <div className="space-y-3">
                {(lead.family_data ?? []).map((child) => (
                  <div
                    key={child.name}
                    className="rounded-md border border-zinc-100 p-3 dark:border-zinc-700"
                  >
                    <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                      {child.name}
                      <span className="ml-1.5 text-xs font-normal text-zinc-400">
                        age {child.age} · {child.relationship}
                      </span>
                    </p>
                    <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-300">
                      {child.notes}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <NextEventCard event={nextEvent} onTrigger={handleTriggerEvent} />
        {context && <AgentContextCard context={context} />}
        <InteractionHistory interactions={interactions} />
      </main>
    </div>
  );
}
