import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useSpeechSynthesis } from '../hooks/useSpeech';
import JourneyTracker from './JourneyTracker';

const ApplicationStepper = ({ service }) => {
  const { language } = useLanguage();
  const { speak, isSupported: isSpeakSupported } = useSpeechSynthesis();
  
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const steps = service.steps;
  const currentStep = steps[currentStepIndex];

  const getLocalizedText = (textObj) => textObj[language] || textObj['en'];
  const stepText = getLocalizedText(currentStep.title);

  return (
    <div className="w-full">
      <JourneyTracker currentPhase="apply" />
      
      <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 mt-4 min-h-[300px] flex flex-col">
        
        <div className="flex justify-between items-center mb-8">
          <span className="text-primary-600 font-bold uppercase tracking-wider text-sm">
            Step {currentStepIndex + 1} of {steps.length}
          </span>
          {isSpeakSupported && (
            <button 
              onClick={() => speak(stepText, language)}
              className="flex items-center gap-1 hover:text-primary-600 text-sm font-medium text-gray-500"
            >
              <span>🔊</span> Read Aloud
            </button>
          )}
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-8 leading-snug flex-1 text-center mt-4">
          {stepText}
        </h2>

        <div className="flex justify-between items-center mt-auto pt-8 border-t border-gray-100">
          <button 
            onClick={() => setCurrentStepIndex(prev => Math.max(0, prev - 1))}
            className={`px-6 py-3 rounded-full font-medium ${
              currentStepIndex === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 bg-gray-100 hover:bg-gray-200'
            }`}
            disabled={currentStepIndex === 0}
          >
            Back
          </button>
          
          {currentStepIndex < steps.length - 1 ? (
            <button 
              onClick={() => setCurrentStepIndex(prev => prev + 1)}
              className="px-8 py-3 rounded-full font-bold bg-primary-600 text-white hover:bg-primary-700 shadow-md"
            >
              Next
            </button>
          ) : (
            <a 
              href={service.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full font-bold bg-green-500 text-white hover:bg-green-600 shadow-md text-center"
            >
              Open Official Service
            </a>
          )}
        </div>
      </div>
      
      {currentStepIndex === steps.length - 1 && (
        <div className="mt-4 text-center text-xs text-gray-400">
          Source: Official Government Website
        </div>
      )}
    </div>
  );
};

export default ApplicationStepper;
