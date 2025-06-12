import { useState, useMemo } from 'react';
import './BudgetDashboard.css';
import BudgetPieChart from '../components/BudgetPieChart';

const colorClasses = ['red', 'orange', 'blue', 'green', 'purple', 'teal', 'pink'];

function getCategoryColorMap(budgets) {
  const map = {};
  let colorIndex = 0;

  budgets.forEach((budget) => {
    if (!map[budget.name]) {
      map[budget.name] = colorClasses[colorIndex % colorClasses.length];
      colorIndex++;
    }
  });

  return map;
}

function getCategoryColorHexMap() {
  return {
    red: '#e53935',
    orange: '#fb8c00',
    blue: '#42a5f5',
    green: '#4caf50',
    purple: '#8e24aa',
    teal: '#26a69a',
    pink: '#ec407a',
  };
}

export default function BudgetDashboard() {
  const [budgetName, setBudgetName] = useState('');
  const [budgetAmount, setBudgetAmount] = useState('');
  const [expenseName, setExpenseName] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseCategory, setExpenseCategory] = useState('');
  const [filter, setFilter] = useState('All');

  const [budgets, setBudgets] = useState([
    { name: 'Groceries', amount: 1200, spent: 63.92 },
    { name: 'Personal', amount: 140, spent: 65.23 },
  ]);

  const [expenses, setExpenses] = useState([]);

  const categoryColorMap = useMemo(() => getCategoryColorMap(budgets), [budgets]);
  const categoryColorHexMap = useMemo(() => getCategoryColorHexMap(), []);

  // Add color hex to budgets for chart
  const budgetsWithColor = budgets.map((budget) => ({
    ...budget,
    color: categoryColorHexMap[categoryColorMap[budget.name]] || '#000000',
  }));

  const handleCreateBudget = (e) => {
    e.preventDefault();
    setBudgets([
      ...budgets,
      { name: budgetName, amount: parseFloat(budgetAmount), spent: 0 },
    ]);
    setBudgetName('');
    setBudgetAmount('');
  };

  const handleEditBudget = (index) => {
    const newName = prompt('Enter new budget name:', budgets[index].name);
    const newAmount = prompt('Enter new budget amount:', budgets[index].amount);

    if (newName && newAmount) {
      const updatedBudgets = [...budgets];
      updatedBudgets[index] = { ...updatedBudgets[index], name: newName, amount: parseFloat(newAmount) };
      setBudgets(updatedBudgets);
    }
  };

  const handleDeleteBudget = (index) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this budget?');
    if (confirmDelete) {
      const updatedBudgets = budgets.filter((_, idx) => idx !== index);
      setBudgets(updatedBudgets);
    }
  };

  const handleAddExpense = (e) => {
    e.preventDefault();

    const updatedBudgets = budgets.map((budget) => {
      if (budget.name === expenseCategory) {
        return {
          ...budget,
          spent: budget.spent + parseFloat(expenseAmount),
        };
      }
      return budget;
    });

    const newExpense = {
      name: expenseName,
      amount: parseFloat(expenseAmount),
      category: expenseCategory,
      date: new Date().toLocaleString(),
    };

    setBudgets(updatedBudgets);
    setExpenses([newExpense, ...expenses]);
    setExpenseName('');
    setExpenseAmount('');
    setExpenseCategory('');
  };

  const handleEditExpense = (index) => {
    const newName = prompt('Enter new expense name:', expenses[index].name);
    const newAmount = prompt('Enter new expense amount:', expenses[index].amount);
    const newCategory = prompt('Enter new expense category:', expenses[index].category);

    if (newName && newAmount && newCategory) {
      const updatedExpenses = [...expenses];
      updatedExpenses[index] = {
        ...updatedExpenses[index],
        name: newName,
        amount: parseFloat(newAmount),
        category: newCategory,
      };
      setExpenses(updatedExpenses);
    }
  };

  const handleDeleteExpense = (index) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this expense?');
    if (confirmDelete) {
      const updatedExpenses = expenses.filter((_, idx) => idx !== index);
      setExpenses(updatedExpenses);
    }
  };

  const isWithinFilter = (dateStr) => {
    const expenseDate = new Date(dateStr);
    const now = new Date();

    if (filter === 'Today') {
      return expenseDate.toDateString() === now.toDateString();
    }

    if (filter === 'This Week') {
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - now.getDay());
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);

      return expenseDate >= startOfWeek && expenseDate <= endOfWeek;
    }

    if (filter === 'This Month') {
      return (
        expenseDate.getMonth() === now.getMonth() &&
        expenseDate.getFullYear() === now.getFullYear()
      );
    }

    return true;
  };

  return (
    <div className="dashboard-container">
      <h1 className="welcome-banner">Welcome to your Budget Dashboard!</h1>

      <div className="forms">
        <div className="form-card">
          <h3>Create Budget</h3>
          <form onSubmit={handleCreateBudget}>
            <input
              type="text"
              placeholder="Budget Name"
              value={budgetName}
              onChange={(e) => setBudgetName(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Amount"
              value={budgetAmount}
              onChange={(e) => setBudgetAmount(e.target.value)}
              required
            />
            <button type="submit">Create Budget</button>
          </form>
        </div>

        <div className="form-card">
          <h3>Add New Expense</h3>
          <form onSubmit={handleAddExpense}>
            <input
              type="text"
              placeholder="Expense Name"
              value={expenseName}
              onChange={(e) => setExpenseName(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Amount"
              value={expenseAmount}
              onChange={(e) => setExpenseAmount(e.target.value)}
              required
            />
            <select
              value={expenseCategory}
              onChange={(e) => setExpenseCategory(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              {budgets.map((b, idx) => (
                <option key={idx} value={b.name}>
                  {b.name}
                </option>
              ))}
            </select>
            <button type="submit">Add Expense</button>
          </form>
        </div>
      </div>

      <h2>Existing Budgets</h2>
      <div className="budgets-grid">
        {budgetsWithColor.map((budget, idx) => {
          const color = categoryColorMap[budget.name] || '';
          const progressPercent = Math.min(
            (budget.spent / budget.amount) * 100,
            100
          );
          const remaining = budget.amount - budget.spent;
          const isOverSpent = budget.spent > budget.amount;

          return (
            <div className={`budget-card ${color}`} key={idx}>
              <h3>{budget.name}</h3>
              <p>${budget.amount.toFixed(2)} Budgeted</p>
              <div className="progress-bar">
                <span
                  className={`progress-fill ${color}`}
                  style={{ width: `${progressPercent}%` }}
                ></span>
              </div>
              <div className="budget-details">
                <span>${budget.spent.toFixed(2)} spent</span>
                <span>${remaining.toFixed(2)} remaining</span>
              </div>

              {isOverSpent && (
                <div
                  className={`view-details ${color}`}
                  style={{
                    color: '#e74c3c',
                    backgroundColor: '#f8d7da',
                    padding: '0.5rem',
                    borderRadius: '4px',
                    marginTop: '1rem',
                  }}
                >
                  <strong>Warning!</strong> You have exceeded your budget for this category.
                </div>
              )}

              <button
                onClick={() => handleEditBudget(idx)}
                className={`view-details ${color}`}
                style={{ marginRight: '0.5rem' }}
              >
                ✏️ Edit Budget
              </button>
              <button onClick={() => handleDeleteBudget(idx)} className="view-details red">
                🗑 Delete Budget
              </button>
            </div>
          );
        })}
      </div>

      <BudgetPieChart budgets={budgetsWithColor} />

      <div style={{ margin: '1rem 0' }}>
        <label htmlFor="filter">Filter by Date: </label>
        <select id="filter" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="Today">Today</option>
          <option value="This Week">This Week</option>
          <option value="This Month">This Month</option>
        </select>
      </div>

      <h2>Recent Expenses</h2>
      <div className="recent-expenses">
        {expenses.filter((e) => isWithinFilter(e.date)).map((exp, idx) => (
          <div key={idx} className="expense-item">
            <strong>{exp.name}</strong> - ${exp.amount.toFixed(2)} ({exp.category})
            <div style={{ fontSize: '0.85rem', color: '#999' }}>{exp.date}</div>

            <button
              onClick={() => handleEditExpense(idx)}
              style={{
                marginLeft: '10px',
                backgroundColor: '#f39c12',
                color: 'white',
                padding: '0.2rem 0.6rem',
                borderRadius: '4px',
              }}
            >
              ✏️ Edit
            </button>
            <button
              onClick={() => handleDeleteExpense(idx)}
              style={{
                marginLeft: '10px',
                backgroundColor: '#e74c3c',
                color: 'white',
                padding: '0.2rem 0.6rem',
                borderRadius: '4px',
              }}
            >
              🗑 Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}