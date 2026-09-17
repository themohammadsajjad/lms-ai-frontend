export type ThemePreference = 'light' | 'dark';

const THEME_KEY = 'lms_theme';
const EMAIL_NOTIFICATIONS_KEY = 'lms_email_notifications';
const LEARNING_REMINDERS_KEY = 'lms_learning_reminders';

function readBoolean(key: string, fallback: boolean) {
  const stored = localStorage.getItem(key);

  if (stored === null) {
    return fallback;
  }

  return stored === 'true';
}

export const settingsService = {
  getTheme(): ThemePreference {
    const stored = localStorage.getItem(THEME_KEY);

    return stored === 'dark' ? 'dark' : 'light';
  },

  setTheme(theme: ThemePreference) {
    localStorage.setItem(THEME_KEY, theme);
    document.documentElement.dataset.theme = theme;

    window.dispatchEvent(
      new CustomEvent('vertexlearn-theme-updated', {
        detail: theme,
      }),
    );
  },

  applyTheme() {
    document.documentElement.dataset.theme =
      this.getTheme();
  },

  getEmailNotifications(): boolean {
    return readBoolean(
      EMAIL_NOTIFICATIONS_KEY,
      true,
    );
  },

  setEmailNotifications(enabled: boolean) {
    localStorage.setItem(
      EMAIL_NOTIFICATIONS_KEY,
      String(enabled),
    );
  },

  getLearningReminders(): boolean {
    return readBoolean(
      LEARNING_REMINDERS_KEY,
      true,
    );
  },

  setLearningReminders(enabled: boolean) {
    localStorage.setItem(
      LEARNING_REMINDERS_KEY,
      String(enabled),
    );
  },
};