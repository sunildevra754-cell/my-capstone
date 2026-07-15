import { useState } from 'react'
import './SettingsForm.css'

const STORAGE_KEY = 'app-settings'

const defaultSettings = {
  displayName: '',
  email: '',
  theme: 'system',
  language: 'en',
  emailNotifications: true,
  pushNotifications: false,
  weeklyDigest: true,
}

function loadSettings() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings
  } catch {
    return defaultSettings
  }
}

function SettingsForm() {
  const [settings, setSettings] = useState(loadSettings)
  const [saved, setSaved] = useState(false)

  function updateField(field, value) {
    setSettings((prev) => ({ ...prev, [field]: value }))
    setSaved(false)
  }

  function handleSubmit(event) {
    event.preventDefault()
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
    setSaved(true)
  }

  function handleReset() {
    setSettings(defaultSettings)
    localStorage.removeItem(STORAGE_KEY)
    setSaved(false)
  }

  return (
    <section className="settings" aria-labelledby="settings-heading">
      <div className="settings-header">
        <h2 id="settings-heading">Settings</h2>
        <p>Manage your profile and preferences</p>
      </div>

      <form className="settings-form" onSubmit={handleSubmit}>
        <fieldset className="settings-group">
          <legend>Profile</legend>

          <div className="form-field">
            <label htmlFor="displayName">Display name</label>
            <input
              id="displayName"
              type="text"
              value={settings.displayName}
              onChange={(e) => updateField('displayName', e.target.value)}
              placeholder="Your name"
              autoComplete="name"
            />
          </div>

          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={settings.email}
              onChange={(e) => updateField('email', e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
            />
          </div>
        </fieldset>

        <fieldset className="settings-group">
          <legend>Preferences</legend>

          <div className="form-field">
            <label htmlFor="theme">Theme</label>
            <select
              id="theme"
              value={settings.theme}
              onChange={(e) => updateField('theme', e.target.value)}
            >
              <option value="system">System</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="language">Language</label>
            <select
              id="language"
              value={settings.language}
              onChange={(e) => updateField('language', e.target.value)}
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="hi">हिन्दी</option>
            </select>
          </div>
        </fieldset>

        <fieldset className="settings-group">
          <legend>Notifications</legend>

          <label className="form-toggle">
            <input
              type="checkbox"
              checked={settings.emailNotifications}
              onChange={(e) => updateField('emailNotifications', e.target.checked)}
            />
            <span className="toggle-track" aria-hidden="true" />
            <span className="toggle-label">
              <strong>Email notifications</strong>
              <small>Receive updates about your account</small>
            </span>
          </label>

          <label className="form-toggle">
            <input
              type="checkbox"
              checked={settings.pushNotifications}
              onChange={(e) => updateField('pushNotifications', e.target.checked)}
            />
            <span className="toggle-track" aria-hidden="true" />
            <span className="toggle-label">
              <strong>Push notifications</strong>
              <small>Get alerts on this device</small>
            </span>
          </label>

          <label className="form-toggle">
            <input
              type="checkbox"
              checked={settings.weeklyDigest}
              onChange={(e) => updateField('weeklyDigest', e.target.checked)}
            />
            <span className="toggle-track" aria-hidden="true" />
            <span className="toggle-label">
              <strong>Weekly digest</strong>
              <small>A summary of activity each week</small>
            </span>
          </label>
        </fieldset>

        <div className="settings-actions">
          <button type="submit" className="btn btn-primary">
            Save changes
          </button>
          <button type="button" className="btn btn-secondary" onClick={handleReset}>
            Reset to defaults
          </button>
          {saved && (
            <p className="settings-saved" role="status">
              Settings saved
            </p>
          )}
        </div>
      </form>
    </section>
  )
}

export default SettingsForm
