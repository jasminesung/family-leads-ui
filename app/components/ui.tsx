import { STATUS_COLORS } from "./constants";

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${STATUS_COLORS[status] ?? ""}`}
    >
      {status}
    </span>
  );
}

export function KeyValueRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-2">
      <dt className="shrink-0 font-mono text-xs text-zinc-400">{label}:</dt>
      <dd className="text-xs text-zinc-700 dark:text-zinc-300">{value}</dd>
    </div>
  );
}

export function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
      {children}
    </h2>
  );
}

export function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[10px] font-medium uppercase text-zinc-400">
      {children}
    </span>
  );
}

export function GroupHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-2 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
      {children}
    </h3>
  );
}
