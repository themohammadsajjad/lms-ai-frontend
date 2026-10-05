export type AppLanguage =
  | 'en'
  | 'hi';

export type TranslationKey =
  | 'settings.personalization'
  | 'settings.title'
  | 'settings.description'
  | 'settings.appearance'
  | 'settings.appearanceDescription'
  | 'settings.notifications'
  | 'settings.notificationsDescription'
  | 'settings.language'
  | 'settings.languageDescription'
  | 'settings.english'
  | 'settings.hindi'
  | 'settings.platformPreferences'
  | 'settings.savedLocally';

const LANGUAGE_KEY =
  'lms_language';

const translations: Record<
  AppLanguage,
  Record<
    TranslationKey,
    string
  >
> = {
  en: {
    'settings.personalization':
      'Personalization',

    'settings.title':
      'Settings',

    'settings.description':
      'Customize your VertexLearn workspace and notification preferences.',

    'settings.appearance':
      'Appearance',

    'settings.appearanceDescription':
      'Choose how the learning workspace looks.',

    'settings.notifications':
      'Notifications',

    'settings.notificationsDescription':
      'Control learning alerts and reminders.',

    'settings.language':
      'Language',

    'settings.languageDescription':
      'Choose your preferred interface language.',

    'settings.english':
      'English',

    'settings.hindi':
      'Hindi',

    'settings.platformPreferences':
      'Platform preferences',

    'settings.savedLocally':
      'Settings are stored locally for this frontend demo.',
  },

  hi: {
    'settings.personalization':
      'निजीकरण',

    'settings.title':
      'सेटिंग्स',

    'settings.description':
      'अपने VertexLearn वर्कस्पेस और नोटिफिकेशन प्राथमिकताओं को अनुकूलित करें।',

    'settings.appearance':
      'दिखावट',

    'settings.appearanceDescription':
      'चुनें कि आपका लर्निंग वर्कस्पेस कैसा दिखाई दे।',

    'settings.notifications':
      'नोटिफिकेशन',

    'settings.notificationsDescription':
      'लर्निंग अलर्ट और रिमाइंडर नियंत्रित करें।',

    'settings.language':
      'भाषा',

    'settings.languageDescription':
      'अपनी पसंदीदा इंटरफेस भाषा चुनें।',

    'settings.english':
      'अंग्रेज़ी',

    'settings.hindi':
      'हिंदी',

    'settings.platformPreferences':
      'प्लेटफ़ॉर्म प्राथमिकताएँ',

    'settings.savedLocally':
      'इस फ्रंटएंड डेमो के लिए सेटिंग्स लोकली सेव की जाती हैं।',
  },
};

function getStoredLanguage():
  AppLanguage {
  const stored =
    localStorage.getItem(
      LANGUAGE_KEY,
    );

  if (
    stored === 'hi' ||
    stored === 'en'
  ) {
    return stored;
  }

  return 'en';
}

export const i18nService = {
  getLanguage():
    AppLanguage {
    return getStoredLanguage();
  },

  setLanguage(
    language: AppLanguage,
  ) {
    localStorage.setItem(
      LANGUAGE_KEY,
      language,
    );

    document.documentElement.lang =
      language;
  },

  applyLanguage() {
    document.documentElement.lang =
      getStoredLanguage();
  },

  translate(
    key: TranslationKey,
    language: AppLanguage =
      getStoredLanguage(),
  ) {
    return (
      translations[
        language
      ][key] ??
      translations.en[key]
    );
  },

  getLanguages() {
    return [
      {
        value:
          'en' as const,
        label:
          'English',
      },
      {
        value:
          'hi' as const,
        label:
          'हिंदी',
      },
    ];
  },
};