export default async function handler(req, res) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: 'No OPENAI_API_KEY set in environment.' });
    }

    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { messages, model = 'gpt-4-turbo', temperature = 0.7 } = req.body;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model,
        messages,
        temperature
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data });
    }

    res.status(200).json({
      choices: [{ message: data.choices[0].message }]
    });

  } catch (error) {
    console.error('Error en chat.js (Vercel):', error);
    res.status(500).json({
      error: {
        message: error.message || 'Internal Server Error',
      }
    });
  }
}
