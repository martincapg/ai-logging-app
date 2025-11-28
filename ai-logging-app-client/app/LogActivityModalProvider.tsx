"use client";
import { createContext, useState, useContext, ReactNode, useEffect } from "react";

const LogActivityContext = createContext({ open: () => {}, close: () => {}, isOpen: false });

export function LogActivityModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  return (
    <LogActivityContext.Provider value={{ open, close, isOpen }}>
      {children}
      {isOpen && <LogActivityModal onClose={close} />}
    </LogActivityContext.Provider>
  );
}

export function useLogActivityModal() {
  return useContext(LogActivityContext);
}

function LogActivityModal({ onClose }: { onClose: () => void }) {
  const [activity, setActivity] = useState("");
  const [logging, setLogging] = useState(false);
  const handleLogActivity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activity.trim()) return;
    setLogging(true);
    await fetch("/api/activity", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ activity }),
    });
    setActivity("");
    setLogging(false);
    onClose();
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-lg p-8 w-full max-w-md flex flex-col gap-6 relative">
        <button
          className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 text-2xl font-bold"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-2 text-black dark:text-zinc-50">Log New Activity</h2>
        <form onSubmit={handleLogActivity} className="flex flex-col gap-4">
          <textarea
            value={activity}
            onChange={e => setActivity(e.target.value)}
            placeholder="Describe your activity..."
            className="px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 text-lg"
            required
            rows={3}
          />
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-colors shadow-md cursor-pointer"
            disabled={logging}
          >
            {logging ? "Logging..." : "Log Activity"}
          </button>
        </form>
      </div>
    </div>
  );
}
