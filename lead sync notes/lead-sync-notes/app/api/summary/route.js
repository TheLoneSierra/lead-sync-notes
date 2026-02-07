import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req) {
  try {
    const { notes } = await req.json();

    if (!notes || notes.trim() === "") {
      return NextResponse.json({ summary: "" });
    }

    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-120b",
      messages: [
        {
          role: "system",
          content:
            "Summarize the following notes in a maximum of 20 words.",
        },
        {
          role: "user",
          content: notes,
        },
      ],
      temperature: 0.3,
    });

    const summary =
      completion.choices[0]?.message?.content?.trim() || "";

    return NextResponse.json({ summary });
  } catch (error) {
    console.error("Groq AI error:", error);
    return NextResponse.json(
      { summary: "AI summary failed." },
      { status: 500 }
    );
  }
}
