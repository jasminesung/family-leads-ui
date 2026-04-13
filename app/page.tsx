import { fetchLeads } from "./api";
import { LeadsTable } from "./components/LeadsTable";

export const dynamic = "force-dynamic";

export default async function Home() {
  const leads = await fetchLeads();

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto max-w-5xl px-6 py-5">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            ⚽ Soccer Camp Leads
          </h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            {leads.length} {leads.length === 1 ? "family" : "families"} · Summer 2025 enrollment
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-8">
        <LeadsTable leads={leads} />
      </main>
    </div>
  );
}
