import axios from "axios";

export const GenerateImage = async (contentData) => {
  const body = {
    contents: contentData,
    generationConfig: {
      responseModalities: ["IMAGE", "TEXT"],
      responseMimeType: "text/plain",
    },
  };

  return await axios.post(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-preview-image-generation:generateContent?key=${
      import.meta.env.VITE_GOOGLE_AI_API_KEY
    }`,
    body,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
