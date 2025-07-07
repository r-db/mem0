const router = require('express').Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { db } = require('../config/firebase'); // Import the db connection
const { doc, getDoc } = require('firebase/firestore');

// Initialize the Gemini client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

// This function now fetches the bot's configuration from Firestore
const getBotConfig = async () => {
  try {
    // We fetch the document with the specific ID 'main_config'
    const configDocRef = doc(db, 'bot_settings', 'main_config');
    const docSnap = await getDoc(configDocRef);

    if (docSnap.exists()) {
      console.log("[Firestore] Bot configuration loaded successfully.");
      return docSnap.data();
    } else {
      console.error("Bot config document 'main_config' not found in Firestore!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching bot config from Firestore:", error);
    return null;
  }
};

router.post('/', async (req, res) => {
  try {
    const userMessage = req.body.message;
    if (!userMessage) {
      return res.status(400).json({ error: 'No message provided.' });
    }

    console.log(`[Chat API] Received message: "${userMessage}"`);

    // 1. Fetch the bot's configuration from the database
    const botConfig = await getBotConfig();
    if (!botConfig) {
      throw new Error("Could not load bot configuration from Firestore.");
    }

    // 2. Dynamically build the system prompt
    const systemPrompt = `You are ${botConfig.botName}. Your personality is: ${botConfig.botPersonality}. Your knowledge is strictly limited to the information provided below in the 'MIM0 KNOWLEDGE BASE'. You must not use any outside information. Based *only* on this knowledge, answer the user's question. If the question cannot be answered using the knowledge base, politely state that you do not have information on that topic and offer to connect them with a human expert.

    --- MIM0 KNOWLEDGE BASE ---
    ${botConfig.knowledgeBase}
    --- END KNOWLEDGE BASE ---
    `;

    const fullPrompt = `${systemPrompt}\n\nUser Question: ${userMessage}`;

    // 3. Send the prompt to the Gemini API
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const botReply = response.text();

    console.log(`[Chat API] Sending AI reply: "${botReply}"`);
    res.status(200).json({ reply: botReply });

  } catch (error) {
    console.error('[Chat API] Error processing chat message:', error);
    res.status(500).json({ reply: "I'm experiencing a technical issue at the moment. Please try again shortly." });
  }
});

module.exports = router;
