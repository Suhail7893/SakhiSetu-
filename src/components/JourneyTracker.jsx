import React from 'react';

const steps = [
  { id: 'need', label: 'Need Identified', status: 'complete' },
  { id: 'eligibility', label: 'Eligibility Check', status: 'current' },
  { id: 'docs', label: 'Documents', status: 'upcoming' },
  { id: 'apply', label: 'Application', status: 'upcoming' }
];

const JourneyTracker = () => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm mb-6 border border-gray-100">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center relative z-10 flex-1">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              step.status === 'complete' ? 'bg-green-500 text-white' : 
              step.status === 'current' ? 'bg-primary-600 text-white ring-4 ring-primary-100' : 
              'bg-gray-100 text-gray-400'
            }`}>
              {step.status === 'complete' ? '✓' : index + 1}
            </div>
            <span className={`text-xs mt-2 text-center font-medium ${
              step.status === 'current' ? 'text-primary-700' : 'text-gray-500'
            }`}>
              {step.label}
            </span>
          </div>
        ))}
      </div>
      {/* Progress Bar Background Line */}
      <div className="relative -mt-10 mx-8">
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-100 -z-10"></div>
        <div className="absolute top-1/2 left-0 w-1/3 h-1 bg-green-500 -z-10"></div>
      </div>
    </div>
  );
};

export default JourneyTracker;
