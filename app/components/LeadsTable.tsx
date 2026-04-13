import Link from "next/link";
import type { Lead } from "../data";
import { StatusBadge } from "./ui";

export function LeadsTable({ leads }: { leads: Lead[] }) {
  return (
    <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-800/50">
            <th className="px-4 py-3 font-medium text-zinc-600 dark:text-zinc-300">Name</th>
            <th className="px-4 py-3 font-medium text-zinc-600 dark:text-zinc-300">Goal</th>
            <th className="px-4 py-3 font-medium text-zinc-600 dark:text-zinc-300">Status</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr
              key={lead.id}
              className="border-b border-zinc-100 transition-colors hover:bg-zinc-50 dark:border-zinc-800/50 dark:hover:bg-zinc-800/30"
            >
              <td className="p-0">
                <Link href={`/leads/${lead.id}`} className="block px-4 py-3">
                  <span className="font-medium text-blue-600 dark:text-blue-400">
                    {lead.name}
                  </span>
                  <div className="text-xs text-zinc-400">{lead.phone_no}</div>
                </Link>
              </td>
              <td className="p-0">
                <Link href={`/leads/${lead.id}`} className="block px-4 py-3 text-zinc-700 dark:text-zinc-300">
                  {lead.goal}
                </Link>
              </td>
              <td className="p-0">
                <Link href={`/leads/${lead.id}`} className="block px-4 py-3">
                  <StatusBadge status={lead.status} />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
