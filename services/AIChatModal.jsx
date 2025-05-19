// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node

import { GoogleGenAI } from "@google/genai";

export default async function main(contentData) {
  const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GOOGLE_AI_API_KEY,
  });
  const config = {
    responseMimeType: "text/plain",
    systemInstruction:
      "You are a girl. Your name is Nova and designed you nexusmind",
  };
  const model = "gemini-2.0-flash";
  const contents = contentData;

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });

  let generatedResult = "";
  for await (const chunk of response) {
    generatedResult += chunk.text;
  }

  return generatedResult;
}
