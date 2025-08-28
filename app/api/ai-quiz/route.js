import { generateText } from "ai";
import { google } from "@ai-sdk/google";

export async function POST(request) {
  const { type, jobPosition, duration, jobDescription } = await request.json();
  try {
    const { text: questions } = await generateText({
      model: google("gemini-2.0-flash-001"),

      prompt: `You are an expert technical interviewer.

Based on the following inputs, generate a well-structured list of high-quality quiz questions:

Job Title: ${jobPosition}

Job Description: ${jobDescription}

Quiz Duration: ${duration}

Quiz Type: ${type}

Your task:
1. Analyze the job description to identify key responsibilities, required skills, and expected experience.  
2. Generate a list of quiz questions proportional to the Quiz Duration. Do NOT limit to only 1 question per minute — provide an optimal number of questions that balances variety and depth (e.g., 5 minutes ≈ 8–12 questions, 15 minutes ≈ 20+ questions).  
3. Ensure questions cover multiple types (Technical, Behavioral, Aptitude, Problem-Solving, Leadership, etc. as relevant to the role).  
4. Do NOT include open-ended user input questions like "Describe a situation when…" or "Explain your approach to…". Every question must be multiple-choice .
5. Do NOT include long inline code snippets in one line. If code is needed, format it properly across multiple lines inside the "question" field using fenced code blocks .  

quizQuestions = [
  {
    "id": 1,
    "question": "What is the time complexity of binary search?",
    "type": "Technical",
    "options": [
      { "id": "a", "text": "O(n)", "isCorrect": false },
      { "id": "b", "text": "O(log n)", "isCorrect": true },
      { "id": "c", "text": "O(n log n)", "isCorrect": false },
      { "id": "d", "text": "O(1)", "isCorrect": false }
    ]
  },
]

Guidelines:
- Always include an "id", "question", "type", and "options".  
- For all Questions provide multiple-choice "options" with exactly one "isCorrect": true.  
- Adjust depth and difficulty based on Quiz Duration.  
- Ensure the tone and structure match a real-life ${type} quiz.  

The goal is to create a structured, relevant, and time-optimized interview quiz for a ${jobPosition} role.


`,
    });
    console.log(questions);

    console.log(typeof questions);

    const parsedQuestions = JSON.parse(
      questions.replace(/```json|```/g, "").trim()
    );
    console.log("Parsed Qs", parsedQuestions);

    const quiz = {
      quizTitle: jobPosition,
      quizDuration: duration,
      quizQuestions: parsedQuestions,
      createdAt: new Date().toISOString(),
    };

    return Response.json({ success: true, data: quiz }, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ success: false, error }, { status: 200 });
  }
}
