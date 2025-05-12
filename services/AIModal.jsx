import { GoogleGenAI, Type } from "@google/genai";

async function main(prompt, mimeType = "text/plain") {
  const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GOOGLE_AI_API_KEY,
  });

  const config = {
    responseMimeType: mimeType,
  };
  const model = "gemini-2.0-flash";
  const contents = [
    {
      role: "user",
      parts: [
        {
          text: prompt,
        },
      ],
    },
  ];

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });

  let generatedResult = "";
  for await (const chunk of response) {
    generatedResult += chunk.text;
  }
  console.log("Generated Result: ", response.text);
  console.log("Generated Result: ", generatedResult);
  return generatedResult;
}

export default main;
