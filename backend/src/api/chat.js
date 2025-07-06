const router = require('express').Router();

// This function contains the simple, rule-based logic for our bot.
const getBotResponse = (userMessage) => {
  const message = userMessage.toLowerCase();

  if (message.includes('hello') || message.includes('hi')) {
    return 'Hi there! I can help you schedule a demo, answer questions about our services, or connect you with a human. What would you like to do?';
  }

  if (message.includes('demo') || message.includes('schedule')) {
    return 'I can certainly help with that. To schedule a demo, I just need a little more information. What is your full name and business email address?';
  }

  if (message.includes('services') || message.includes('pilla')) {
    return 'We specialize in four core areas: AI Venture Incubation, Strategic AI Integration, Efficient Mobile Models, and Philosophical R&D. Which area interests you most?';
  }
  
  if (message.includes('human') || message.includes('agent')) {
    return 'Of course. Please provide your name and email, and I will have a human colleague contact you within the hour.';
  }

  // Default fallback response
  return "I'm sorry, I'm still in training and don't quite understand that. Could you try rephrasing? You can also ask to speak with a 'human'.";
};

// This route handles POST requests to /api/chat
router.post('/', (req, res) => {
  try {
    const userMessage = req.body.message;

    if (!userMessage) {
      return res.status(400).json({ error: 'No message provided.' });
    }

    console.log(`[Chat API] Received message: "${userMessage}"`);

    // Get the bot's response
    const botReply = getBotResponse(userMessage);

    console.log(`[Chat API] Sending reply: "${botReply}"`);

    // Send the reply back to the frontend
    res.status(200).json({ reply: botReply });

  } catch (error) {
    console.error('[Chat API] Error processing chat message:', error);
    res.status(500).json({ error: 'An internal server error occurred.' });
  }
});

module.exports = router;
