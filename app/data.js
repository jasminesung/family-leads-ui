enum Intent {
    SIGN_UP,
    LEARN_MORE,
    NOT_INTERESTED,
}

export const LEADS = [
    {
        id: 1,
        name: "John Doe",
        goal: "Sign up two kids for soccer summer camp",
        next_event_id: 1,
        last_interaction_id: 1,
    }
]

export const EVENTS = [
    {
        id: 1,
        lead_id: 1,
        time: 1650000000,
        action: "call",
        context_id: 1,
    }
]

export const INTERACTIONS = [
    {
        id: 1,
        lead_id: 1,
        time: 1650000000,
        updated_context_id: 1,
        intent: Intent.LEARN_MORE,
        next_best_action: {
            action: "call",
            rules_applied: ["LearnMoreRule"]
        }
    }
]

// ideally have history of context for each lead, 1:1 for now
// use MCP tools to get interaction history, basic info
// context formatting should be LLM friendly
export const CONTEXT = [
    {
        id: 1,
        lead_id: 1,
        data: "AGENT CONTEXT — PRE-INTERACTION BRIEF

Parent: John Doe Phone: (512) 555-0847 Preferred Language: English Best Contact Window: Weekdays 3–6 PM CT (after school pickup) Preferred Channel: SMS (answered 4/5 texts, 1/3 calls)

Family Profile:

Son: Lucas, age 9, entering 4th grade. Played rec league soccer (fall 2025). Midfielder.
Daughter: Sofia, age 7, entering 2nd grade. No soccer experience. Mom mentioned she's "interested but shy."
Interaction History:

Mar 12 — Inbound SMS: John replied to a camp flyer link. Asked about age groups and pricing.
Mar 14 — Outbound SMS: Agent sent session details and early-bird discount info. John responded: "Looks great. Need to check with my husband."
Mar 28 — Outbound Call (no answer): Voicemail left — reminded her early-bird pricing ends Apr 15.
Apr 3 — Outbound SMS: Agent followed up. John replied: "Still thinking. Is there a sibling discount?"
Apr 3 — Outbound SMS: Agent confirmed 15% sibling discount. John replied: "Oh nice. Let me talk to Lucas's coach first."
Key Signals:

High intent for Lucas (prior soccer experience, John initiated contact).
Moderate intent for Sofia (interest expressed but hesitation around shyness — position a beginner-friendly angle).
Price-sensitive — responded positively to discounts.
Decision involves husband and Lucas's current coach.
Objections Raised: Cost, Sofia's confidence level, needs spousal buy-in.

Next Best Action: SMS (higher response rate than calls)

Suggested Message:

"Hi John! Just a quick heads-up — early-bird pricing for summer soccer camp ends this Tuesday, Apr 15. With the sibling discount, Lucas and Sofia would be $340 total (saves you $110). Sofia would be in our Lil' Kickers group — small teams, super encouraging coaches, perfect for beginners. Want me to hold two spots while you decide? No commitment yet. 😊"

Tone Guidelines: Warm, low-pressure, family-oriented. Mirror her casual texting style. Use first names for the kids. Don't oversell — she's close to converting on her own."
    }
]
