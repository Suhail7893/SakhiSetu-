export const servicesData = {
  "pm-ujjwala": {
    "id": "pm-ujjwala",
    "category": "lpg",
    "name": {
      "en": "PM Ujjwala Yojana",
      "hi": "पीएम उज्ज्वला योजना",
      "ta": "பிஎம் உஜ்வாலா யோஜனா"
    },
    "description": {
      "en": "Financial assistance for LPG connection to women of BPL households.",
      "hi": "बीपीएल परिवारों की महिलाओं को एलपीजी कनेक्शन के लिए वित्तीय सहायता।"
    },
    "questions": [
      {
        "id": "q_gender_age",
        "text": {
          "en": "Are you an adult woman (18 years or older)?",
          "hi": "क्या आप एक वयस्क महिला (18 वर्ष या उससे अधिक) हैं?",
          "ta": "நீங்கள் ஒரு வயது வந்த பெண்ணா (18 வயது அல்லது அதற்கு மேற்பட்டவர்)?"
        },
        "options": ["Yes", "No"],
        "expectedAnswer": "Yes",
        "disqualificationMessage": {
          "en": "This scheme is exclusively for adult women.",
          "hi": "यह योजना विशेष रूप से वयस्क महिलाओं के लिए है।"
        }
      },
      {
        "id": "q_existing_lpg",
        "text": {
          "en": "Does anyone in your household currently have an LPG gas connection?",
          "hi": "क्या आपके घर में वर्तमान में किसी के पास एलपीजी गैस कनेक्शन है?",
          "ta": "உங்கள் வீட்டில் தற்போது வேறு எவருக்காவது எல்பிஜி எரிவாயு இணைப்பு உள்ளதா?"
        },
        "options": ["Yes", "No"],
        "expectedAnswer": "No",
        "disqualificationMessage": {
          "en": "Households with an existing LPG connection are not eligible.",
          "hi": "मौजूदा एलपीजी कनेक्शन वाले घर पात्र नहीं हैं।"
        }
      },
      {
        "id": "q_category",
        "text": {
          "en": "Do you belong to SC, ST, Pradhan Mantri Awas Yojana (Gramin), Most Backward Classes (MBC), Antyodaya Anna Yojana (AAY), or Tea/Ex-Tea Garden Tribes?",
          "hi": "क्या आप एससी, एसटी, प्रधानमंत्री आवास योजना (ग्रामीण), अति पिछड़ा वर्ग (एमबीसी), अंत्योदय अन्न योजना (एएवाई), या चाय/पूर्व चाय बागान जनजातियों से संबंधित हैं?",
          "ta": "நீங்கள் SC, ST, பிரதான் மந்திரி ஆவாஸ் யோஜனா, மிகவும் பிற்படுத்தப்பட்ட வகுப்பினர் (MBC) ஆகிய பிரிவுகளைச் சேர்ந்தவரா?"
        },
        "options": ["Yes", "No"],
        "expectedAnswer": "Yes",
        "disqualificationMessage": {
          "en": "You must belong to one of the specified vulnerable categories.",
          "hi": "आपको निर्दिष्ट कमजोर श्रेणियों में से एक से संबंधित होना चाहिए।",
          "ta": "குறிப்பிடப்பட்ட பாதிக்கப்படக்கூடிய வகைகளில் ஒன்றை நீங்கள் சேர்ந்திருக்க வேண்டும்."
        }
      }
    ],
    "documents": [
      { "id": "doc1", "name": { "en": "Aadhaar Card", "hi": "आधार कार्ड", "ta": "ஆதார் அட்டை" }, "required": true },
      { "id": "doc2", "name": { "en": "Ration Card or other household document", "hi": "राशन कार्ड या अन्य घरेलू दस्तावेज", "ta": "குடும்ப அட்டை அல்லது குடும்ப ஆவணம்" }, "required": true },
      { "id": "doc3", "name": { "en": "Bank Account Number and IFSC", "hi": "बैंक खाता संख्या और आईएफएससी", "ta": "வங்கி கணக்கு எண் மற்றும் IFSC" }, "required": true },
      { "id": "doc4", "name": { "en": "Passport Size Photograph", "hi": "पासपोर्ट साइज फोटो", "ta": "பாஸ்போர்ட் அளவு புகைப்படம்" }, "required": true }
    ],
    "steps": [
      { "id": "s1", "title": { "en": "Collect required documents", "hi": "आवश्यक दस्तावेज एकत्र करें", "ta": "தேவையான ஆவணங்களை சேகரிக்கவும்" } },
      { "id": "s2", "title": { "en": "Visit your nearest LPG distributor", "hi": "अपने निकटतम एलपीजी वितरक के पास जाएं", "ta": "அருகிலுள்ள எரிவாயு விநியோகஸ்தரை அணுகவும்" } },
      { "id": "s3", "title": { "en": "Submit the KYC form with documents", "hi": "दस्तावेजों के साथ केवाईसी फॉर्म जमा करें", "ta": "ஆவணங்களுடன் KYC படிவத்தை சமர்ப்பிக்கவும்" } }
    ],
    "officialUrl": "https://www.pmuy.gov.in/index.aspx",
    "source": "Official PMUY Website"
  }
};
