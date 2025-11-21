import { GoogleGenAI, Type, Schema } from "@google/genai";
import { LessonContent, CodeExecutionResult, ProgrammingLanguage } from "../types";

// Note: Process.env.API_KEY is injected by the environment.
const apiKey = process.env.API_KEY || '';

const ai = new GoogleGenAI({ apiKey });

const modelName = "gemini-2.5-flash";

/**
 * Generates a lesson for a specific topic and language.
 */
export const generateLesson = async (
  language: ProgrammingLanguage,
  topic: string,
  levelId: number
): Promise<LessonContent> => {
  const prompt = `
    Create a programming lesson for ${language} suitable for a cyberpunk-themed coding game.
    Level ${levelId}: Topic is "${topic}".
    
    Return a JSON object with:
    1. "title": A cool, tech-themed title for the lesson.
    2. "theoryMarkdown": A concise explanation of the concept (approx 150-200 words). Use markdown for code blocks.
    3. "taskDescription": A clear instruction on what the user needs to code to pass the level. Keep it engaging.
    4. "starterCode": The initial code provided in the editor.
    5. "hints": An array of 2 short hints strings.
  `;

  const schema: Schema = {
    type: Type.OBJECT,
    properties: {
      title: { type: Type.STRING },
      theoryMarkdown: { type: Type.STRING },
      taskDescription: { type: Type.STRING },
      starterCode: { type: Type.STRING },
      hints: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
      },
    },
    required: ["title", "theoryMarkdown", "taskDescription", "starterCode", "hints"],
  };

  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
        systemInstruction: "You are a futuristic AI Tutor in a cyberpunk world. Be concise, encouraging, and stylish.",
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as LessonContent;
  } catch (error) {
    console.error("Lesson generation failed:", error);
    // Fallback content in case of API failure to prevent app crash
    return {
      title: "System Error: Offline Mode",
      theoryMarkdown: "Could not establish uplink to AI Core. Please check your API Key configuration.",
      taskDescription: "Write 'print(\"Hello World\")' to test local systems.",
      starterCode: "# AI Offline",
      hints: ["Check internet connection", "Check API Key"],
    };
  }
};

/**
 * Simulates code execution and judges the result.
 */
export const judgeCode = async (
  language: ProgrammingLanguage,
  taskDescription: string,
  userCode: string
): Promise<CodeExecutionResult> => {
  const prompt = `
    Act as a code execution engine and judge.
    Language: ${language}
    Task: ${taskDescription}
    User Code:
    \`\`\`
    ${userCode}
    \`\`\`
    
    1. Simulate the output of the code.
    2. Determine if the code correctly solves the task.
    3. Provide brief feedback.
    
    Return JSON.
  `;

  const schema: Schema = {
    type: Type.OBJECT,
    properties: {
      output: { type: Type.STRING, description: "Simulated stdout or return value" },
      isSuccess: { type: Type.BOOLEAN },
      feedback: { type: Type.STRING, description: "Constructive feedback or error message" },
    },
    required: ["output", "isSuccess", "feedback"],
  };

  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");

    return JSON.parse(text) as CodeExecutionResult;
  } catch (error) {
    return {
      output: "Execution Error",
      isSuccess: false,
      feedback: "Failed to connect to judgment matrix.",
    };
  }
};