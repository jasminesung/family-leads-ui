"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import type { Interaction, Conversation, Lead } from "../../data";
import {
  fetchInteractionById,
  fetchConversationsByInteractionId,
  fetchLeadById,
} from "../../api";
import { ConversationHeader } from "../../components/ConversationHeader";
import { ConversationMessages } from "../../components/ConversationMessages";

export default function InteractionConversationPage() {
  const params = useParams();
  const interactionId = params.id as string;

  const [interaction, setInteraction] = useState<Interaction | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const [interactionData, conversationData] = await Promise.all([
          fetchInteractionById(interactionId),
          fetchConversationsByInteractionId(interactionId),
        ]);

        if (interactionData) {
          setInteraction(interactionData);
          const leadData = await fetchLeadById(interactionData.lead_id);
          setLead(leadData ?? null);
        }
        setConversations(conversationData);
      } catch (error) {
        console.error("Failed to load conversation:", error);
      }
      setLoading(false);
    }
    load();
  }, [interactionId]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <p className="text-sm text-zinc-400">Loading…</p>
      </div>
    );
  }

  if (!interaction) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            Interaction not found
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

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <ConversationHeader interaction={interaction} lead={lead} />
      <main className="mx-auto max-w-3xl px-6 py-8">
        <ConversationMessages
          conversations={conversations}
          interaction={interaction}
        />
      </main>
    </div>
  );
}
