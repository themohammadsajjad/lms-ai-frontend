import {
  Bell,
  Check,
  Languages,
  Laptop,
  Moon,
  Settings as SettingsIcon,
  Sun,
} from 'lucide-react';
import { useState } from 'react';
import {
  i18nService,
  type AppLanguage,
  type TranslationKey,
} from '../services/i18nService';
import {
  settingsService,
  type ThemePreference,
} from '../services/settingsService';

function Settings() {
  const [theme, setTheme] =
    useState<ThemePreference>(
      settingsService.getTheme(),
    );

  const [
    emailNotifications,
    setEmailNotifications,
  ] = useState(
    settingsService.getEmailNotifications(),
  );

  const [
    learningReminders,
    setLearningReminders,
  ] = useState(
    settingsService.getLearningReminders(),
  );

  const [
    language,
    setLanguage,
  ] = useState<AppLanguage>(
    i18nService.getLanguage(),
  );

  function t(
    key: TranslationKey,
  ) {
    return i18nService.translate(
      key,
      language,
    );
  }

  function handleTheme(
    nextTheme: ThemePreference,
  ) {
    setTheme(nextTheme);

    settingsService.setTheme(
      nextTheme,
    );
  }

  function handleEmailNotifications() {
    const nextValue =
      !emailNotifications;

    setEmailNotifications(
      nextValue,
    );

    settingsService.setEmailNotifications(
      nextValue,
    );
  }

  function handleLearningReminders() {
    const nextValue =
      !learningReminders;

    setLearningReminders(
      nextValue,
    );

    settingsService.setLearningReminders(
      nextValue,
    );
  }

  function handleLanguage(
    nextLanguage: AppLanguage,
  ) {
    setLanguage(
      nextLanguage,
    );

    i18nService.setLanguage(
      nextLanguage,
    );
  }

  return (
    <section className="settings-page">
      <div className="settings-heading">
        <span className="eyebrow">
          {t(
            'settings.personalization',
          )}
        </span>

        <h1>
          {t(
            'settings.title',
          )}
        </h1>

        <p>
          {t(
            'settings.description',
          )}
        </p>
      </div>

      <div className="settings-grid">
        <section className="settings-card">
          <div className="settings-card-heading">
            <div className="settings-heading-icon">
              <Laptop
                size={20}
              />
            </div>

            <div>
              <h2>
                {t(
                  'settings.appearance',
                )}
              </h2>

              <p>
                {t(
                  'settings.appearanceDescription',
                )}
              </p>
            </div>
          </div>

          <div className="theme-options">
            <button
              type="button"
              className={
                theme ===
                'light'
                  ? 'active'
                  : ''
              }
              onClick={() =>
                handleTheme(
                  'light',
                )
              }
            >
              <div>
                <Sun
                  size={21}
                />
              </div>

              <section>
                <strong>
                  Light mode
                </strong>

                <span>
                  Bright workspace
                  with light
                  surfaces.
                </span>
              </section>

              {theme ===
                'light' && (
                <Check
                  size={18}
                />
              )}
            </button>

            <button
              type="button"
              className={
                theme ===
                'dark'
                  ? 'active'
                  : ''
              }
              onClick={() =>
                handleTheme(
                  'dark',
                )
              }
            >
              <div>
                <Moon
                  size={21}
                />
              </div>

              <section>
                <strong>
                  Dark mode
                </strong>

                <span>
                  Reduced
                  brightness for
                  dark
                  environments.
                </span>
              </section>

              {theme ===
                'dark' && (
                <Check
                  size={18}
                />
              )}
            </button>
          </div>
        </section>

        <section className="settings-card">
          <div className="settings-card-heading">
            <div className="settings-heading-icon">
              <Bell
                size={20}
              />
            </div>

            <div>
              <h2>
                {t(
                  'settings.notifications',
                )}
              </h2>

              <p>
                {t(
                  'settings.notificationsDescription',
                )}
              </p>
            </div>
          </div>

          <div className="settings-preference-list">
            <article>
              <div>
                <strong>
                  Email
                  notifications
                </strong>

                <span>
                  Receive
                  assignment and
                  course updates.
                </span>
              </div>

              <button
                type="button"
                className={`settings-toggle ${
                  emailNotifications
                    ? 'enabled'
                    : ''
                }`}
                onClick={
                  handleEmailNotifications
                }
                aria-label="Toggle email notifications"
                aria-pressed={
                  emailNotifications
                }
              >
                <span />
              </button>
            </article>

            <article>
              <div>
                <strong>
                  Learning
                  reminders
                </strong>

                <span>
                  Get reminders
                  about pending
                  learning
                  activities.
                </span>
              </div>

              <button
                type="button"
                className={`settings-toggle ${
                  learningReminders
                    ? 'enabled'
                    : ''
                }`}
                onClick={
                  handleLearningReminders
                }
                aria-label="Toggle learning reminders"
                aria-pressed={
                  learningReminders
                }
              >
                <span />
              </button>
            </article>
          </div>
        </section>

        <section className="settings-card">
          <div className="settings-card-heading">
            <div className="settings-heading-icon">
              <Languages
                size={20}
              />
            </div>

            <div>
              <h2>
                {t(
                  'settings.language',
                )}
              </h2>

              <p>
                {t(
                  'settings.languageDescription',
                )}
              </p>
            </div>
          </div>

          <div className="language-options">
            <button
              type="button"
              className={
                language ===
                'en'
                  ? 'active'
                  : ''
              }
              onClick={() =>
                handleLanguage(
                  'en',
                )
              }
              aria-pressed={
                language ===
                'en'
              }
            >
              <div className="language-option-code">
                EN
              </div>

              <section>
                <strong>
                  English
                </strong>

                <span>
                  English
                  interface
                </span>
              </section>

              {language ===
                'en' && (
                <Check
                  size={18}
                />
              )}
            </button>

            <button
              type="button"
              className={
                language ===
                'hi'
                  ? 'active'
                  : ''
              }
              onClick={() =>
                handleLanguage(
                  'hi',
                )
              }
              aria-pressed={
                language ===
                'hi'
              }
            >
              <div className="language-option-code">
                HI
              </div>

              <section>
                <strong>
                  हिंदी
                </strong>

                <span>
                  हिंदी इंटरफेस
                </span>
              </section>

              {language ===
                'hi' && (
                <Check
                  size={18}
                />
              )}
            </button>
          </div>
        </section>

        <section className="settings-card settings-info-card">
          <div className="settings-card-heading">
            <div className="settings-heading-icon">
              <SettingsIcon
                size={20}
              />
            </div>

            <div>
              <h2>
                {t(
                  'settings.platformPreferences',
                )}
              </h2>

              <p>
                {t(
                  'settings.savedLocally',
                )}
              </p>
            </div>
          </div>

          <div className="settings-info-row">
            <span>
              Theme
            </span>

            <strong>
              {theme ===
              'dark'
                ? 'Dark mode'
                : 'Light mode'}
            </strong>
          </div>

          <div className="settings-info-row">
            <span>
              {t(
                'settings.language',
              )}
            </span>

            <strong>
              {language ===
              'hi'
                ? t(
                    'settings.hindi',
                  )
                : t(
                    'settings.english',
                  )}
            </strong>
          </div>

          <div className="settings-info-row">
            <span>
              Workspace
            </span>

            <strong>
              VertexLearn
            </strong>
          </div>
        </section>
      </div>
    </section>
  );
}

export default Settings;