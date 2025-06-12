import { useState } from "react";
import { FaPlus } from "react-icons/fa";

function ExpenseForm({ budgets, onAddExpense }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [budgetName, setBudgetName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !amount || !budgetName) return;
    onAddExpense(name, amount, budgetName);
    setName("");
    setAmount("");
    setBudgetName("");
  };

  return (
    <div className="border-2 border-dotted rounded p-4 shadow-sm">
      <h3 className="text-xl font-semibold mb-4">Add New Expense</h3>
      <form className="space-y-3" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Expense Name"
          className="w-full p-2 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          className="w-full p-2 border rounded"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <select
          className="w-full p-2 border rounded"
          value={budgetName}
          onChange={(e) => setBudgetName(e.target.value)}
        >
          <option value="">Select Budget</option>
          {budgets.map((b, i) => (
            <option key={i} value={b.name}>
              {b.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900"
        >
          <FaPlus />
          Add Expense
        </button>
      </form>
    </div>
  );
}

export default ExpenseForm;
