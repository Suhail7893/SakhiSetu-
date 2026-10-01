export const mockCategories = [
  { id: 'lpg', name: 'LPG / Cooking Gas', icon: '🔥' },
  { id: 'education', name: 'Education & Scholarships', icon: '📚' },
  { id: 'health', name: 'Health & Medical', icon: '🏥' },
  { id: 'housing', name: 'Housing Assistance', icon: '🏠' },
];

export const mockService = {
  id: 'pm-ujjwala',
  name: {
    en: 'PM Ujjwala Yojana',
    hi: 'पीएम उज्ज्वला योजना',
    ta: 'பிஎம் உஜ்வாலா யோஜனா'
  },
  category: 'lpg',
  questions: [
    {
      id: 'q1',
      text: {
        en: 'Are you an adult woman (above 18 years of age)?',
        hi: 'क्या आप एक वयस्क महिला (18 वर्ष से अधिक आयु) हैं?'
      },
      options: ['Yes', 'No']
    },
    {
      id: 'q2',
      text: {
        en: 'Do you currently have an LPG connection in your household?',
        hi: 'क्या आपके घर में वर्तमान में कोई एलपीजी कनेक्शन है?'
      },
      options: ['Yes', 'No'] // No is the correct answer for eligibility
    }
  ],
  documents: [
    { id: 'd1', name: { en: 'Aadhaar Card', hi: 'आधार कार्ड' } },
    { id: 'd2', name: { en: 'Ration Card', hi: 'राशन कार्ड' } },
    { id: 'd3', name: { en: 'Bank Account Details', hi: 'बैंक खाते का विवरण' } }
  ],
  steps: [
    { id: 's1', title: { en: 'Prepare your documents', hi: 'अपने दस्तावेज तैयार करें' } },
    { id: 's2', title: { en: 'Visit nearest LPG distributor', hi: 'निकटतम एलपीजी वितरक के पास जाएं' } },
    { id: 's3', title: { en: 'Submit application form', hi: 'आवेदन पत्र जमा करें' } }
  ],
  officialUrl: 'https://www.pmuy.gov.in/'
};
