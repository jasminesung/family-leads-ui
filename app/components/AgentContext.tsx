import type { LeadContext } from "../data";
import { CHANNEL_ICONS } from "./constants";
import { SectionHeader, KeyValueRow, GroupHeading, FieldLabel } from "./ui";

export function AgentContextCard({ context }: { context: LeadContext }) {
  return (
    <section className="rounded-lg border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="border-b border-zinc-200 px-6 py-4 dark:border-zinc-800">
        <SectionHeader>Agent Context</SectionHeader>
      </div>
      <div className="grid gap-px bg-zinc-100 dark:bg-zinc-800 sm:grid-cols-2">
        <LeadInfoSection context={context} />
        <CurrentActionSection context={context} />
        <DerivedDataSection context={context} />
        <FamilyInfoSection context={context} />
        <PastInteractionsSection context={context} />
      </div>
    </section>
  );
}

function LeadInfoSection({ context }: { context: LeadContext }) {
  return (
    <div className="bg-white p-5 dark:bg-zinc-900">
      <GroupHeading>lead_info</GroupHeading>
      <dl className="space-y-1 text-sm">
        <KeyValueRow label="preferred_language" value={context.lead_info.preferred_language} />
        <KeyValueRow label="best_contact_window" value={context.lead_info.best_contact_window} />
        <KeyValueRow label="preferred_channel" value={context.lead_info.preferred_channel} />
        <KeyValueRow
          label="channel_response_rates"
          value={Object.entries(context.lead_info.channel_response_rates)
            .map(([k, v]) => `${k}: ${v}`)
            .join(", ")}
        />
      </dl>
    </div>
  );
}

function CurrentActionSection({ context }: { context: LeadContext }) {
  return (
    <div className="bg-white p-5 dark:bg-zinc-900">
      <GroupHeading>current_action</GroupHeading>
      <dl className="space-y-1 text-sm">
        <KeyValueRow label="action" value={context.current_action.action.toUpperCase()} />
        <KeyValueRow label="scheduled_at" value={context.current_action.scheduled_at} />
      </dl>
      <div className="mt-2">
        <FieldLabel>applied_rules</FieldLabel>
        <div className="mt-1 flex flex-wrap gap-1">
          {context.current_action.applied_rules.map((rule) => (
            <span
              key={rule}
              className="rounded bg-indigo-50 px-2 py-0.5 font-mono text-xs text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"
            >
              {rule}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function DerivedDataSection({ context }: { context: LeadContext }) {
  const { last_derived_data: d } = context;
  return (
    <div className="bg-white p-5 sm:col-span-2 dark:bg-zinc-900">
      <GroupHeading>last_derived_data</GroupHeading>
      <div className="grid gap-4 sm:grid-cols-3">
        <dl className="space-y-1 text-sm">
          <KeyValueRow label="derived_at" value={d.derived_at} />
          <KeyValueRow label="intent_score" value={String(d.intent_score)} />
          <KeyValueRow label="sentiment" value={d.sentiment} />
        </dl>
        <div>
          <FieldLabel>key_signals</FieldLabel>
          <ul className="mt-1 space-y-0.5">
            {d.key_signals.map((s, i) => (
              <li key={i} className="text-xs text-zinc-600 dark:text-zinc-300">• {s}</li>
            ))}
          </ul>
        </div>
        <div>
          <FieldLabel>objections</FieldLabel>
          {d.objections.length > 0 ? (
            <ul className="mt-1 space-y-0.5">
              {d.objections.map((o, i) => (
                <li key={i} className="text-xs text-red-600 dark:text-red-400">• {o}</li>
              ))}
            </ul>
          ) : (
            <p className="mt-1 text-xs text-zinc-300 dark:text-zinc-600">None</p>
          )}
        </div>
      </div>
      <div className="mt-3 rounded-md bg-zinc-50 p-3 dark:bg-zinc-800">
        <FieldLabel>suggested_message</FieldLabel>
        <p className="mt-1 text-xs italic leading-relaxed text-zinc-600 dark:text-zinc-300">
          &ldquo;{d.suggested_message}&rdquo;
        </p>
      </div>
      <p className="mt-2 text-[10px] text-zinc-400">
        <span className="font-medium uppercase">tone_guidelines:</span> {d.tone_guidelines}
      </p>
    </div>
  );
}

function FamilyInfoSection({ context }: { context: LeadContext }) {
  return (
    <div className="bg-white p-5 sm:col-span-2 dark:bg-zinc-900">
      <GroupHeading>family_info</GroupHeading>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {context.family_info.map((child) => (
          <div
            key={child.name}
            className="rounded-md border border-zinc-100 p-3 dark:border-zinc-700"
          >
            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
              {child.name}
              <span className="ml-1.5 text-xs font-normal text-zinc-400">
                age {child.age} · {child.grade}
              </span>
            </p>
            <p className="mt-1 text-xs text-zinc-500">
              {child.soccer_experience ?? "No soccer experience"}
              {child.position && ` · ${child.position}`}
            </p>
            <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-300">{child.notes}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function PastInteractionsSection({ context }: { context: LeadContext }) {
  return (
    <div className="bg-white p-5 sm:col-span-2 dark:bg-zinc-900">
      <GroupHeading>past_interactions</GroupHeading>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="text-zinc-400">
              <th className="pb-1.5 pr-4 font-medium">date</th>
              <th className="pb-1.5 pr-4 font-medium">channel</th>
              <th className="pb-1.5 pr-4 font-medium">direction</th>
              <th className="pb-1.5 font-medium">summary</th>
            </tr>
          </thead>
          <tbody>
            {context.past_interactions.map((pi, i) => (
              <tr key={i} className="border-t border-zinc-50 dark:border-zinc-800">
                <td className="whitespace-nowrap py-1.5 pr-4 text-zinc-500">{pi.date}</td>
                <td className="py-1.5 pr-4 text-zinc-600 dark:text-zinc-300">
                  {CHANNEL_ICONS[pi.channel]} {pi.channel.toUpperCase()}
                </td>
                <td className="py-1.5 pr-4">
                  <span className={pi.direction === "inbound" ? "text-green-600" : "text-zinc-400"}>
                    {pi.direction === "inbound" ? "⬅ In" : "➡ Out"}
                  </span>
                </td>
                <td className="py-1.5 text-zinc-700 dark:text-zinc-300">{pi.summary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
