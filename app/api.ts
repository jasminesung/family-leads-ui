import type {
  Lead,
  Event,
  Interaction,
  LeadContext,
  Conversation,
  RawEvent,
  RawInteraction,
  RawContext,
  RawConversation,
} from "./data";
import { extractRefId, extractTimestamp, parseBulletString } from "./data";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

function getBaseUrl(): string {
  if (typeof window === "undefined") {
    return `${BACKEND_URL}/api`;
  }
  return "/api";
}

async function fetchJson<T>(path: string): Promise<T> {
  const res = await fetch(`${getBaseUrl()}${path}`);
  if (!res.ok) {
    throw new Error(`API error ${res.status}: ${path}`);
  }
  return res.json() as Promise<T>;
}

// ---- Normalizers ----

function normalizeEvent(raw: RawEvent): Event {
  return {
    id: raw.id,
    action: raw.action as Event["action"],
    applied_rules: raw.applied_rules ?? [],
    context_id: extractRefId(raw.context),
    goal: raw.goal,
    interaction_id: extractRefId(raw.interaction),
    lead_id: extractRefId(raw.lead) ?? "",
    scheduled_time: extractTimestamp(raw.scheduled_time),
    status: raw.status,
  };
}

function normalizeInteraction(raw: RawInteraction): Interaction {
  return {
    id: raw.id,
    channel: raw.channel as Interaction["channel"],
    data: raw.data,
    date_time: extractTimestamp(raw.date_time),
    direction: raw.direction,
    event_id: extractRefId(raw.event),
    lead_id: extractRefId(raw.lead) ?? "",
  };
}

function normalizeContext(raw: RawContext): LeadContext {
  const d = raw.derived_data ?? {};
  return {
    id: raw.id,
    lead_id: extractRefId(raw.lead) ?? "",
    event_id: extractRefId(raw.event),
    derived_data: {
      derived_datetime: extractTimestamp(d.derived_datetime),
      intent: d.intent ?? "",
      intent_score: d.intent_score ?? 0,
      key_signals: parseBulletString(d.key_signals),
      objections: parseBulletString(d.objections),
      sentiment: d.sentiment ?? "",
      suggested_message: d.suggested_message ?? "",
      tone_guidelines: d.tone_guidelines ?? "",
    },
  };
}

function normalizeConversation(raw: RawConversation): Conversation {
  const interactionPath =
    typeof raw.interaction === "string" ? raw.interaction : extractRefId(raw.interaction);
  const leadPath =
    typeof raw.lead === "string" ? raw.lead : extractRefId(raw.lead);
  return {
    id: raw.id,
    actor: raw.actor as Conversation["actor"],
    interaction_id: interactionPath ?? "",
    lead_id: leadPath ?? "",
    text: raw.text,
  };
}

// ---- Leads ----

export async function fetchLeads(): Promise<Lead[]> {
  return fetchJson<Lead[]>("/leads");
}

export async function fetchLeadById(id: string): Promise<Lead | undefined> {
  const leads = await fetchLeads();
  return leads.find((l) => l.id === id);
}

// ---- Events ----

export async function fetchEvents(): Promise<Event[]> {
  const raw = await fetchJson<RawEvent[]>("/events");
  return raw.map(normalizeEvent);
}

export async function fetchEventById(id: string): Promise<Event | undefined> {
  const events = await fetchEvents();
  return events.find((e) => e.id === id);
}

export async function fetchEventsByLeadId(leadId: string): Promise<Event[]> {
  const events = await fetchEvents();
  return events.filter((e) => e.lead_id === leadId);
}

// ---- Interactions ----

export async function fetchInteractions(): Promise<Interaction[]> {
  const raw = await fetchJson<RawInteraction[]>("/interactions");
  return raw.map(normalizeInteraction);
}

export async function fetchInteractionsByLeadId(
  leadId: string
): Promise<Interaction[]> {
  const interactions = await fetchInteractions();
  return interactions
    .filter((i) => i.lead_id === leadId)
    .sort((a, b) => b.date_time - a.date_time);
}

// ---- Context ----

export async function fetchContexts(): Promise<LeadContext[]> {
  const raw = await fetchJson<RawContext[]>("/context");
  return raw.map(normalizeContext);
}

export async function fetchContextByLeadId(
  leadId: string
): Promise<LeadContext | undefined> {
  const contexts = await fetchContexts();
  return contexts.find((c) => c.lead_id === leadId);
}

// ---- Conversations ----

export async function fetchConversationsByInteractionId(
  interactionId: string
): Promise<Conversation[]> {
  const raw = await fetchJson<RawConversation[]>(
    `/interactions/${interactionId}/conversations`
  );
  return raw.map(normalizeConversation);
}

export async function fetchInteractionById(
  id: string
): Promise<Interaction | undefined> {
  const interactions = await fetchInteractions();
  return interactions.find((i) => i.id === id);
}
