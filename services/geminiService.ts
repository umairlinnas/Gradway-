
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are an expert Education Consultant for Gradway (Pvt) Ltd.
Gradway is a Sri Lanka-based study abroad partner located in Colombo 5.
Key Services: Profile Review, University Mapping, Visa Application, etc.
Tone: Professional, helpful, friendly, and structured.
Your goal is to answer questions from prospective students about studying abroad in UK, Germany, Canada, Australia, etc.
Always encourage them to visit the office in Colombo or contact Gradway at +94 77 500 9929.
`;

export const getGeminiResponse = async (prompt: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having a bit of trouble connecting right now. Please reach out to our team directly at +94 77 500 9929!";
  }
};
