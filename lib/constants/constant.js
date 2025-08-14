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

export const CoreFeatures = [
  {
    id: 1,
    title: " AI-Powered Interview Preparation",
    subtitle: "Practice smarter, not harder.",
    description:
      "No more random question banks or outdated advice. Our AI-driven engine simulates realistic mock interviews, analyzes your responses in real time, and gives feedback on structure, tone, and technical depth. Whether you're preparing for system design rounds, behavioral interviews, or coding challenges, the platform adapts to your strengths and weaknesses. You’ll receive personalized improvement suggestions, confidence ratings, and even voice modulation tips. It’s like having a personal interview coach available 24/7 — trained on real company data and optimized to boost your interview performance.",
    imageUrl: "/Innovation.svg",
  },
  {
    id: 2,
    title: " Live Video Interviews",
    subtitle: "Conduct interviews like you're in the same room.",
    description:
      "Forget juggling between Zoom, Google Meet, and coding tools. Our platform combines them all. Schedule and conduct live video interviews with crystal-clear audio, smart noise suppression, and screen sharing — all from your browser. Both interviewers and candidates can collaborate via voice, video, and shared tasks. The sessions are automatically recorded and transcribed, so you never miss a detail. Built-in evaluation forms and bookmarking help recruiters assess and rate efficiently. It's smooth, secure, and scalable for teams of any size.",
    imageUrl: "/VideoCall.svg",
  },
  {
    id: 3,
    title: " Collaborative Coding Environment",
    subtitle: "Code together, assess better.",
    description:
      "Evaluate candidates in real-time using our powerful in-browser coding environment. It supports multiple programming languages, syntax highlighting, and instant output display — no setup needed. Interviewers can annotate, write comments inline, or take control of the session for live debugging. Candidates can run test cases, explain their logic step-by-step, and simulate real-world problem solving. The environment mirrors what engineers face in daily work, giving interviewers deeper insight into skills like problem decomposition, code hygiene, and collaboration.",
    imageUrl: "/Programming.svg",
  },
  {
    id: 4,
    title: " Intelligent Insights & Analytics",
    subtitle: "Let data guide decisions.",
    description:
      "Every interaction is logged, analyzed, and turned into insight. Get detailed reports on communication clarity, problem-solving speed, coding accuracy, and collaboration effectiveness. Recruiters can compare candidates using AI-generated scores, behavioral patterns, and feedback summaries. For candidates, progress tracking highlights areas of growth and patterns to fix. No more gut-based decisions or vague impressions — every decision is backed by actionable data. Ideal for individuals, startups, and enterprises looking to build better teams faster and more fairly.",
    imageUrl: "/CodeReview.svg",
  },
];
