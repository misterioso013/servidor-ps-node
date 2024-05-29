import express, { json } from 'express';
import cors from 'cors';
import { existsSync, readFileSync, writeFileSync, unlinkSync } from 'fs';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import { ip } from '@misterioso013/ipcli';
const app = express();
app.use(cors());
app.use(json());

const API_KEY = process.env.GOOGLE_AI_API_KEY;
const generativeAI = new GoogleGenerativeAI(API_KEY);
const systemInstruction = `You are a tutor on the open source website "Python School", and you will answer the student's questions about the class topic`
const model = generativeAI.getGenerativeModel({model: "gemini-1.5-pro-latest", systemInstruction: systemInstruction});
const generationConfig = {
  temperature: 1,
  topK: 64,
  topP: 0.95,
  maxOutputTokens: 8192,
};

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

function handleHistory(history, historyData = []) {
  const historyFile = './history.json';
  if (history) {
      if (existsSync(historyFile)) {
          const data = readFileSync(historyFile, 'utf8');
          historyData = JSON.parse(data);
      } else {
          writeFileSync(historyFile, JSON.stringify(historyData));
      }
  } else {
      if (existsSync(historyFile)) {
          unlinkSync(historyFile);
      }
  }
  return historyData;
}

/**
 * Function to chat with the AI
 * @param {string} topic 
 * @param {boolean} history
 * @param {string} input 
 * @returns 
 */
async function chat(topic, history, input) {
  try{
    const historyData = handleHistory(history);
    const chat = model.startChat({
      generationConfig,
      safetySettings,
      history: historyData,
    });
    let prompt = "topic: " + topic + "\n" + input + "\n";
    if (historyData.length > 0) {
      prompt = input;
    }

    let newHistory = [
      ...historyData,
      {
        role: "user",
        parts: [{ text: prompt }],
      }
    ];
    const result = await chat.sendMessage(prompt);
    const response = result.response;
    if (response.text()) {
      newHistory.push({
        role: "model",
        parts: [{ text: response.text() }],
      });
      writeFileSync('./history.json', JSON.stringify(newHistory));
    }
    return response.text();
  } catch (error) {
    console.log(error);
    return "I'm sorry, I'm having trouble understanding you right now. Could you please try again?";
  }
}


app.get('/', (req, res) => {
    res.status(200).json({
      status: 'success',
      message: "Connected to the server successfully"
    })
});

app.post('/prompt', async (req, res) => {
    const {topic, history, input} = req.body;
    const response = await chat(topic, history, input);
    res.status(200).json({
      status: 'success',
      response: response
    });
});

app.get('/history', async (req, res) => {
  const historyData = handleHistory(true);
  res.status(200).json({
    status: 'success',
    history: historyData
  });
});

app.get('/clear', async (req, res) => {
  unlinkSync('./history.json');
  res.status(200).json({
    status: 'success',
    message: "History cleared successfully"
  })
});


app.listen(process.env.PORT || 7777, () => {
    console.log(`Server is running on http://${ip()}:${process.env.PORT || 7777}`);
});