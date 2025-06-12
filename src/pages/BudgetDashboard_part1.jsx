import { useState } from 'react';

export default function BudgetDashboard() {
  // State for Create Budget form
  const [budgetName, setBudgetName] = useState('');
  const [budgetAmount, setBudgetAmount] = useState('');

  // State for Add Expense form
  const [expenseName, setExpenseName] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseCategory, setExpenseCategory] = useState('');

  // Sample data (hardcoded for now)
  const [budgets, setBudgets] = useState([
    { name: 'Groceries', amount: 1200, spent: 63.92 },
    { name: 'Personal', amount: 140, spent: 65.23 },
  ]);

  // State for recent expenses
  const [expenses, setExpenses] = useState([]);

  // Handle budget creation
  const handleCreateBudget = (e) => {
    e.preventDefault();
    setBudgets([
      ...budgets,
      { name: budgetName, amount: parseFloat(budgetAmount), spent: 0 },
    ]);
    setBudgetName('');
    setBudgetAmount('');
  };

  // Updated handleAddExpense function
  const handleAddExpense = (e) => {
    e.preventDefault();

    // Update the budget
    const updatedBudgets = budgets.map((budget) => {
      if (budget.name === expenseCategory) {
        return {
          ...budget,
          spent: budget.spent + parseFloat(expenseAmount),
        };
      }
      return budget;
    });

    // Add new expense to expense list
    const newExpense = {
      name: expenseName,
      amount: parseFloat(expenseAmount),
      category: expenseCategory,
      date: new Date().toLocaleString(),
    };

    setBudgets(updatedBudgets);
    setExpenses([newExpense, ...expenses]); // Add to the top of the list
    setExpenseName('');
    setExpenseAmount('');
    setExpenseCategory('');
  };
