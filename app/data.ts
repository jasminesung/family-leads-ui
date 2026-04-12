export type Channel = "sms" | "call" | "email";

export enum Intent {
  SIGN_UP = "SIGN_UP",
  LEARN_MORE = "LEARN_MORE",
  NOT_INTERESTED = "NOT_INTERESTED",
}

export type Lead = {
  id: number;
  name: string;
  phone: string;
  goal: string;
  status: "new" | "engaged" | "hot" | "converted" | "lost";
  next_event_id: number | null;
  last_interaction_id: number | null;
};

export type Event = {
  id: number;
  lead_id: number;
  time: number;
  action: Channel;
  summary: string;
  context_id: number;
};

export type Interaction = {
  id: number;
  lead_id: number;
  time: number;
  channel: Channel;
  direction: "inbound" | "outbound";
  summary: string;
  intent: Intent;
};

export const LEADS: Lead[] = [
  {
    id: 1,
    name: "John Doe",
    phone: "(512) 555-0847",
    goal: "Sign up two kids for soccer summer camp",
    status: "hot",
    next_event_id: 1,
    last_interaction_id: 4,
  },
  {
    id: 2,
    name: "Sarah Kim",
    phone: "(512) 555-1923",
    goal: "Enroll daughter in beginner soccer camp",
    status: "engaged",
    next_event_id: 2,
    last_interaction_id: 6,
  },
  {
    id: 3,
    name: "Marcus Johnson",
    phone: "(512) 555-3341",
    goal: "Sign up son for advanced soccer training",
    status: "new",
    next_event_id: 3,
    last_interaction_id: 7,
  },
  {
    id: 4,
    name: "Lisa Patel",
    phone: "(512) 555-7782",
    goal: "Explore summer camp options for three kids",
    status: "converted",
    next_event_id: null,
    last_interaction_id: 9,
  },
  {
    id: 5,
    name: "David Chen",
    phone: "(512) 555-6019",
    goal: "Re-enroll twins for second summer",
    status: "lost",
    next_event_id: 4,
    last_interaction_id: 11,
  },
];

export const EVENTS: Event[] = [
  {
    id: 1,
    lead_id: 1,
    time: 1744588800, // Apr 14 2025
    action: "sms",
    summary:
      'Send early-bird deadline reminder with sibling discount details. Mention Lil\' Kickers program for Sofia.',
    context_id: 1,
  },
  {
    id: 2,
    lead_id: 2,
    time: 1744675200, // Apr 15 2025
    action: "call",
    summary:
      "Follow up on trial session interest. Offer Saturday morning slot.",
    context_id: 2,
  },
  {
    id: 3,
    lead_id: 3,
    time: 1744761600, // Apr 16 2025
    action: "sms",
    summary:
      "Introduce camp program and share schedule link. Mention Coach Rivera.",
    context_id: 3,
  },
  {
    id: 4,
    lead_id: 5,
    time: 1744848000, // Apr 17 2025
    action: "email",
    summary:
      'Win-back email: share new "returning families" 20% discount and updated facilities photos.',
    context_id: 5,
  },
];

