    const router = require('express').Router();
    const { GoogleGenerativeAI } = require('@google/generative-ai');
    const knowledgeBase = require('../services/knowledgeBase');

    // Initialize the Gemini client with the API key from the .env file
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // This is the "briefing document" or system prompt for the AI
    const systemPrompt = `You are the mim0 Assistant, a professional, helpful AI specializing in human-AI symbiosis. Your knowledge is strictly limited to the information provided below in the 'MIM0 KNOWLEDGE BASE'. You must not use any outside information or your general knowledge. Based *only* on this knowledge, answer the user's question concisely and professionally. If the user's question cannot be answered using the knowledge base, politely state that you do not have information on that topic and offer to connect them with a human expert.

    --- MIM0 KNOWLEDGE BASE ---
    ${knowledgeBase}
    --- END KNOWLEDGE BASE ---
    `;

    router.post('/', async (req, res) => {
      try {
        const userMessage = req.body.message;

        if (!userMessage) {
          return res.status(400).json({ error: 'No message provided.' });
        }

        console.log(`[Chat API] Received message: "${userMessage}"`);

        // Construct the full prompt for the AI
        const fullPrompt = `${systemPrompt}\n\nUser Question: ${userMessage}`;

        // Send the prompt to the Gemini API
        const result = await model.generateContent(fullPrompt);
        const response = await result.response;
        const botReply = response.text();

        console.log(`[Chat API] Sending AI reply: "${botReply}"`);

        res.status(200).json({ reply: botReply });

      } catch (error) {
        console.error('[Chat API] Error processing chat message with Gemini:', error);
        res.status(500).json({ reply: "I'm experiencing a technical issue at the moment. Please try again shortly." });
      }
    });

    module.exports = router;
    