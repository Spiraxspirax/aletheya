
export default async function handler(req, res) {
  const { prompt } = req.body;
  const apiKey = process.env.OPENROUTER_API_KEY;
 if (!apiKey) {
    return res.status(401).json({ error: 'API key missing from environment' });
  }

  import streamlit as st
import os

st.write("🔐 OPENROUTER_API_KEY present:", os.getenv("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") is not None)


 
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://aletheya.vercel.app"
    },
    body: JSON.stringify({
      model: "mistralai/mistral-7b-instruct",
      messages: [{
        role: "user",
        content: `Please analyze the following ethical situation using three perspectives:\n\n1. Utilitarianism\n2. Virtue Ethics\n3. Deontology\n\nSituation: ${prompt}`
      }]
    })
  });

  const result = await response.json();

  if (result.choices) {
    res.status(200).json({ reply: result.choices[0].message.content });
  } else {
    res.status(500).json({ error: result.error?.message || "Unknown error" });
  }
}
