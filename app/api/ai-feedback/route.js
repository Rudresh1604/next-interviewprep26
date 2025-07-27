import { FEEDBACK_PROMPT } from "@/lib/constants/constant";
import { generateText } from "ai";
import { google } from "@ai-sdk/google";

export async function POST(req) {
  const { conversation } = await req.json();
  try {
    console.log(conversation);
    const FINAL_PROMPT = FEEDBACK_PROMPT.replace(
      "{{conversation}}",
      JSON.stringify(conversation)
    );
    const { text: feedback } = await generateText({
      model: google("gemini-2.0-flash-001"),

      prompt: FINAL_PROMPT,
    });
    console.log(feedback);
    console.log("Type is ", typeof feedback);

    const parsedFeedback = JSON.parse(
      feedback.replace(/```json|```/g, "").trim()
    );
    console.log("Parsed is : ", parsedFeedback);
    return Response.json(
      { success: true, data: parsedFeedback },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      { success: false, data: error.message },
      { status: 500 }
    );
  }
}
