const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const OLLAMA_API_URL = 'http://localhost:11434/api/generate';
const OLLAMA_MODEL = 'llama3'; // A fast, capable default. Can be changed to 'gpt-oss:20b' if you prefer.

// Endpoint to generate interview questions
app.post('/api/questions', async (req, res) => {
  const { domain, specialization } = req.body;
  
  const prompt = `You are a senior hiring manager. Your task is to generate a JSON object containing a list of interview questions.
  The JSON object must have a single key named "questions".
  The value of "questions" must be an array of exactly 10 unique, insightful, and relevant interview questions for a '${specialization}' role in the '${domain}' field.
  Do not include any introductory text, concluding remarks, or any other content outside of the JSON object.`;

  try {
    const ollamaResponse = await fetch(OLLAMA_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        prompt: prompt,
        format: 'json',
        stream: false,
      }),
    });

    if (!ollamaResponse.ok) {
      const errorText = await ollamaResponse.text();
      throw new Error(`Ollama API responded with status: ${ollamaResponse.status} - ${errorText}`);
    }

    const data = await ollamaResponse.json();
    const parsedResponse = JSON.parse(data.response);
    res.json(parsedResponse);

  } catch (error) {
    console.error('Error calling Ollama for questions:', error);
    res.status(500).json({ error: 'Failed to generate questions from Ollama. Is Ollama running?' });
  }
});

// Endpoint to analyze answers
app.post('/api/analyze', async (req, res) => {
    const { answers } = req.body;

    const prompt = `You are an expert interview coach. Analyze the following interview questions and answers: ${JSON.stringify(answers)}.
    Your response must be a single JSON object with two keys:
    1. "overallFeedback": A string containing a concise overall feedback summary.
    2. "scores": An array of objects. Each object must have three keys: "metric" (a string, e.g., 'Fluency', 'Tone', 'Grammar', 'Content Quality'), "score" (a number from 1 to 10), and "feedback" (a string with brief, constructive feedback for that metric).
    Do not include any other text or explanation outside of this JSON object.`;
    
    try {
        const ollamaResponse = await fetch(OLLAMA_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: OLLAMA_MODEL,
                prompt: prompt,
                format: 'json',
                stream: false,
            }),
        });

        if (!ollamaResponse.ok) {
          const errorText = await ollamaResponse.text();
          throw new Error(`Ollama API responded with status: ${ollamaResponse.status} - ${errorText}`);
        }

        const data = await ollamaResponse.json();
        const parsedResponse = JSON.parse(data.response);
        res.json(parsedResponse);

    } catch (error) {
        console.error('Error calling Ollama for analysis:', error);
        res.status(500).json({ error: 'Failed to analyze answers from Ollama. Is Ollama running?' });
    }
});

app.listen(port, () => {
  console.log(`Proxy server listening at http://localhost:${port}`);
  console.log('------------------------------------------------------------------');
  console.log('TO RUN:');
  console.log('1. Open a terminal in this "server" directory.');
  console.log('2. Run "npm install".');
  console.log('3. Run "node index.js" to start this server.');
  console.log('4. In a separate terminal, run your frontend application.');
  console.log('------------------------------------------------------------------');
});
