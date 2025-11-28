import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { goals, input } = body;
  if (!goals || !input) {
    return NextResponse.json({ error: "Missing goals or input" }, { status: 400 });
  }

  // Forward the request to the AI API
  const aiRequest = {
    model: "task-botv2.0",
    stream: false,
    messages: [
      {
        role: "user",
        content: JSON.stringify({ goals, input }),
      },
    ],
  };

  const aiRes = await fetch("http://localhost:11434/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(aiRequest),
  });
  const aiData = await aiRes.json();

  return NextResponse.json(aiData);
}
