export const FEEDBACK_PROMPT = `{{conversation}}

Based on this interview conversation between the assistant and the user:

Give me feedback for the user interview. Provide a rating out of 10 for the following categories:
- Technical Skills
- Communication
- Problem Solving
- Experience

Also, give me a summary in 3 lines about the interview, and one line to let me know whether the candidate is recommended for hire, along with a short message.

Respond strictly in JSON format as shown below:

{
  "feedback": {
    "rating": {
      "technicalSkills": 0,
      "communication": 0,
      "problemSolving": 0,
      "experience": 0
    },
    "summary": "<3-line summary here>",
    "recommendation": "<Yes or No>",
    "recommendationMsg": "<short hiring decision message>"
  }
}
`;
