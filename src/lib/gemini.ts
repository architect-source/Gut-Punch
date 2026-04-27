import { GoogleGenAI } from "@google/genai";

const getApiKey = () => {
  if (typeof process !== 'undefined' && process.env) {
    return process.env.GEMINI_API_KEY || '';
  }
  return (import.meta as any).env?.VITE_GEMINI_API_KEY || '';
};

export const genAI = new GoogleGenAI({ apiKey: getApiKey() });
