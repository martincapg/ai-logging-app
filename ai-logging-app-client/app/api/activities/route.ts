
import { NextResponse } from "next/server";
import { initialActivities, Activity } from "../../activitiesData";

let activities: Activity[] = [...initialActivities];

export async function GET() {
  return NextResponse.json(activities);
}

export async function POST(req: Request) {
  const { text, category } = await req.json();
  if (text && category) {
    activities.unshift({ text, category });
    if (activities.length > 10) activities = activities.slice(0, 10);
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ success: false, error: "Missing text or category" }, { status: 400 });
}
