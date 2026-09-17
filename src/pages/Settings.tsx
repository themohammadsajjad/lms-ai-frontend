import {
  Bell,
  Check,
  Laptop,
  Moon,
  Settings as SettingsIcon,
  Sun,
} from 'lucide-react';
import { useState } from 'react';
import {
  settingsService,
  type ThemePreference,
} from '../services/settingsService';

function Settings() {
  const [theme, setTheme] =
    useState<ThemePreference>(
      settingsService.getTheme(),
    );

  const [emailNotifications, setEmailNotifications] =
    useState(
      settingsService.getEmailNotifications(),
    );

  const [learningReminders, setLearningReminders] =
    useState(
      settingsService.getLearningReminders(),
    );

  function handleTheme(nextTheme: ThemePreference) {
    setTheme(nextTheme);
    settingsService.setTheme(nextTheme);
  }

  function handleEmailNotifications() {
    const nextValue = !emailNotifications;

    setEmailNotifications(nextValue);
    settingsService.setEmailNotifications(nextValue);
  }

  function handleLearningReminders() {
    const nextValue = !learningReminders;

    setLearningReminders(nextValue);
    settingsService.setLearningReminders(nextValue);
  }

  return (
    <section className="settings-page">
      <div className="settings-heading">
        <span className="eyebrow">
          Personalization
        </span>

        <h1>Settings</h1>

        <p>
          Customize your VertexLearn workspace and
          notification preferences.
        </p>
      </div>

      <div className="settings-grid">
        <section className="settings-card">
          <div className="settings-card-heading">
            <div className="settings-heading-icon">
              <Laptop size={20} />
            </div>

            <div>
              <h2>Appearance</h2>

              <p>
                Choose how the learning workspace looks.
              </p>
            </div>
          </div>

          <div className="theme-options">
            <button
              type="button"
              className={
                theme === 'light' ? 'active' : ''
              }
              onClick={() => handleTheme('light')}
            >
              <div>
                <Sun size={21} />
              </div>

              <section>
                <strong>Light mode</strong>
                <span>
                  Bright workspace with light surfaces.
                </span>
              </section>

              {theme === 'light' && (
                <Check size={18} />
              )}
            </button>

            <button
              type="button"
              className={
                theme === 'dark' ? 'active' : ''
              }
              onClick={() => handleTheme('dark')}
            >
              <div>
                <Moon size={21} />
              </div>

              <section>
                <strong>Dark mode</strong>
                <span>
                  Reduced brightness for dark environments.
                </span>
              </section>

              {theme === 'dark' && (
                <Check size={18} />
              )}
            </button>
          </div>
        </section>

        <section className="settings-card">
          <div className="settings-card-heading">
            <div className="settings-heading-icon">
              <Bell size={20} />
            </div>

            <div>
              <h2>Notifications</h2>

              <p>
                Control learning alerts and reminders.
              </p>
            </div>
          </div>

          <div className="settings-preference-list">
            <article>
              <div>
                <strong>Email notifications</strong>

                <span>
                  Receive assignment and course updates.
                </span>
              </div>

              <button
                type="button"
                className={`settings-toggle ${
                  emailNotifications ? 'enabled' : ''
                }`}
                onClick={handleEmailNotifications}
                aria-label="Toggle email notifications"
              >
                <span />
              </button>
            </article>

            <article>
              <div>
                <strong>Learning reminders</strong>

                <span>
                  Get reminders about pending learning
                  activities.
                </span>
              </div>

              <button
                type="button"
                className={`settings-toggle ${
                  learningReminders ? 'enabled' : ''
                }`}
                onClick={handleLearningReminders}
                aria-label="Toggle learning reminders"
              >
                <span />
              </button>
            </article>
          </div>
        </section>

        <section className="settings-card settings-info-card">
          <div className="settings-card-heading">
            <div className="settings-heading-icon">
              <SettingsIcon size={20} />
            </div>

            <div>
              <h2>Platform preferences</h2>

              <p>
                Settings are stored locally for this
                frontend demo.
              </p>
            </div>
          </div>

          <div className="settings-info-row">
            <span>Theme</span>
            <strong>
              {theme === 'dark'
                ? 'Dark mode'
                : 'Light mode'}
            </strong>
          </div>

          <div className="settings-info-row">
            <span>Language</span>
            <strong>English</strong>
          </div>

          <div className="settings-info-row">
            <span>Workspace</span>
            <strong>VertexLearn</strong>
          </div>
        </section>
      </div>
    </section>
  );
}

export default Settings;