export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { messages } = req.body; 

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages,
        }),
      });

      const data = await response.json();
      console.log('API Response:', data);  

      if (data && data.choices && data.choices.length > 0) {
      
        res.status(200).json({ reply: data.choices[0].message.content });
      } else {
        res.status(500).json({ error: 'Invalid response from GPT' });
      }
    } catch (error) {
      console.error('Error:', error); 
      res.status(500).json({ error: 'Something went wrong on the server side.' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
