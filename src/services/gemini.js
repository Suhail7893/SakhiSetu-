import { servicesData } from '../data/services';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

// Prepare a minimal list of available services for intent matching
const availableServicesContext = Object.values(servicesData).map(s => 
  `- ID: ${s.id}, Name: ${s.name.en}, Description: ${s.description.en}`
).join('\n');

export const detectIntentAndReply = async (userMessage, languageCode) => {
  if (!API_KEY) {
    console.warn("No VITE_GEMINI_API_KEY found. Falling back to mock response.");
    return fallbackMock(userMessage, languageCode);
  }

  const systemInstruction = `You are SakhiSetu, a friendly government service navigator for Indian users. 
Your goal is to detect if the user's need matches one of our available services and provide a helpful, short conversational reply in their language.
Language Code: ${languageCode}
Available Services:
${availableServicesContext}

Do not provide specific government facts, eligibility rules, or application steps. Only acknowledge their need and suggest the matched service if applicable.

Return ONLY a valid JSON object in this exact format:
{
  "intent": "service_id_here_or_null",
  "reply": "Your short, friendly response in the specified language"
}`;

  try {
    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: userMessage }] }],
        systemInstruction: { parts: [{ text: systemInstruction }] },
        generationConfig: {
          temperature: 0.2,
          responseMimeType: "application/json",
        }
      })
    });

    const data = await response.json();
    if (data.error) throw new Error(data.error.message);

    const textResult = data.candidates[0].content.parts[0].text;
    return JSON.parse(textResult);

  } catch (error) {
    console.error("Gemini API Error:", error);
    return fallbackMock(userMessage, languageCode);
  }
};

const fallbackMock = (msg, lang) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        intent: "pm-ujjwala",
        reply: "I understand you might need help with LPG. Let's check your eligibility for PM Ujjwala Yojana."
      });
    }, 1000);
  });
};
