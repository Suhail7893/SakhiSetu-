import React, { useState } from 'react';
import { useLanguage } from './contexts/LanguageContext';
import LanguageSelector from './components/LanguageSelector';
import Home from './components/Home';
import Conversation from './components/Conversation';
import Eligibility from './components/Eligibility';
import DocumentChecklist from './components/DocumentChecklist';
import ApplicationStepper from './components/ApplicationStepper';
import { servicesData } from './data/services';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-red-50 p-6 text-center">
          <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full">
            <div className="text-5xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Something went wrong</h2>
            <p className="text-gray-600 mb-6">We encountered an unexpected error. Please try restarting.</p>
            <button 
              onClick={() => { localStorage.clear(); window.location.reload(); }}
              className="w-full bg-primary-600 text-white px-6 py-3 rounded-full font-bold"
            >
              Restart App
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  const { t } = useLanguage();
  
  // State for MVP screen navigation with localStorage persistence
  const [currentScreen, setCurrentScreen] = useState(() => {
    return localStorage.getItem('sakhisetu_screen') || 'home';
  });
  
  const [activeServiceId, setActiveServiceId] = useState(() => {
    return localStorage.getItem('sakhisetu_service') || null;
  });

  // Save non-sensitive progress locally
  React.useEffect(() => {
    localStorage.setItem('sakhisetu_screen', currentScreen);
    if (activeServiceId) {
      localStorage.setItem('sakhisetu_service', activeServiceId);
    } else {
      localStorage.removeItem('sakhisetu_service');
    }
  }, [currentScreen, activeServiceId]);

  const handleStartConversation = (intent) => {
    setCurrentScreen('conversation');
  };

  const handleIdentifyService = (serviceId) => {
    setActiveServiceId(serviceId || 'pm-ujjwala'); // fallback for mock
    setCurrentScreen('eligibility');
  };

  const activeService = servicesData[activeServiceId] || servicesData['pm-ujjwala'];

  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col items-center bg-gray-50 font-sans">
        
        {/* Header */}
        <header className="w-full max-w-md bg-white p-4 shadow-sm z-50 sticky top-0 flex justify-between items-center">
          <div>
            <h1 
              className="text-2xl font-extrabold text-primary-600 cursor-pointer tracking-tight"
              onClick={() => {
                setCurrentScreen('home');
                setActiveServiceId(null);
              }}
              aria-label="Go to Home"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if(e.key === 'Enter') setCurrentScreen('home'); }}
            >
              SAKHISETU <span className="text-gray-800 text-sm font-medium ml-1 bg-gray-100 px-2 py-1 rounded">AI</span>
            </h1>
          </div>
          
          {/* Simple inline language selector or settings icon for MVP */}
          <div className="relative group">
            <button aria-label="Language settings" className="p-2 bg-gray-50 rounded-full text-gray-600 focus:ring-2 focus:ring-primary-500">🌐</button>
            <div className="absolute right-0 top-full mt-2 hidden group-hover:block focus-within:block bg-white p-4 rounded-xl shadow-xl border border-gray-100 min-w-[200px]">
              <LanguageSelector />
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 w-full max-w-md p-4 sm:p-6 pb-24" aria-live="polite">
          
          {currentScreen === 'home' && (
            <>
              <div className="text-center mb-6 mt-4">
                <p className="text-gray-500 font-medium">"{t('tagline')}"</p>
              </div>
              <Home onStartConversation={handleStartConversation} />
            </>
          )}

          {currentScreen === 'conversation' && (
            <Conversation onIdentifyService={handleIdentifyService} />
          )}

          {currentScreen === 'eligibility' && (
            <Eligibility 
              service={activeService}
              onProceedToDocuments={() => setCurrentScreen('documents')} 
            />
          )}

          {currentScreen === 'documents' && (
            <DocumentChecklist 
              service={activeService}
              onReady={() => setCurrentScreen('apply')}
            />
          )}

          {currentScreen === 'apply' && (
            <ApplicationStepper service={activeService} />
          )}

        </main>

      </div>
    </ErrorBoundary>
  );
}

export default App;
