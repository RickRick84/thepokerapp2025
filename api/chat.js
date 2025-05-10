const functions = require('firebase-functions');
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.chatWithOpenAI = functions.https.onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "https://thepokerapp2025.vercel.app"); // Permite frontend desde Vercel
  res.set("Access-Control-Allow-Headers", "Content-Type");

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { messages, model = 'gpt-4-turbo', temperature = 0.7 } = req.body;

    const response = await openai.chat.completions.create({
      model,
      messages,
      temperature
    });

    const assistantMessage = response.choices[0].message;

    res.status(200).json({
      choices: [{ message: assistantMessage }]
    });

  } catch (error) {
    console.error('Error in Firebase chatWithOpenAI:', error);

    res.status(500).json({
      error: {
        code: error.code || 'internal_error',
        message: error.message || 'Error en la función Firebase.',
        type: error.type || 'api_error',
      },
    });
  }
});
