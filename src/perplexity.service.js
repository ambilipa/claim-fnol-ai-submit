import axios from "axios";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const API_URL = "https://api.perplexity.ai/chat/completions";
const API_KEY = process.env.PERPLEXITY_API_KEY;

if (!API_KEY) throw new Error("Missing PERPLEXITY_API_KEY in .env");

export const askPerplexity = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Convert buffer to raw Base64
    // const base64File = file.buffer.toString('base64');
    const fileBuffer = fs.readFileSync(file.path);   // read file from disk
    const base64File = fileBuffer.toString("base64"); // convert to base64

    const data = {
      model: 'sonar',
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: 'Extract the data in this document into valid stringified JSON only and the rules you have to follow are (You must return ONLY valid JSON, Do NOT include any explanatory text, Do NOT include markdown, Do NOT include comments, The response must start with { and end with }, If you cannot extract a field, return null.' },
            {
              type: 'file_url',
              file_url: { url: base64File },  // raw Base64 string here
              file_name: file.originalname    // keep original name
            }
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

    res.send(JSON.parse(response.data.choices[0].message?.content));

  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    res.status(500).json({ error: error.response?.data || error.message });
  }
};
