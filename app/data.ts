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
  action: "call" | "sms" | "email";
  summary: string;
  context_id: number;
};

export type Interaction = {
  id: number;
  lead_id: number;
  time: number;
  channel: "sms" | "call" | "email";
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

export const CONTEXT: { id: number; lead_id: number; data: string }[] = [
  {
    id: 1,
    lead_id: 1,
    data: `AGENT CONTEXT — PRE-INTERACTION BRIEF

Parent: John Doe | Phone: (512) 555-0847 | Preferred Language: English | Best Contact Window: Weekdays 3–6 PM CT | Preferred Channel: SMS (answered 4/5 texts, 1/3 calls)

Family Profile:
• Son: Lucas, age 9, entering 4th grade. Played rec league soccer (fall 2025). Midfielder.
• Daughter: Sofia, age 7, entering 2nd grade. No soccer experience. "Interested but shy."

Key Signals: High intent for Lucas. Moderate intent for Sofia. Price-sensitive — responded positively to discounts. Decision involves husband and Lucas's current coach.
Objections: Cost, Sofia's confidence, spousal buy-in.

Suggested Message: "Hi John! Just a quick heads-up — early-bird pricing ends this Tuesday, Apr 15. With the sibling discount, Lucas and Sofia would be $340 total (saves you $110). Sofia would be in our Lil' Kickers group — small teams, super encouraging coaches. Want me to hold two spots? No commitment yet. 😊"

Tone: Warm, low-pressure, family-oriented.`,
  },
  {
    id: 2,
    lead_id: 2,
    data: `AGENT CONTEXT — PRE-INTERACTION BRIEF

Parent: Sarah Kim | Phone: (512) 555-1923 | Preferred Language: English | Best Contact Window: Weekday mornings | Preferred Channel: Call

Family Profile:
• Daughter: Mia, age 6, entering 1st grade. No sports experience. Sarah wants her to "try something active."

Key Signals: Interested but cautious. Wants a trial before committing. Budget is not a concern.
Objections: Child's readiness, wants to see the environment first.

Suggested Approach: Offer a free Saturday trial session. Emphasize small group sizes and nurturing coaches.

Tone: Reassuring, patient, educational.`,
  },
  {
    id: 3,
    lead_id: 3,
    data: `AGENT CONTEXT — PRE-INTERACTION BRIEF

Parent: Marcus Johnson | Phone: (512) 555-3341 | Preferred Language: English | Best Contact Window: Evenings after 7 PM CT | Preferred Channel: SMS

Family Profile:
• Son: Jayden, age 11, entering 6th grade. Plays travel soccer (striker). Looking for summer skill development.

Key Signals: High intent. Wants competitive/advanced program specifically. Asked about coach credentials.
Objections: None yet — early stage.

Suggested Approach: Share advanced track details and Coach Rivera's bio. Mention small 8:1 player-coach ratio.

Tone: Direct, knowledgeable, sports-focused.`,
  },
  {
    id: 4,
    lead_id: 4,
    data: `AGENT CONTEXT — POST-CONVERSION

Parent: Lisa Patel | Phone: (512) 555-7782 | Status: CONVERTED

All 3 children enrolled. Payment confirmed Mar 25. Family package applied.
Next: Send welcome packet and session schedule by Apr 1.`,
  },
  {
    id: 5,
    lead_id: 5,
    data: `AGENT CONTEXT — WIN-BACK BRIEF

Parent: David Chen | Phone: (512) 555-6019 | Preferred Language: English / Mandarin | Best Contact Window: Weekends | Preferred Channel: Email

Family Profile:
• Twins: Ethan & Emma, age 8. Attended camp last summer. Feedback: "drills were repetitive, kids got bored."

Key Signals: Low intent. Considering swim camp. Did not respond to last voicemail.
Objections: Poor past experience, kids' disinterest.

Suggested Approach: Email with new program highlights — new coaches, gamified drills, buddy system. Offer 20% returning-family discount.

Tone: Apologetic, highlight improvements, no pressure.`,
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

export function getContextByLeadId(leadId: number) {
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
