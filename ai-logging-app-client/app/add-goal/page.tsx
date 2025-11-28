"use client";
import { useState } from "react";

export default function AddGoalPage() {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add logic to save the goal
    alert(`Goal added: ${name}`);
    setName("");
  };

  return (
    <div className="max-w-xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">Add New Goal</h1>
      <form onSubmit={handleSubmit} className="bg-white dark:bg-zinc-900 rounded-xl shadow p-6 flex flex-col gap-4">
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Goal name"
          className="px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 text-lg"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-colors shadow-md cursor-pointer"
        >
          Add Goal
        </button>
      </form>
    </div>
  );
}