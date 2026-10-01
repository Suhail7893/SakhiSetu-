import { useState, useCallback, useEffect } from 'react';
import { getBcp47Tag } from '../utils/localeMap';

export const useSpeechRecognition = (languageCode, onResult) => {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const [recognitionObj, setRecognitionObj] = useState(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setIsSupported(false);
      return;
    }
    
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    setRecognitionObj(recognition);
  }, [onResult]);

  const startListening = useCallback(() => {
    if (recognitionObj) {
      try {
        recognitionObj.lang = getBcp47Tag(languageCode);
        recognitionObj.start();
        setIsListening(true);
      } catch (err) {
        console.error("Failed to start speech recognition:", err);
      }
    }
  }, [recognitionObj, languageCode]);

  const stopListening = useCallback(() => {
    if (recognitionObj) {
      recognitionObj.stop();
      setIsListening(false);
    }
  }, [recognitionObj]);

  return { isSupported, isListening, startListening, stopListening };
};

export const useSpeechSynthesis = () => {
  const [isSupported, setIsSupported] = useState('speechSynthesis' in window);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speak = useCallback((text, languageCode) => {
    if (!isSupported) return;

    window.speechSynthesis.cancel(); // Cancel any ongoing speech

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = getBcp47Tag(languageCode);
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  }, [isSupported]);

  const stop = useCallback(() => {
    if (!isSupported) return;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, [isSupported]);

  return { isSupported, isSpeaking, speak, stop };
};
