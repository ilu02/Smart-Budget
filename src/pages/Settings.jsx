import React, { useState } from 'react';
import './Settings.css';

function Settings() {
  // Local state
  const [darkMode, setDarkMode] = useState(false);
  const [currency, setCurrency] = useState('USD');
  const [defaultCategory, setDefaultCategory] = useState('Groceries');
  const [startDay, setStartDay] = useState('1');
  const [dateFormat, setDateFormat] = useState('MM/DD/YYYY');
  const [notifications, setNotifications] = useState({
    overBudget: true,
    monthlySummary: true,
  });
  const [recurringEnabled, setRecurringEnabled] = useState(true);
  const [recurringFrequency, setRecurringFrequency] = useState('Monthly');

  return (
    <div className="settings-container">
      <h2>Settings</h2>

      {/* 1. Profile Settings */}
      <section className="settings-section">
        <h3>Profile Information</h3>
        <label>
          Name
          <input type="text" placeholder="Chris" />
        </label>
        <label>
          Email
          <input type="email" value="chris@example.com" disabled />
        </label>
        <label>
          Change Password
          <input type="password" placeholder="New Password" />
        </label>
      </section>

      {/* 2. Theme Preferences */}
      <section className="settings-section">
        <h3>Theme Preferences</h3>
        <label>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
          Enable Dark Mode
        </label>
      </section>

      {/* 3. Budget & Currency Preferences */}
      <section className="settings-section">
        <h3>Budget & Currency Preferences</h3>
        <label>
          Currency
          <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
            <option value="ZMW">Zambian Kwacha (ZMW)</option>
            <option value="USD">US Dollar (USD)</option>
            <option value="EUR">Euro (EUR)</option>
          </select>
        </label>
        <label>
          Default Category
          <select value={defaultCategory} onChange={(e) => setDefaultCategory(e.target.value)}>
            <option value="Groceries">Groceries</option>
            <option value="Personal">Personal</option>
            <option value="Utilities">Utilities</option>
          </select>
        </label>
        <label>
          Budget Start Day of Month
          <select value={startDay} onChange={(e) => setStartDay(e.target.value)}>
            {Array.from({ length: 31 }, (_, i) => (
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
          </select>
        </label>
        <label>
          Date Format
          <select value={dateFormat} onChange={(e) => setDateFormat(e.target.value)}>
            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
          </select>
        </label>
      </section>

      {/* 4. Notifications */}
      <section className="settings-section">
        <h3>Notification Settings</h3>
        <label>
          <input
            type="checkbox"
            checked={notifications.overBudget}
            onChange={() =>
              setNotifications((prev) => ({
                ...prev,
                overBudget: !prev.overBudget,
              }))
            }
          />
          Show warning when nearing budget limit
        </label>
        <label>
          <input
            type="checkbox"
            checked={notifications.monthlySummary}
            onChange={() =>
              setNotifications((prev) => ({
                ...prev,
                monthlySummary: !prev.monthlySummary,
              }))
            }
          />
          Receive monthly budget summaries
        </label>
      </section>

      {/* 5. Recurring Transactions */}
      <section className="settings-section">
        <h3>Recurring Transactions</h3>
        <label>
          <input
            type="checkbox"
            checked={recurringEnabled}
            onChange={() => setRecurringEnabled(!recurringEnabled)}
          />
          Enable recurring transactions
        </label>
        <label>
          Frequency
          <select
            value={recurringFrequency}
            onChange={(e) => setRecurringFrequency(e.target.value)}
          >
            <option value="Weekly">Weekly</option>
            <option value="Biweekly">Biweekly</option>
            <option value="Monthly">Monthly</option>
          </select>
        </label>
      </section>

      {/* 6. Data & Privacy */}
      <section className="settings-section">
        <h3>Data & Privacy</h3>
        <button className="export-btn">Export Data (CSV)</button>
        <button className="clear-data-btn">Clear All Budget & Expense Data</button>
      </section>

      {/* 7. Account Management */}
      <section className="settings-section danger-zone">
        <h3>Account Management</h3>
        <button className="delete-account-btn">Delete My Account</button>
        <button className="logout-btn">Log Out</button>
      </section>
    </div>
  );
}

export default Settings;