export const INTERACTIONS: Interaction[] = [
  // John Doe interactions
  {
    id: 1,
    lead_id: 1,
    time: 1741737600, // Mar 12
    channel: "sms",
    direction: "inbound",
    summary: "Replied to camp flyer link. Asked about age groups and pricing.",
    intent: Intent.LEARN_MORE,
  },
  {
    id: 2,
    lead_id: 1,
    time: 1741910400, // Mar 14
    channel: "sms",
    direction: "outbound",
    summary:
      'Sent session details and early-bird discount. John responded: "Looks great. Need to check with my husband."',
    intent: Intent.LEARN_MORE,
  },
  {
    id: 3,
    lead_id: 1,
    time: 1743120000, // Mar 28
    channel: "call",
    direction: "outbound",
    summary:
      "No answer. Left voicemail reminding early-bird pricing ends Apr 15.",
    intent: Intent.LEARN_MORE,
  },
  {
    id: 4,
    lead_id: 1,
    time: 1743638400, // Apr 3
    channel: "sms",
    direction: "outbound",
    summary:
      'Followed up. John asked about sibling discount. Confirmed 15%. John replied: "Let me talk to Lucas\'s coach first."',
    intent: Intent.SIGN_UP,
  },
  // Sarah Kim interactions
  {
    id: 5,
    lead_id: 2,
    time: 1743206400, // Mar 29
    channel: "sms",
    direction: "inbound",
    summary:
      "Asked if there are beginner-only groups. Daughter Mia (age 6) has never played.",
    intent: Intent.LEARN_MORE,
  },
  {
    id: 6,
    lead_id: 2,
    time: 1743292800, // Mar 30
    channel: "sms",
    direction: "outbound",
    summary:
      'Explained Lil\' Kickers beginner program. Sarah replied: "Can she try one session first?"',
    intent: Intent.LEARN_MORE,
  },
  // Marcus Johnson interactions
  {
    id: 7,
    lead_id: 3,
    time: 1744070400, // Apr 8
    channel: "call",
    direction: "inbound",
    summary:
      "Called asking about advanced/competitive track. Son Jayden (11) plays travel soccer.",
    intent: Intent.LEARN_MORE,
  },
  // Lisa Patel interactions
  {
    id: 8,
    lead_id: 4,
    time: 1742342400, // Mar 19
    channel: "sms",
    direction: "inbound",
    summary:
      "Inquired about multi-child pricing for 3 kids (ages 6, 8, 10).",
    intent: Intent.LEARN_MORE,
  },
  {
    id: 9,
    lead_id: 4,
    time: 1742860800, // Mar 25
    channel: "call",
    direction: "outbound",
    summary:
      "Discussed family package. Lisa signed up all three on the call. Payment confirmed.",
    intent: Intent.SIGN_UP,
  },
  // David Chen interactions
  {
    id: 10,
    lead_id: 5,
    time: 1742428800, // Mar 20
    channel: "sms",
    direction: "outbound",
    summary:
      "Sent returning families discount. David replied: \"Kids didn't love it last year. Thinking about swim camp instead.\"",
    intent: Intent.NOT_INTERESTED,
  },
  {
    id: 11,
    lead_id: 5,
    time: 1743033600, // Mar 27
    channel: "call",
    direction: "outbound",
    summary:
      "Called to discuss concerns. No answer. Left voicemail about new coaches and updated drills.",
    intent: Intent.NOT_INTERESTED,
  },
];

export type FamilyMember = {
  name: string;
  age: number;
  grade: string;
  soccer_experience: string | null;
  position?: string;
  notes: string;
};

export type PastInteractionSummary = {
  date: string;
  channel: Channel;
  direction: "inbound" | "outbound";
  summary: string;
};

export type LeadContext = {
  id: number;
  lead_id: number;
  lead_info: {
    name: string;
    phone: string;
    preferred_language: string;
    best_contact_window: string;
    preferred_channel: Channel;
    channel_response_rates: Record<string, string>;
  };
  status: string;
  family_info: FamilyMember[];
  last_derived_data: {
    derived_at: string;
    intent_score: number;
    key_signals: string[];
    objections: string[];
    sentiment: "positive" | "neutral" | "negative";
    suggested_message: string;
    tone_guidelines: string;
  };
  past_interactions: PastInteractionSummary[];
  current_action: {
    action: Channel;
    scheduled_at: string;
    applied_rules: string[];
  };
};

