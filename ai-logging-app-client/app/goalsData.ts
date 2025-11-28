export type Goal = {
  name: string;
  progress: number;
};

export const initialGoals: Goal[] = [
  { name: "Daily Walk", progress: 70 },
  { name: "Read Books", progress: 40 },
  { name: "Meditation", progress: 90 }
];
