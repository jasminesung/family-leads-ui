import type { Event } from "../data";
import { formatDateTime } from "../data";
import { CHANNEL_ICONS } from "./constants";
import { SectionHeader } from "./ui";

export function NextEventCard({
  event,
  onTrigger,
}: {
  event: Event | null;
  onTrigger: () => void;
}) {
  if (!event) {
    return (
      <section className="rounded-lg border border-dashed border-zinc-300 bg-white p-6 text-center dark:border-zinc-700 dark:bg-zinc-900">
        <p className="text-sm text-zinc-400">
          No upcoming actions scheduled for this lead.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <SectionHeader>Next Scheduled Action</SectionHeader>
      <div className="mt-3 flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{CHANNEL_ICONS[event.action]}</span>
            <span className="text-lg font-semibold capitalize text-zinc-900 dark:text-zinc-50">
              {event.action}
            </span>
            <span className="text-sm text-zinc-400">
              · {formatDateTime(event.scheduled_time)}
            </span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
            {event.goal}
          </p>
          {event.applied_rules.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {event.applied_rules.map((rule) => (
                <span
                  key={rule}
                  className="rounded bg-indigo-50 px-2 py-0.5 font-mono text-xs text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"
                >
                  {rule}
                </span>
              ))}
            </div>
          )}
        </div>
        <button
          onClick={onTrigger}
          className="shrink-0 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700 active:bg-blue-800"
        >
          Trigger {event.action.toUpperCase()}
        </button>
      </div>
    </section>
  );
}
