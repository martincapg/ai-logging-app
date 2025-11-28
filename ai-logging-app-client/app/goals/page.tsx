"use client";
import { useEffect, useState } from "react";
import { useAddGoalModal } from "../AddGoalModalProvider";

export type Goal = {
  name: string;
  description: string;
  progress: number;
};

export default function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [newGoal, setNewGoal] = useState({ name: "", description: "" });
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => {
        setGoals(data);
        setLoading(false);
      });
  }, []);

  const handleAddGoal = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdding(true);
    const res = await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newGoal.name, description: newGoal.description }),
    });
    const added = await res.json();
    setGoals((prev) => [...prev, added]);
    setNewGoal({ name: "", description: "" });
    setAdding(false);
  };

  const addGoalModal = useAddGoalModal();
  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6 text-black dark:text-zinc-50">Your Goals</h1>
      {loading ? (
        <div className="text-zinc-500 dark:text-zinc-400">Loading...</div>
      ) : (
        <div className="flex flex-col gap-6">
          {goals.map((goal) => (
            <div key={goal.name} className="bg-white dark:bg-zinc-900 rounded-xl shadow p-6 flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-black dark:text-zinc-50">{goal.name}</span>
              </div>
              <div className="w-full h-3 bg-zinc-200 dark:bg-zinc-800 rounded-full">
                <div
                  className="h-3 rounded-full bg-blue-500"
                  style={{ width: `${goal.progress ?? 0}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      )}
      <button
        className="mt-8 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-colors shadow-md cursor-pointer"
        onClick={addGoalModal.open}
      >
        Add New Goal
      </button>
    </div>
  );
}
