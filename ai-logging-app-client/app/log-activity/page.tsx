"use client";
import React, { useState, useEffect } from "react";
import { Goal } from "../goalsData";

export default function LogActivityPage() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [aiResult, setAiResult] = useState<{ category: string; confidence: number } | null>(null);

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => setGoals(data));
  }, []);

  const handleSend = async () => {
    setLoading(true);
    const res = await fetch("/api/activity", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        categories: goals.map((g) => g.name),
        input,
      }),
    });
    const data = await res.json();
    let parsed = null;
    try {
      parsed = JSON.parse(data.message.content);
    } catch {
      parsed = null;
    }
    setAiResult(parsed);
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6 text-black dark:text-zinc-50">Log Activity</h1>
      <div className="bg-white dark:bg-zinc-900 rounded-xl shadow p-6 flex flex-col gap-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Describe what you did…"
            className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 rounded-lg text-lg transition-colors shadow-md cursor-pointer"
            onClick={handleSend}
            disabled={!input || loading || goals.length === 0}
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </div>
        {aiResult && (
          <div className="mt-4 w-full max-w-md bg-blue-50 dark:bg-blue-900 rounded-lg p-4">
            <div className="text-blue-700 dark:text-blue-300 font-semibold">
              Category: {aiResult.category}
            </div>
            <div className="text-blue-700 dark:text-blue-300">
              Confidence: {(aiResult.confidence * 100).toFixed(1)}%
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
