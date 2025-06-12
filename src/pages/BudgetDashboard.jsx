// src/pages/BudgetDashboard.jsx
import React from 'react';
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import Settings from './Settings';
import './Dashboard.css';

function BudgetDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    navigate('/login');
  };

  // Sample data for demonstration
  const budgets = [
    { id: 1, name: "Groceries", amount: 500, spent: 320, color: "green" },
    { id: 2, name: "Entertainment", amount: 200, spent: 150, color: "blue" },
    { id: 3, name: "Transportation", amount: 150, spent: 90, color: "orange" },
  ];

  const expenses = [
    { id: 1, name: "Supermarket", amount: 85.50, category: "Groceries", date: "2023-05-15" },
    { id: 2, name: "Movie tickets", amount: 24.00, category: "Entertainment", date: "2023-05-14" },
    { id: 3, name: "Gas", amount: 45.75, category: "Transportation", date: "2023-05-13" },
  ];

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2 className="sidebar-logo">HomeBudget</h2>
        </div>
        <nav className="sidebar-nav">
          <NavLink to="/dashboard" end className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            <span className="nav-icon">📊</span>
            <span className="nav-text">Dashboard</span>
          </NavLink>
          <NavLink to="/dashboard/settings" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            <span className="nav-icon">⚙️</span>
            <span className="nav-text">Settings</span>
          </NavLink>
          <button className="logout-btn" onClick={handleLogout}>
            <span className="nav-icon">🚪</span>
            <span className="nav-text">Logout</span>
          </button>
        </nav>
      </aside>

      {/* Main content */}
      <main className="dashboard-content">
        {/* Welcome message */}
        <header className="dashboard-header">
          <div className="welcome-banner">
            <h1>
              Welcome back, <span className="highlight">Chris</span>
            </h1>
            <p className="subtitle">Here's your financial overview</p>
          </div>
          <div className="summary-cards">
            <div className="summary-card">
              <h3>Total Budget</h3>
              <p className="amount">$850.00</p>
            </div>
            <div className="summary-card">
              <h3>Total Spent</h3>
              <p className="amount">$560.50</p>
            </div>
            <div className="summary-card">
              <h3>Remaining</h3>
              <p className="amount positive">$289.50</p>
            </div>
          </div>
        </header>

        {/* Forms */}
        <section className="dashboard-section">
          <h2 className="section-title">Quick Actions</h2>
          <div className="dashboard-forms">
            <div className="form-card">
              <h3>Create Budget</h3>
              <div className="form-group">
                <input type="text" placeholder="Budget Name" />
              </div>
              <div className="form-group">
                <input type="number" placeholder="Amount" />
              </div>
              <button className="primary-btn">
                <span>➕</span> Create Budget
              </button>
            </div>

            <div className="form-card">
              <h3>Add New Expense</h3>
              <div className="form-group">
                <input type="text" placeholder="Expense Name" />
              </div>
              <div className="form-group">
                <input type="number" placeholder="Amount" />
              </div>
              <div className="form-group">
                <select>
                  <option>Select Category</option>
                  <option>Groceries</option>
                  <option>Entertainment</option>
                  <option>Transportation</option>
                  <option>Personal</option>
                </select>
              </div>
              <button className="primary-btn">
                <span>➕</span> Add Expense
              </button>
            </div>
          </div>
        </section>

        {/* Budgets */}
        <section className="dashboard-section">
          <div className="section-header">
            <h2 className="section-title">Your Budgets</h2>
            <button className="secondary-btn">View All</button>
          </div>
          <div className="budget-cards-grid">
            {budgets.map(budget => (
              <div key={budget.id} className={`budget-card ${budget.color}`}>
                <div className="budget-header">
                  <h3>{budget.name}</h3>
                  <p className="budget-amount">${budget.amount}</p>
                </div>
                <div className="progress-container">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ 
                        width: `${(budget.spent / budget.amount) * 100}%`,
                        backgroundColor: `var(--${budget.color}-color)`
                      }}
                    ></div>
                  </div>
                  <div className="progress-text">
                    <span>${budget.spent} spent</span>
                    <span>${budget.amount - budget.spent} left</span>
                  </div>
                </div>
                <button className="view-details">View Details</button>
              </div>
            ))}
          </div>
        </section>

        {/* Expenses */}
        <section className="dashboard-section">
          <div className="section-header">
            <h2 className="section-title">Recent Expenses</h2>
            <button className="secondary-btn">View All</button>
          </div>
          <div className="recent-expenses">
            <table className="expenses-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Amount</th>
                  <th>Category</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map(expense => (
                  <tr key={expense.id}>
                    <td>{expense.name}</td>
                    <td>${expense.amount.toFixed(2)}</td>
                    <td>
                      <span className={`category-tag ${expense.category.toLowerCase()}`}>
                        {expense.category}
                      </span>
                    </td>
                    <td>{expense.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Nested route for settings */}
        <Routes>
          <Route path="settings" element={<Settings />} />
        </Routes>
      </main>
    </div>
  );
}

export default BudgetDashboard;


