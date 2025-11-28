export type Activity = {
  text: string;
  category: string;
};

export const initialActivities: Activity[] = [
  { text: "Did the laundry", category: "Chores" },
  { text: "Went for a 30-minute walk", category: "Exercise" },
  { text: "Meditated for 15 minutes", category: "Mental Wellbeing" },
  { text: "Pranked Ludwig with a fake bug report", category: "Screwing with Ludwig" }
];
