import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

/* Full-screen language selection – shown on first visit or on demand.
   Each language is displayed with its native name, English name, and region. */

const LANGUAGE_META = {
  en: { english: 'English',   region: 'Pan-India',         flag: '🇮🇳' },
  hi: { english: 'Hindi',     region: 'North / Central',   flag: '🇮🇳' },
  ta: { english: 'Tamil',     region: 'Tamil Nadu',        flag: '🎤' },
  te: { english: 'Telugu',    region: 'Telangana / AP',    flag: '🎤' },
  kn: { english: 'Kannada',   region: 'Karnataka',         flag: '🎤' },
  ml: { english: 'Malayalam', region: 'Kerala',            flag: '🎤' },
  mr: { english: 'Marathi',   region: 'Maharashtra',       flag: '🎤' },
  bn: { english: 'Bengali',   region: 'West Bengal',       flag: '🎤' },
  gu: { english: 'Gujarati',  region: 'Gujarat',           flag: '🎤' },
  pa: { english: 'Punjabi',   region: 'Punjab',            flag: '🎤' },
  or: { english: 'Odia',      region: 'Odisha',            flag: '🎤' },
  as: { english: 'Assamese',  region: 'Assam',             flag: '🎤' },
  ur: { english: 'Urdu',      region: 'Pan-India',         flag: '🎤' },
};

const LanguageSelector = ({ fullScreen = false, onDone }) => {
  const { language, setLanguage, supportedLanguages } = useLanguage();

  const handleSelect = (code) => {
    setLanguage(code);
    if (fullScreen && onDone) {
      // small delay so the user sees their choice highlight
      setTimeout(() => onDone(), 200);
    }
  };

  /* ---------- Compact dropdown version (header) ---------- */
  if (!fullScreen) {
    return (
      <div className="lang-compact-grid">
        {supportedLanguages.map((lang) => {
          const meta = LANGUAGE_META[lang.code] || {};
          const isSelected = language === lang.code;
          return (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              aria-label={`Select language ${meta.english || lang.name}`}
              className={`lang-compact-btn ${isSelected ? 'active' : ''}`}
            >
              <span className="lang-compact-native">{lang.name}</span>
              <span className="lang-compact-english">{meta.english}</span>
            </button>
          );
        })}
      </div>
    );
  }

  /* ---------- Full-screen welcome version ---------- */
  return (
    <div className="lang-fullscreen">
      {/* Decorative Background */}
      <div className="lang-fs-bg-glow"></div>
      <div className="lang-fs-bg-glow secondary"></div>

      <div className="lang-fs-content">
        {/* Logo */}
        <div className="lang-fs-logo">
          <span className="lang-fs-logo-text">SAKHISETU</span>
          <span className="lang-fs-logo-badge">AI</span>
        </div>

        {/* Greeting in multiple languages */}
        <div className="lang-fs-greeting">
          <p className="lang-fs-greeting-main">🙏 नमस्ते · வணக்கம் · Hello</p>
          <p className="lang-fs-greeting-sub">Choose your language · अपनी भाषा चुनें</p>
        </div>

        {/* Language Grid */}
        <div className="lang-fs-grid" role="radiogroup" aria-label="Select your language">
          {supportedLanguages.map((lang) => {
            const meta = LANGUAGE_META[lang.code] || {};
            const isSelected = language === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => handleSelect(lang.code)}
                role="radio"
                aria-checked={isSelected}
                aria-label={`${meta.english || lang.name}`}
                className={`lang-fs-card ${isSelected ? 'selected' : ''}`}
              >
                <div className="lang-fs-card-top">
                  <span className="lang-fs-native">{lang.name}</span>
                  <span className="lang-fs-mic" aria-hidden="true">🎤</span>
                </div>
                <div className="lang-fs-card-bottom">
                  <span className="lang-fs-english">{meta.english}</span>
                  <span className="lang-fs-region">{meta.region}</span>
                </div>
                {isSelected && (
                  <div className="lang-fs-check" aria-hidden="true">✓</div>
                )}
              </button>
            );
          })}
        </div>

        {/* Continue Button */}
        <button
          onClick={onDone}
          className="lang-fs-continue"
          aria-label="Continue with selected language"
        >
          <span>
            {language === 'hi' ? 'आगे बढ़ें' :
             language === 'ta' ? 'தொடரவும்' :
             language === 'te' ? 'కొనసాగించు' :
             language === 'kn' ? 'ಮುಂದುವರಿಸಿ' :
             language === 'ml' ? 'തുടരുക' :
             language === 'mr' ? 'पुढे जा' :
             language === 'bn' ? 'এগিয়ে যান' :
             language === 'gu' ? 'ચાલુ રાખો' :
             language === 'pa' ? 'ਅੱਗੇ ਵਧੋ' :
             language === 'or' ? 'ଆଗକୁ ବଢନ୍ତୁ' :
             language === 'ur' ? 'آگے بڑھیں' :
             'Continue'}
          </span>
          <span aria-hidden="true">→</span>
        </button>

        <p className="lang-fs-footer">
          🔒 {language === 'hi' ? 'कोई व्यक्तिगत डेटा संग्रहित नहीं' :
               language === 'ta' ? 'தனிப்பட்ட தரவு சேமிக்கப்படாது' :
               'No personal data stored'}
        </p>
      </div>
    </div>
  );
};

export default LanguageSelector;
