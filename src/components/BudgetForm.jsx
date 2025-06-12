import { useState } from "react";
import { FaPlus } from "react-icons/fa";

function BudgetForm({ onAddBudget }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !amount) return;
    onAddBudget(name, amount);
    setName("");
    setAmount("");
  };

  return (
    <div className="border-2 border-dotted rounded p-4 shadow-sm">
      <h3 className="text-xl font-semibold mb-4">Create Budget</h3>
      <form className="space-y-3" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Budget Name"
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
        <button
          type="submit"
          className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900"
        >
          <FaPlus />
          Create Budget
        </button>
      </form>
    </div>
  );
}

export default BudgetForm;
