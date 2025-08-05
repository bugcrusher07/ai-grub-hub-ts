import axios from "axios";
import { ResponseObject } from "./common/common";

export async function geminiApi(prompt: string): Promise<ResponseObject> {
  try {
    const apiKey = process.env.API_KEY;
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const payload = {
      contents: [{
        parts: [{
          text: prompt
        }]
      }]
    };

    const response = await axios.post(apiUrl, payload, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    let content = response.data.candidates[0].content.parts[0].text;
    try {
      let firstBracket = content.indexOf("{");
      let lastBracket = content.lastIndexOf("}");
      content = content.substring(firstBracket,lastBracket+1);
      content = JSON.parse(content);
    } catch {
    }

    return {
      success: true,
      content: content
    };
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    return {
      success: false,
      content: '',
      error: error.response?.data || 'Something went wrong'
    };
  }}