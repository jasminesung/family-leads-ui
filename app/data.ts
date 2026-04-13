export type Channel = "sms" | "call" | "email";

// ---- Firestore serialization helpers ----

export type FirestoreRef = {
  _firestore: { projectId: string };
  _path: { segments: string[] };
  _converter: Record<string, unknown>;
};

export type FirestoreTimestamp = {
  _seconds: number;
  _nanoseconds: number;
};

// ---- Raw API response shapes ----

export type RawEvent = {
  id: string;
  action: string;
  applied_rules: string[];
  context?: FirestoreRef;
  goal: string;
  interaction?: FirestoreRef;
  lead: FirestoreRef;
  scheduled_time: FirestoreTimestamp | number;
  status: string;
};

export type RawInteraction = {
  id: string;
  channel: string;
  data: string;
  date_time?: FirestoreTimestamp | number;
  datetime_start?: string | number;
  datetime_end?: string | number;
  createdAt?: string | number;
  updatedAt?: string | number;
  direction: "in" | "out";
  event?: FirestoreRef | string;
  lead?: FirestoreRef | string;
};

export type RawContext = {
  id: string;
  derived_data: {
    derived_datetime: FirestoreTimestamp | number;
    intent: string;
    intent_score: number;
    key_signals: string;
    objections: string;
    sentiment: string;
    suggested_message: string;
    tone_guidelines: string;
  };
  event?: FirestoreRef;
  lead: FirestoreRef;
};

// ---- Normalized types for UI ----

export type FamilyMember = {
  name: string;
  age: number;
  relationship: string;
  notes: string;
};

export type Lead = {
  id: string;
  name: string;
  phone_no: string;
  goal: string;
  status: string;
  preferred_channel: string;
  preferred_language: string;
  best_contact_window: string;
  channel_response_rate: Record<string, number>;
  family_data: FamilyMember[];
};

export type Event = {
  id: string;
  action: Channel;
  applied_rules: string[];
  context_id: string | null;
  goal: string;
  interaction_id: string | null;
  lead_id: string;
  scheduled_time: number;
  status: string;
};

export type Interaction = {
  id: string;
  channel: Channel;
  data: string;
  date_time: number;
  direction: "in" | "out";
  event_id: string | null;
  lead_id: string;
};

export type DerivedData = {
  derived_datetime: number;
  intent: string;
  intent_score: number;
  key_signals: string[];
  objections: string[];
  sentiment: string;
  suggested_message: string;
  tone_guidelines: string;
};

export type LeadContext = {
  id: string;
  lead_id: string;
  event_id: string | null;
  derived_data: DerivedData;
};

export type Conversation = {
  id: string;
  actor: "system" | "user" | "agent";
  interaction_id: string;
  lead_id: string;
  text: string;
};

export type RawConversation = {
  id: string;
  actor: string;
  interaction?: FirestoreRef | string;
  lead?: FirestoreRef | string;
  text: string;
};

// ---- Parsing helpers ----

export function extractRefPath(ref: FirestoreRef | string | undefined | null): string | null {
  if (!ref) return null;
  if (typeof ref === "string") {
    const parts = ref.split("/");
    return parts[parts.length - 1] ?? null;
  }
  if (!ref._path?.segments) return null;
  const segments = ref._path.segments;
  return segments[segments.length - 1] ?? null;
}

export function extractRefId(ref: FirestoreRef | undefined | null): string | null {
  if (!ref?._path?.segments) return null;
  const segments = ref._path.segments;
  return segments[segments.length - 1] ?? null;
}

export function extractTimestamp(ts: FirestoreTimestamp | number | undefined | null): number {
  if (ts == null) return 0;
  if (typeof ts === "number") return ts;
  return ts._seconds ?? 0;
}

export function parseBulletString(str: string | undefined | null): string[] {
  if (!str) return [];
  return str
    .split("•")
    .map((s) => s.trim())
    .filter(Boolean);
}

export function formatTimestamp(ts: number): string {
  return new Date(ts * 1000).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatDateTime(ts: number): string {
  return new Date(ts * 1000).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}
