import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { mockCategories } from '../data/mockData';

const Home = ({ onStartConversation }) => {
  const { t, language } = useLanguage();

  return (
    <div className="home-dashboard">

      {/* Welcome Hero */}
      <section className="dashboard-hero">
        <div className="hero-glow"></div>
        <div className="hero-content">
          <div className="hero-icon-ring">
            <button
              onClick={() => onStartConversation()}
              aria-label="Start voice interaction"
              className="hero-mic-btn"
            >
              <span className="mic-emoji" aria-hidden="true">🎤</span>
              <span className="pulse-ring"></span>
              <span className="pulse-ring delay"></span>
            </button>
          </div>
          <h2 className="hero-title">{t('startJourney')}</h2>
          <p className="hero-subtitle">
            {language === 'hi' ? 'बोलकर या टाइप करके शुरू करें' :
             language === 'ta' ? 'பேசவும் அல்லது தட்டச்சு செய்யவும்' :
             'Tap to speak or type below'}
          </p>
        </div>
      </section>

      {/* Quick Categories */}
      <section className="dashboard-section">
        <h3 className="section-title">
          <span className="section-icon">📂</span>
          {language === 'hi' ? 'श्रेणी चुनें' :
           language === 'ta' ? 'வகையைத் தேர்ந்தெடுக்கவும்' :
           'Choose a Category'}
        </h3>
        <div className="category-grid" role="list">
          {mockCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => onStartConversation(cat.name)}
              aria-label={`Select category ${cat.name}`}
              className="category-card"
            >
              <span className="category-icon" aria-hidden="true">{cat.icon}</span>
              <span className="category-name">{cat.name}</span>
              <span className="category-arrow" aria-hidden="true">→</span>
            </button>
          ))}
        </div>
      </section>

      {/* Text Input */}
      <section className="dashboard-section">
        <h3 className="section-title">
          <span className="section-icon">✏️</span>
          {language === 'hi' ? 'या यहाँ टाइप करें' :
           language === 'ta' ? 'அல்லது இங்கே தட்டச்சு செய்யவும்' :
           'Or type your need'}
        </h3>
        <div className="search-box">
          <input
            type="text"
            placeholder={
              language === 'hi' ? 'आपको किस सरकारी सहायता की जरूरत है?' :
              language === 'ta' ? 'உங்களுக்கு என்ன அரசு உதவி தேவை?' :
              'What government help do you need?'
            }
            aria-label="Type your need"
            className="search-input"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.target.value.trim()) {
                onStartConversation(e.target.value);
              }
            }}
          />
          <button
            onClick={() => {
              const input = document.querySelector('.search-input');
              if (input && input.value.trim()) onStartConversation(input.value);
              else onStartConversation();
            }}
            aria-label="Send typed message"
            className="search-send-btn"
          >
            ➔
          </button>
        </div>
      </section>

      {/* Info Cards */}
      <section className="dashboard-section">
        <div className="info-cards-row">
          <div className="info-card">
            <span className="info-card-icon">🛡️</span>
            <div>
              <strong>
                {language === 'hi' ? 'सुरक्षित' :
                 language === 'ta' ? 'பாதுகாப்பான' :
                 'Secure'}
              </strong>
              <p>
                {language === 'hi' ? 'कोई व्यक्तिगत डेटा संग्रहित नहीं' :
                 language === 'ta' ? 'தனிப்பட்ட தரவு சேமிக்கப்படாது' :
                 'No personal data stored'}
              </p>
            </div>
          </div>
          <div className="info-card">
            <span className="info-card-icon">🗣️</span>
            <div>
              <strong>
                {language === 'hi' ? '13 भाषाएँ' :
                 language === 'ta' ? '13 மொழிகள்' :
                 '13 Languages'}
              </strong>
              <p>
                {language === 'hi' ? 'बोलें या टाइप करें' :
                 language === 'ta' ? 'பேசவும் அல்லது தட்டச்சு செய்யவும்' :
                 'Voice & text supported'}
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
