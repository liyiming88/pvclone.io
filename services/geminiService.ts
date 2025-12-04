import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from '../types';

let client: GoogleGenAI | null = null;

const getClient = (): GoogleGenAI => {
  if (!client) {
    client = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return client;
};

export const sendMessageToGemini = async (
  history: ChatMessage[],
  userMessage: string,
  contextData: string
): Promise<string> => {
  try {
    const ai = getClient();
    
    // Construct a context-aware system instruction
    const systemInstruction = `
      You are "Fidelity Virtual Assistant", a helpful, professional, and secure financial assistant for the Fidelity Planviewer dashboard.
      
      User Context:
      ${contextData}
      
      Your goal is to explain financial concepts, help users understand their 401(k) performance, and define terms like "Vesting", "Expense Ratio", or "Asset Allocation".
      
      Tone: Professional, reassuring, clear, and concise.
      Do not give specific investment advice (e.g., "Buy stock X"). Instead, explain principles (e.g., "Diversification helps manage risk").
      If asked about specific account actions (withdrawals, loans), explain the general rules but advise checking the plan document.
      
      Keep responses relatively short (under 150 words) unless asked for a detailed explanation.
    `;

    const model = 'gemini-2.5-flash';
    
    // Map internal message format to API format
    // We only take the last few messages to keep context window clean if needed, 
    // but Flash has a large window so we can pass most of it.
    const recentHistory = history.slice(-10); 
    
    const chat = ai.chats.create({
      model: model,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
      history: recentHistory.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
      }))
    });

    const result = await chat.sendMessage({
      message: userMessage
    });

    return result.text;

  } catch (error) {
    console.error("Error communicating with Gemini:", error);
    return "I'm currently experiencing high traffic. Please try asking your question again in a moment.";
  }
};