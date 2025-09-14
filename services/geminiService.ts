import { GoogleGenAI, Type } from "@google/genai";
import { Answer } from '../types';

// FIX: Adhere to coding guidelines by initializing GoogleGenAI directly with the API_KEY environment variable.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateInterviewQuestions = async (domain: string, specialization: string): Promise<string[]> => {
  try {
    const prompt = `Act as a senior hiring manager for a top tech company. Generate exactly 10 interview questions for a '${specialization}' role within the '${domain}' field. The questions should be insightful and cover a range of topics relevant to the role.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            questions: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          }
        },
      },
    });

    const jsonString = response.text.trim();
    const parsed = JSON.parse(jsonString);
    if (parsed.questions && Array.isArray(parsed.questions)) {
      return parsed.questions;
    }
    return [];
  } catch (error) {
    console.error("Error generating interview questions:", error);
    // Return mock data on failure to allow UI to function
    return Array.from({ length: 10 }, (_, i) => `This is mock question ${i + 1} for ${specialization}. The API call failed.`);
  }
};

export const analyzeInterviewAnswers = async (answers: Answer[]) => {
  try {
    const prompt = `You are an expert interview coach. Analyze the following interview questions and the user's answers. 
    For the entire session, provide a concise overall feedback summary.
    Then, for each of the four metrics (Fluency, Tone, Grammar, Content Quality), provide a score from 1 to 10 and brief, constructive feedback.
    The user's answers are: ${JSON.stringify(answers)}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            overallFeedback: { type: Type.STRING },
            scores: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  metric: { type: Type.STRING },
                  score: { type: Type.NUMBER },
                  feedback: { type: Type.STRING }
                }
              }
            }
          }
        }
      }
    });
    
    const jsonString = response.text.trim();
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Error analyzing interview answers:", error);
    // Return mock data on failure
    return {
      overallFeedback: "This is mock feedback because the API call failed. Review your answers and try again.",
      scores: [
        { metric: 'Fluency', score: 7, feedback: 'Mock feedback for fluency.' },
        { metric: 'Tone', score: 8, feedback: 'Mock feedback for tone.' },
        { metric: 'Grammar', score: 9, feedback: 'Mock feedback for grammar.' },
        { metric: 'Content Quality', score: 6, feedback: 'Mock feedback for content quality.' },
      ]
    };
  }
};
