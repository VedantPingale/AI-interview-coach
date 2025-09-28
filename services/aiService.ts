import { Answer } from '../types';

const API_BASE_URL = 'http://localhost:3001/api';

export const generateInterviewQuestions = async (domain: string, specialization: string): Promise<string[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/questions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domain, specialization }),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Failed to parse error response from server.' }));
        console.error('Server error:', errorData.error);
        throw new Error('Network response was not ok');
    }

    const data = await response.json();
    if (data.questions && Array.isArray(data.questions)) {
        return data.questions;
    }
    console.warn("Received unexpected data structure for questions:", data);
    return [];

  } catch (error) {
    console.error("Error generating interview questions:", error);
    // Return mock data on failure to allow UI to function
    return Array.from({ length: 10 }, (_, i) => `This is mock question ${i + 1} for ${specialization}. The local AI call failed. Is the server running?`);
  }
};

export const analyzeInterviewAnswers = async (answers: Answer[]) => {
  try {
    const response = await fetch(`${API_BASE_URL}/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers }),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Failed to parse error response from server.' }));
        console.error('Server error:', errorData.error);
        throw new Error('Network response was not ok');
    }
    return await response.json();

  } catch (error) {
    console.error("Error analyzing interview answers:", error);
    // Return mock data on failure
    return {
      overallFeedback: "This is mock feedback because the local AI call failed. Ensure Ollama and the proxy server are running.",
      scores: [
        { metric: 'Fluency', score: 0, feedback: 'Mock feedback for fluency.' },
        { metric: 'Tone', score: 0, feedback: 'Mock feedback for tone.' },
        { metric: 'Grammar', score: 0, feedback: 'Mock feedback for grammar.' },
        { metric: 'Content Quality', score: 0, feedback: 'Mock feedback for content quality.' },
      ]
    };
  }
};
