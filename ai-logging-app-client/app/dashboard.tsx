"use client";
import { useState } from "react";
export default function Dashboard() {

  const [goals, setGoals] = useState([
    { name: "Daily Walk", progress: 70 },
    { name: "Read Books", progress: 40 },
    { name: "Meditation", progress: 90 },
  ]);
  const activities = [
    { text: "Went for a 30-minute walk", goal: "Daily Walk" },
    { text: "Read 10 pages of a leadership book", goal: "Read Books" },
    { text: "Meditated for 15 minutes", goal: "Meditation" },
  ];

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [newGoalName, setNewGoalName] = useState("");
  const [adding, setAdding] = useState(false);

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoalName.trim()) return;
    setAdding(true);
    setGoals([...goals, { name: newGoalName, progress: 0 }]);
    setNewGoalName("");
    setShowModal(false);
    setAdding(false);
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black font-sans flex flex-col items-center py-8 px-4">
      <main className="w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-2xl shadow-lg p-8 flex flex-col gap-10">
        {/* Top Section: Goals Summary */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-bold text-black dark:text-zinc-50">Your Active Goals</h1>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded-full transition-colors cursor-pointer"
              onClick={() => setShowModal(true)}
            >
              Add Goal
            </button>
          </div>
          <div className="flex flex-col gap-4">
            {goals.map((goal) => (
              <div key={goal.name} className="flex flex-col gap-1">
                 <div className="flex justify-between">
                   <span className="font-medium text-zinc-800 dark:text-zinc-200">{goal.name}</span>
                 </div>
                 <div className="w-full h-3 bg-zinc-200 dark:bg-zinc-800 rounded-full">
                   <div
                     className="h-3 rounded-full bg-blue-500"
                     style={{ width: `${goal.progress}%` }}
                   ></div>
                 </div>
              </div>
            ))}
          </div>
        </section>

        {/* Middle Section: Recent Activity Feed */}
        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-black dark:text-zinc-50">Recent Activity</h2>
          <ul className="flex flex-col gap-3">
            {activities.map((activity, idx) => (
              <li key={idx} className="bg-zinc-100 dark:bg-zinc-800 rounded-lg px-4 py-2 flex justify-between items-center">
                <span className="text-zinc-700 dark:text-zinc-200">{activity.text}</span>
                <span className="text-xs font-semibold bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full">{activity.goal}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Bottom Section: Quick Action */}
        {/* Bottom Section: Quick Action removed, use FAB in NavBar */}

        <footer className="text-center text-zinc-400 text-sm mt-8">
          &copy; {new Date().getFullYear()} Magical AI Logging App
        </footer>
      </main>
      {/* Add Goal Modal (outside main) */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-lg p-8 w-full max-w-md flex flex-col gap-6 relative">
            <button
              className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 text-2xl font-bold"
              onClick={() => setShowModal(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-2 text-black dark:text-zinc-50">Add New Goal</h2>
            <form onSubmit={handleAddGoal} className="flex flex-col gap-4">
              <input
                type="text"
                value={newGoalName}
                onChange={e => setNewGoalName(e.target.value)}
                placeholder="Goal name"
                className="px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 text-lg"
                required
                autoFocus
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-colors shadow-md cursor-pointer"
                disabled={adding}
              >
                {adding ? "Adding..." : "Add Goal"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
