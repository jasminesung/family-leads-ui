import type { LeadContext } from "../data";
import { formatDateTime } from "../data";
import { SectionHeader, KeyValueRow, GroupHeading, FieldLabel } from "./ui";

export function AgentContextCard({ context }: { context: LeadContext }) {
  const d = context.derived_data;

  return (
    <section className="rounded-lg border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="border-b border-zinc-200 px-6 py-4 dark:border-zinc-800">
        <SectionHeader>Agent Context</SectionHeader>
      </div>
      <div className="space-y-5 p-6">
        {/* Derived Data Summary */}
        <div>
          <GroupHeading>derived_data</GroupHeading>
          <div className="grid grid-cols-3 gap-4">
            {/* Column 1: Metrics */}
            <div>
              <dl className="space-y-1 text-sm">
                <KeyValueRow label="derived_at" value={formatDateTime(d.derived_datetime)} />
                <KeyValueRow label="intent" value={d.intent} />
                <KeyValueRow label="intent_score" value={String(d.intent_score)} />
                <KeyValueRow label="sentiment" value={d.sentiment} />
              </dl>
            </div>

            {/* Column 2: Key Signals */}
            <div>
              <FieldLabel>key_signals</FieldLabel>
              {d.key_signals.length > 0 ? (
                <ul className="mt-1 space-y-0.5">
                  {d.key_signals.map((s, i) => (
                    <li key={i} className="text-xs text-zinc-600 dark:text-zinc-300">
                      • {s}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-1 text-xs text-zinc-300 dark:text-zinc-600">None</p>
              )}
            </div>

            {/* Column 3: Objections */}
            <div>
              <FieldLabel>objections</FieldLabel>
              {d.objections.length > 0 ? (
                <ul className="mt-1 space-y-0.5">
                  {d.objections.map((o, i) => (
                    <li key={i} className="text-xs text-red-600 dark:text-red-400">
                      • {o}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-1 text-xs text-zinc-300 dark:text-zinc-600">None</p>
              )}
            </div>
          </div>
        </div>

        {/* Suggested Message */}
        {d.suggested_message && (
          <div className="rounded-md bg-zinc-50 p-3 dark:bg-zinc-800">
            <FieldLabel>suggested_message</FieldLabel>
            <p className="mt-1 text-xs italic leading-relaxed text-zinc-600 dark:text-zinc-300">
              &ldquo;{d.suggested_message}&rdquo;
            </p>
          </div>
        )}

        {/* Tone Guidelines */}
        {d.tone_guidelines && (
          <p className="text-[10px] text-zinc-400">
            <span className="font-medium uppercase">tone_guidelines:</span>{" "}
            {d.tone_guidelines}
          </p>
        )}
      </div>
    </section>
  );
}
