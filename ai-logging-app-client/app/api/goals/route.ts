import { initialGoals, Goal } from "../../goalsData";
import { NextResponse } from "next/server";

const goals: Goal[] = [...initialGoals];

export async function GET() {
  return NextResponse.json(goals);
}

export async function POST(req: Request) {
  const body = await req.json();
  if (!body.name) {
    return NextResponse.json({ error: "Missing name" }, { status: 400 });
  }
  const newGoal: Goal = { name: body.name, progress: body.progress ?? 0 };
  goals.push(newGoal);
  return NextResponse.json(newGoal, { status: 201 });
}
