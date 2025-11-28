"use client";
export default function InsightsPage() {
  return (
    <div className="max-w-2xl mx-auto py-12 px-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-black dark:text-zinc-50">Insights</h1>
      <div className="bg-white dark:bg-zinc-900 rounded-xl shadow p-8 flex flex-col items-center gap-4">
        <span className="text-xl text-zinc-700 dark:text-zinc-300">🚧</span>
        <p className="text-lg text-zinc-500 dark:text-zinc-400 text-center">
          Insights are coming soon! For now, please enjoy this placeholder text:<br /><br />
          "If you stare at your goals long enough, they might just stare back. Or maybe they'll just blink."
        </p>
      </div>
    </div>
  );
}
