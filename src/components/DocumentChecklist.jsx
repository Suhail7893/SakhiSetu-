import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useSpeechSynthesis } from '../hooks/useSpeech';
import JourneyTracker from './JourneyTracker';

const DocumentChecklist = ({ service, onReady }) => {
  const { language } = useLanguage();
  const { speak, isSupported: isSpeakSupported } = useSpeechSynthesis();
  
  const [checkedDocs, setCheckedDocs] = useState({});

  const docs = service.documents;
  
  const handleCheck = (id) => {
    setCheckedDocs(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const getLocalizedText = (textObj) => textObj[language] || textObj['en'];

  const allReady = docs.every(d => checkedDocs[d.id]);
  const readyCount = Object.values(checkedDocs).filter(Boolean).length;

  return (
    <div className="w-full">
      <JourneyTracker currentPhase="docs" />
      
      <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 mt-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Are you ready to apply?</h2>
        <p className="text-gray-500 mb-6 text-sm">
          Please confirm you have the following documents ready.
        </p>

        <div className="space-y-4 mb-8">
          {docs.map(doc => {
            const docName = getLocalizedText(doc.name);
            const isChecked = checkedDocs[doc.id];
            
            return (
              <div 
                key={doc.id}
                onClick={() => handleCheck(doc.id)}
                className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-colors ${
                  isChecked ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-primary-300'
                }`}
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className={`w-6 h-6 rounded-md border flex items-center justify-center ${
                    isChecked ? 'bg-green-500 border-green-500' : 'border-gray-300 bg-white'
                  }`}>
                    {isChecked && <span className="text-white text-sm">✓</span>}
                  </div>
                  <span className={`text-lg font-medium ${isChecked ? 'text-green-800' : 'text-gray-700'}`}>
                    {docName}
                  </span>
                </div>
                {isSpeakSupported && (
                  <button 
                    onClick={(e) => { e.stopPropagation(); speak(docName, language); }}
                    className="p-2 text-gray-400 hover:text-primary-600 rounded-full"
                  >
                    🔊
                  </button>
                )}
              </div>
            );
          })}
        </div>

        <div className="text-center text-sm font-medium text-gray-500 mb-6">
          {readyCount} of {docs.length} items ready
        </div>

        <button 
          onClick={onReady}
          disabled={!allReady}
          className={`w-full py-4 rounded-full font-bold shadow-sm transition-colors text-lg ${
            allReady 
              ? 'bg-primary-600 text-white hover:bg-primary-700' 
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          Proceed to Application ➔
        </button>
      </div>
    </div>
  );
};

export default DocumentChecklist;
