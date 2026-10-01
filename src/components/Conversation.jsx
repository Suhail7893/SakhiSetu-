import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { detectIntentAndReply } from '../services/gemini';
import { useSpeechRecognition, useSpeechSynthesis } from '../hooks/useSpeech';
import ExplainModal from './ExplainModal';

const Conversation = ({ onIdentifyService }) => {
  const { t, language } = useLanguage();
  const [messages, setMessages] = useState([
    { sender: 'ai', text: t('startJourney') }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [detectedIntent, setDetectedIntent] = useState(null);

  // Explain Modal State
  const [explainData, setExplainData] = useState({ isOpen: false, text: '' });
  const [explanationText, setExplanationText] = useState('');

  const { isListening, startListening, stopListening, isSupported: isRecSupported } = useSpeechRecognition(language, (transcript) => {
    setInputText(transcript);
  });

  const { speak, isSupported: isSpeakSupported } = useSpeechSynthesis();

  const handleSend = async () => {
    if (!inputText.trim()) return;
    
    const userMsg = inputText;
    const newMsgs = [...messages, { sender: 'user', text: userMsg }];
    setMessages(newMsgs);
    setInputText('');
    setIsTyping(true);

    try {
      const result = await detectIntentAndReply(userMsg, language);
      setMessages([...newMsgs, { sender: 'ai', text: result.reply }]);
      if (result.intent) {
        setDetectedIntent(result.intent);
      }
    } catch (err) {
      console.error(err);
      setMessages([...newMsgs, { sender: 'ai', text: "Sorry, I encountered an error connecting to the service." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const toggleListening = () => {
    if (isListening) stopListening();
    else startListening();
  };

  const handleExplain = (text) => {
    setExplainData({ isOpen: true, text });
    // Mock simple explanation generation to save tokens
    setTimeout(() => {
      setExplanationText(`To keep it simple: This means we want to help you with what you just asked about, without making you read long forms. I'm here to guide you step-by-step.`);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full w-full bg-gray-50">
      
      <ExplainModal 
        isOpen={explainData.isOpen} 
        onClose={() => { setExplainData({ isOpen: false, text: '' }); setExplanationText(''); }}
        originalText={explainData.text}
        getExplanation={() => explanationText}
      />

      <div className="flex-1 overflow-y-auto p-4 space-y-6 pb-32">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl p-4 shadow-sm ${
              msg.sender === 'user' ? 'bg-primary-600 text-white rounded-br-none' : 'bg-white border border-gray-100 text-gray-800 rounded-bl-none'
            }`}>
              <p className="text-lg">{msg.text}</p>
              {msg.sender === 'ai' && (
                <div className="flex items-center mt-3 pt-3 border-t border-gray-100/50 gap-2">
                  {isSpeakSupported && (
                    <button 
                      onClick={() => speak(msg.text, language)}
                      className="flex items-center justify-center p-2 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-600 transition-colors"
                      title="Read aloud"
                    >
                      🔊
                    </button>
                  )}
                  <button 
                    onClick={() => handleExplain(msg.text)}
                    className="text-xs font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded-full"
                  >
                    Explain this
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
             <div className="bg-white border border-gray-100 text-gray-800 rounded-2xl rounded-bl-none p-4 shadow-sm">
                <span className="animate-pulse">...</span>
             </div>
          </div>
        )}
        
        {detectedIntent && !isTyping && (
          <div className="flex justify-center mt-4">
            <button 
              onClick={() => onIdentifyService(detectedIntent)}
              className="bg-green-500 text-white px-8 py-4 rounded-full font-bold shadow-lg flex items-center gap-2 hover:bg-green-600 transition-colors"
            >
              Yes, Check Eligibility ➔
            </button>
          </div>
        )}
      </div>

      {/* Input Area Fixed to Bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 pb-8 max-w-md mx-auto">
        <div className="flex items-center gap-2">
          {isRecSupported && (
            <button 
              onClick={toggleListening}
              aria-label={isListening ? 'Stop listening' : 'Start listening'}
              className={`p-4 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 ${isListening ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              title={isListening ? 'Listening...' : 'Tap to speak'}
            >
              <span aria-hidden="true">🎤</span>
            </button>
          )}
          <input 
            type="text" 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your answer..."
            aria-label="Type your message"
            className="flex-1 px-4 py-4 rounded-full border border-gray-200 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
          />
          <button 
            onClick={handleSend}
            disabled={isTyping}
            aria-label="Send message"
            className={`p-4 rounded-full text-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${isTyping ? 'bg-primary-300' : 'bg-primary-600 hover:bg-primary-700'}`}
          >
            <span aria-hidden="true">➔</span>
          </button>
        </div>
      </div>
      
    </div>
  );
};

export default Conversation;
