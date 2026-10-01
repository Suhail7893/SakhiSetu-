import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { servicesData } from '../data/services';
import { evaluateEligibility } from '../engine/eligibilityEngine';
import JourneyTracker from './JourneyTracker';
import { useSpeechSynthesis } from '../hooks/useSpeech';

const Eligibility = ({ service, onProceedToDocuments }) => {
  const { language } = useLanguage();
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [completed, setCompleted] = useState(false);
  const [result, setResult] = useState(null);
  
  const { speak, isSupported: isSpeakSupported } = useSpeechSynthesis();

  const questions = service.questions;
  const currentQ = questions[currentQIndex];

  const handleAnswer = (ans) => {
    const newAnswers = { ...answers, [currentQ.id]: ans };
    setAnswers(newAnswers);
    
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
    } else {
      const evalResult = evaluateEligibility(service, newAnswers);
      setResult(evalResult);
      setCompleted(true);
    }
  };

  const getLocalizedText = (textObj) => textObj[language] || textObj['en'];

  if (completed && result) {
    if (result.isEligible) {
      return (
        <div className="flex flex-col items-center justify-center p-8 text-center bg-white rounded-3xl shadow-sm mt-8 border border-green-100">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <span className="text-4xl">✅</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">You may be eligible!</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Based on the information you provided, you meet the basic criteria for {getLocalizedText(service.name)}.
            <br /><br />
            <span className="text-xs text-gray-400">Final eligibility is decided by the relevant government authority.</span>
          </p>
          
          <button 
            onClick={onProceedToDocuments}
            className="w-full bg-primary-600 text-white px-8 py-4 rounded-full font-bold shadow-lg flex justify-between items-center hover:bg-primary-700 transition-colors"
          >
            <span>Check Required Documents</span>
            <span>➔</span>
          </button>
        </div>
      );
    } else {
      return (
        <div className="flex flex-col items-center justify-center p-8 text-center bg-white rounded-3xl shadow-sm mt-8 border border-red-100">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
            <span className="text-4xl">⚠️</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">You might not be eligible.</h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Based on your answers, you do not meet the criteria for {getLocalizedText(service.name)}.
          </p>
          <div className="text-left bg-red-50 p-4 rounded-lg text-sm text-red-800 w-full mb-8">
            <ul className="list-disc pl-5 space-y-2">
              {result.disqualifications.map((dq, idx) => (
                <li key={idx}>{getLocalizedText(dq.message)}</li>
              ))}
            </ul>
          </div>
          <button 
            onClick={() => { setCompleted(false); setCurrentQIndex(0); setAnswers({}); setResult(null); }}
            className="w-full bg-white border border-gray-300 text-gray-700 px-8 py-4 rounded-full font-bold shadow-sm hover:bg-gray-50 transition-colors"
          >
            Start Again
          </button>
        </div>
      );
    }
  }

  const qText = getLocalizedText(currentQ.text);

  return (
    <div className="w-full">
      <JourneyTracker />
      
      <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 min-h-[300px] flex flex-col">
        <div className="flex justify-between items-center mb-6 text-sm text-gray-500 font-medium">
          <span>Question {currentQIndex + 1} of {questions.length}</span>
          {isSpeakSupported && (
            <button 
              onClick={() => speak(qText, language)}
              className="flex items-center gap-1 hover:text-primary-600"
            >
              <span>🔊</span> Read Aloud
            </button>
          )}
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-8 leading-snug flex-1">
          {qText}
        </h2>

        <div className="flex flex-col gap-4 mt-auto">
          {currentQ.options.map(opt => (
            <button 
              key={opt}
              onClick={() => handleAnswer(opt)}
              className="w-full py-4 px-6 border-2 border-gray-200 rounded-2xl text-lg font-bold text-gray-700 hover:border-primary-500 hover:bg-primary-50 hover:text-primary-700 transition-all text-left flex justify-between items-center"
            >
              <span>{opt}</span>
            </button>
          ))}
        </div>

        {currentQIndex > 0 && (
          <div className="mt-6 text-center">
            <button 
              onClick={() => setCurrentQIndex(currentQIndex - 1)}
              className="text-gray-400 font-medium hover:text-gray-600"
            >
              Go Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Eligibility;
