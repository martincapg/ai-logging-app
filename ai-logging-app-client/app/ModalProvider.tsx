"use client";
import { createContext, useState, useContext, ReactNode } from "react";

const ModalContext = createContext({ open: () => {}, close: () => {}, isOpen: false });

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  return (
    <ModalContext.Provider value={{ open, close, isOpen }}>
      {children}
      {isOpen && <AddGoalModal onClose={close} />}
    </ModalContext.Provider>
  );
}

export function useModal() {
  return useContext(ModalContext);
}

function AddGoalModal({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState("");
  const [adding, setAdding] = useState(false);
  const handleAddGoal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setAdding(true);
    await fetch("/api/goals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    setName("");
    setAdding(false);
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
        <h2 className="text-2xl font-bold mb-2 text-black dark:text-zinc-50">Add New Goal</h2>
        <form onSubmit={handleAddGoal} className="flex flex-col gap-4">
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
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
  );
}
