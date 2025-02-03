const Cerebras = require('@cerebras/cerebras_cloud_sdk');
require('dotenv').config();

// Initialize the Cerebras client
const client = new Cerebras({
  apiKey: process.env.API_KEY, // Ensure API Key is stored in .env
});

/**
 * Calls Cerebras AI to generate a chatbot response.
 * @param {string} prompt - The user’s input prompt.
 * @returns {Promise<string>} - AI-generated response (5-6 lines max).
 */
const generateResponse = async (prompt) => {
  try {
    const response = await client.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: `${prompt}\n\n(Note: Please limit the response to 3 lines only)`, // Ensures AI keeps it short
        },
      ],
      model: 'llama3.1-8b',
    });

    // Extract response content
    const aiResponse = response.choices?.[0]?.message?.content;

    if (!aiResponse) {
      throw new Error('Failed to generate response');
    }

    return aiResponse;
  } catch (error) {
    console.error('Error generating response:', error.message);
    return 'Error generating response. Please try again later.';
  }
};

module.exports = generateResponse;