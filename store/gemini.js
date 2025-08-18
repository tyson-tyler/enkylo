import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyDHQZx4vBXhnYtW_2qSZtWr2faTEFL7mqs");
export const generateDescripition = async (title) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Generate a short, exciting description for the video game titled "${title}". 
Highlight its genre, vibe, or key feature. Keep it under 30 words, fun and engaging.`;

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.log(error);
  }
};
