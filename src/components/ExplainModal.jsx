import React, { useState } from 'react';

const ExplainModal = ({ isOpen, onClose, originalText, getExplanation }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl relative animate-in fade-in zoom-in duration-200">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200"
        >
          ✕
        </button>
        <h3 className="text-lg font-bold text-gray-800 mb-4 pr-8">Let me explain simply</h3>
        <div className="bg-primary-50 text-primary-900 p-4 rounded-xl text-sm italic mb-4">
          "{originalText}"
        </div>
        <div className="text-gray-700 leading-relaxed min-h-[60px]">
          {getExplanation() || "Loading simple explanation..."}
        </div>
        <div className="mt-6 flex justify-end">
          <button 
            onClick={onClose}
            className="bg-primary-600 text-white px-6 py-2 rounded-full font-medium"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExplainModal;
