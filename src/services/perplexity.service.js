import axios from "axios";
import dotenv from "dotenv";
import jsonExtractor from '../util/jsonExtractor.js';
import fs from "fs";
dotenv.config();

const API_URL = "https://api.perplexity.ai/chat/completions";
const API_KEY = process.env.PERPLEXITY_API_KEY;

export const askPerplexity = async (input, prompt, filePath) => {
  try {

    const fileBuffer = filePath ? fs.readFileSync(filePath) : null;
    const base64File = fileBuffer ? fileBuffer.toString("base64") : null; 

    const data = {
      model: 'sonar',
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: JSON.stringify(input) },
            { type: 'text', text: prompt },
            ...(filePath ? [{
              type: 'file_url',
              file_url: { url: base64File }
            }] : [])
          ]
        }
      ]
    };

    const response = await axios.post(API_URL, data, {
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
    });
    
    return await jsonExtractor(response.data.choices[0].message?.content);
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    return null;
  }
};