export const CONTEXT: LeadContext[] = [
  {
    id: 1,
    lead_id: 1,
    lead_info: {
      name: "John Doe",
      phone: "(512) 555-0847",
      preferred_language: "English",
      best_contact_window: "Weekdays 3–6 PM CT",
      preferred_channel: "sms",
      channel_response_rates: { sms: "4/5", call: "1/3" },
    },
    status: "hot",
    family_info: [
      {
        name: "Lucas",
        age: 9,
        grade: "Entering 4th",
        soccer_experience: "Rec league (Fall 2025)",
        position: "Midfielder",
        notes: "High intent — parent initiated contact for him",
      },
      {
        name: "Sofia",
        age: 7,
        grade: "Entering 2nd",
        soccer_experience: null,
        notes:
          'Interested but shy. Position beginner-friendly angle (Lil\' Kickers).',
      },
    ],
    last_derived_data: {
      derived_at: "2025-04-03T18:30:00Z",
      intent_score: 0.78,
      key_signals: [
        "High intent for Lucas (prior soccer, parent initiated contact)",
        "Moderate intent for Sofia (interest but hesitation around shyness)",
        "Price-sensitive — responded positively to sibling discount",
        "Decision involves husband and Lucas's current coach",
      ],
      objections: [
        "Cost concern",
        "Sofia's confidence level",
        "Needs spousal buy-in",
      ],
      sentiment: "positive",
      suggested_message:
        'Hi John! Just a quick heads-up — early-bird pricing ends this Tuesday, Apr 15. With the sibling discount, Lucas and Sofia would be $340 total (saves you $110). Sofia would be in our Lil\' Kickers group — small teams, super encouraging coaches. Want me to hold two spots? No commitment yet. 😊',
      tone_guidelines:
        "Warm, low-pressure, family-oriented. Mirror casual texting style. Use kids' first names.",
    },
    past_interactions: [
      { date: "2025-03-12", channel: "sms", direction: "inbound", summary: "Replied to camp flyer. Asked about age groups and pricing." },
      { date: "2025-03-14", channel: "sms", direction: "outbound", summary: 'Sent session details + early-bird discount. Responded: "Need to check with my husband."' },
      { date: "2025-03-28", channel: "call", direction: "outbound", summary: "No answer. Voicemail left re: early-bird deadline Apr 15." },
      { date: "2025-04-03", channel: "sms", direction: "outbound", summary: 'Asked about sibling discount. Confirmed 15%. Replied: "Let me talk to Lucas\'s coach."' },
    ],
    current_action: {
      action: "sms",
      scheduled_at: "2025-04-14T15:00:00Z",
      applied_rules: ["LearnMoreRule", "SiblingDiscountRule", "DeadlineUrgencyRule"],
    },
  },
  {
    id: 2,
    lead_id: 2,
    lead_info: {
      name: "Sarah Kim",
      phone: "(512) 555-1923",
      preferred_language: "English",
      best_contact_window: "Weekday mornings",
      preferred_channel: "call",
      channel_response_rates: { sms: "1/1", call: "0/0" },
    },
    status: "engaged",
    family_info: [
      {
        name: "Mia",
        age: 6,
        grade: "Entering 1st",
        soccer_experience: null,
        notes:
          'No sports experience. Mom wants her to "try something active." Cautious parent.',
      },
    ],
    last_derived_data: {
      derived_at: "2025-03-30T14:00:00Z",
      intent_score: 0.55,
      key_signals: [
        "Interested but cautious — wants trial before committing",
        "Budget is not a concern",
        "Wants to see the environment first",
      ],
      objections: [
        "Child's readiness for team sports",
        "Wants to visit/trial before paying",
      ],
      sentiment: "neutral",
      suggested_message:
        "Hi Sarah! We'd love for Mia to try a free session this Saturday at 10 AM. It's a small group of 6 kids with Coach Daniela — super gentle and encouraging. No commitment, just come see if Mia has fun! Want me to save her a spot?",
      tone_guidelines: "Reassuring, patient, educational. Emphasize safety and nurturing environment.",
    },
    past_interactions: [
      { date: "2025-03-29", channel: "sms", direction: "inbound", summary: "Asked if there are beginner-only groups. Daughter Mia (6) has never played." },
      { date: "2025-03-30", channel: "sms", direction: "outbound", summary: 'Explained Lil\' Kickers program. Replied: "Can she try one session first?"' },
    ],
    current_action: {
      action: "call",
      scheduled_at: "2025-04-15T10:00:00Z",
      applied_rules: ["TrialOfferRule", "BeginnerNurtureRule"],
    },
  },
  {
    id: 3,
    lead_id: 3,
    lead_info: {
      name: "Marcus Johnson",
      phone: "(512) 555-3341",
      preferred_language: "English",
      best_contact_window: "Evenings after 7 PM CT",
      preferred_channel: "sms",
      channel_response_rates: { call: "1/1" },
    },
    status: "new",
    family_info: [
      {
        name: "Jayden",
        age: 11,
        grade: "Entering 6th",
        soccer_experience: "Travel soccer",
        position: "Striker",
        notes: "Looking for advanced summer skill development. Competitive player.",
      },
    ],
    last_derived_data: {
      derived_at: "2025-04-08T20:00:00Z",
      intent_score: 0.65,
      key_signals: [
        "High intent — called in proactively",
        "Wants competitive/advanced track specifically",
        "Asked about coach credentials and training methodology",
      ],
      objections: [],
      sentiment: "positive",
      suggested_message:
        "Hey Marcus! Great chatting earlier. Here's the Advanced Track info for Jayden: 3-week intensive, 8:1 player-coach ratio, led by Coach Rivera (ex-MLS, USSF A-license). Schedule + registration link: [link]. Happy to answer any Qs!",
      tone_guidelines: "Direct, knowledgeable, sports-focused. Speak to the competitive parent.",
    },
    past_interactions: [
      { date: "2025-04-08", channel: "call", direction: "inbound", summary: "Called asking about advanced/competitive track. Son Jayden (11) plays travel soccer." },
    ],
    current_action: {
      action: "sms",
      scheduled_at: "2025-04-16T19:30:00Z",
      applied_rules: ["LearnMoreRule", "AdvancedTrackRule"],
    },
  },
  {
    id: 4,
    lead_id: 4,
    lead_info: {
      name: "Lisa Patel",
      phone: "(512) 555-7782",
      preferred_language: "English",
      best_contact_window: "Weekday afternoons",
      preferred_channel: "sms",
      channel_response_rates: { sms: "1/1", call: "1/1" },
    },
    status: "converted",
    family_info: [
      { name: "Anika", age: 6, grade: "Entering 1st", soccer_experience: null, notes: "Beginner group." },
      { name: "Rohan", age: 8, grade: "Entering 3rd", soccer_experience: "Rec league (1 season)", notes: "Intermediate group." },
      { name: "Dev", age: 10, grade: "Entering 5th", soccer_experience: "Rec league (3 seasons)", position: "Defender", notes: "Intermediate-advanced group." },
    ],
    last_derived_data: {
      derived_at: "2025-03-25T17:00:00Z",
      intent_score: 1.0,
      key_signals: [
        "Converted — all 3 children enrolled",
        "Payment confirmed Mar 25",
        "Family package discount applied",
      ],
      objections: [],
      sentiment: "positive",
      suggested_message: "N/A — converted. Send welcome packet and session schedule.",
      tone_guidelines: "Celebratory, informational. Confirm logistics.",
    },
    past_interactions: [
      { date: "2025-03-19", channel: "sms", direction: "inbound", summary: "Inquired about multi-child pricing for 3 kids (ages 6, 8, 10)." },
      { date: "2025-03-25", channel: "call", direction: "outbound", summary: "Discussed family package. Signed up all three on the call. Payment confirmed." },
    ],
    current_action: {
      action: "email",
      scheduled_at: "2025-04-01T09:00:00Z",
      applied_rules: ["PostConversionOnboardingRule"],
    },
  },
  {
    id: 5,
    lead_id: 5,
    lead_info: {
      name: "David Chen",
      phone: "(512) 555-6019",
      preferred_language: "English / Mandarin",
      best_contact_window: "Weekends",
      preferred_channel: "email",
      channel_response_rates: { sms: "1/1", call: "0/1", email: "0/0" },
    },
    status: "lost",
    family_info: [
      { name: "Ethan", age: 8, grade: "Entering 3rd", soccer_experience: "Summer camp 2024", notes: 'Feedback: "drills were repetitive, got bored."' },
      { name: "Emma", age: 8, grade: "Entering 3rd", soccer_experience: "Summer camp 2024", notes: 'Same feedback as twin. Considering swim camp instead.' },
    ],
    last_derived_data: {
      derived_at: "2025-03-27T16:00:00Z",
      intent_score: 0.15,
      key_signals: [
        "Low intent — considering swim camp as alternative",
        "Poor past experience cited (repetitive drills)",
        "Did not respond to last voicemail",
      ],
      objections: [
        "Kids didn't enjoy camp last year",
        "Repetitive drills",
        "Exploring competing activities (swim camp)",
      ],
      sentiment: "negative",
      suggested_message:
        'Hi David! We heard you — and we made big changes for 2025. New coaching staff, gamified drills, and a buddy system so Ethan & Emma stay together. Returning families get 20% off. Would love to win them back. Here\'s what\'s new: [link]',
      tone_guidelines: "Apologetic, highlight improvements, no pressure. Acknowledge past issues directly.",
    },
    past_interactions: [
      { date: "2025-03-20", channel: "sms", direction: "outbound", summary: 'Sent returning families discount. Replied: "Kids didn\'t love it last year. Thinking swim camp."' },
      { date: "2025-03-27", channel: "call", direction: "outbound", summary: "No answer. Left voicemail about new coaches and updated drills." },
    ],
    current_action: {
      action: "email",
      scheduled_at: "2025-04-17T10:00:00Z",
      applied_rules: ["WinBackRule", "ReturningFamilyDiscountRule", "PastNegativeFeedbackRule"],
    },
  },
];

// Helper functions
export function getLeadById(id: number): Lead | undefined {
  return LEADS.find((l) => l.id === id);
}

export function getEventsByLeadId(leadId: number): Event[] {
  return EVENTS.filter((e) => e.lead_id === leadId);
}

export function getInteractionsByLeadId(leadId: number): Interaction[] {
  return INTERACTIONS.filter((i) => i.lead_id === leadId).sort(
    (a, b) => b.time - a.time
  );
}

export function getContextByLeadId(leadId: number): LeadContext | undefined {
  return CONTEXT.find((c) => c.lead_id === leadId);
}

export function getEventById(id: number): Event | undefined {
  return EVENTS.find((e) => e.id === id);
}

export function formatTimestamp(ts: number): string {
  return new Date(ts * 1000).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
