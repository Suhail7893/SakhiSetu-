// Maps our internal short codes to BCP-47 locale tags for Browser Speech APIs
export const getBcp47Tag = (langCode) => {
  const map = {
    'en': 'en-IN', // English (India)
    'hi': 'hi-IN', // Hindi
    'ta': 'ta-IN', // Tamil
    'te': 'te-IN', // Telugu
    'kn': 'kn-IN', // Kannada
    'ml': 'ml-IN', // Malayalam
    'mr': 'mr-IN', // Marathi
    'bn': 'bn-IN', // Bengali
    'gu': 'gu-IN', // Gujarati
    'pa': 'pa-IN', // Punjabi
    'ur': 'ur-IN', // Urdu
    // Some browsers might not perfectly support all regional languages, 
    // but we request the standard IN locale tags for best effort.
    'or': 'or-IN', // Odia
    'as': 'as-IN', // Assamese
  };
  return map[langCode] || 'en-IN';
};
