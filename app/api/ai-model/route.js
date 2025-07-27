import { generateText } from "ai";
import { google } from "@ai-sdk/google";

export async function POST(request) {
  const { type, jobPosition, duration, jobDescription } = await request.json();
  try {
    const { text: questions } = await generateText({
      model: google("gemini-2.0-flash-001"),

      prompt: `You are an expert technical interviewer.

Based on the following inputs, generate a well-structured list of high-quality interview questions:

Job Title:${jobPosition}

Job Description:${jobDescription}

Interview Duration: ${duration}

Interview Type: ${type}

Your task:

Analyze the job description to identify key responsibilities, required skills, and expected experience.

Generate a list of interview questions depends on interview duration

Adjust the number and depth of questions to match the interview duration.

Ensure the questions match the tone and structure of a real-life ${type} interview.

Format your response in JSON format with array list of questions.

format: interviewQuestions=[

{
question:",

type: Technical/Behavioral/Experince/Problem Solving/Leaseship'

  },{
  ...

}]

The goal is to create a structured, relevant, and time-optimized interview plan for a {{jobTitle}} role.
    `,
    });
    console.log(questions);

    console.log(typeof questions);

    const parsedQuestions = JSON.parse(
      questions.replace(/```json|```/g, "").trim()
    );

    const interview = {
      interviewTitle: jobPosition,
      interviewDuration: duration,
      interviewQuestions: parsedQuestions?.interviewQuestions,
      createdAt: new Date().toISOString(),
    };

    return Response.json({ success: true, data: interview }, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ success: false, error }, { status: 200 });
  }
}
