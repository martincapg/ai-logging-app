export type Goal = {
  name: string;
  progress: number;
};

export const initialGoals: Goal[] = [
  { name: "Chores", progress: 0 },
  { name: "Exercise", progress: 0 },
  { name: "Mental Wellbeing", progress: 0 },
  { name: "Screwing with Ludwig", progress: 0 }
];
