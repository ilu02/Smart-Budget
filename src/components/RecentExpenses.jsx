function RecentExpenses({ expenses }) {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold">Recent Expenses</h2>
      {expenses.length === 0 ? (
        <p className="text-gray-500 italic mt-2">No expenses yet.</p>
      ) : (
        <ul className="mt-2 space-y-2">
          {expenses.map((expense) => (
            <li
              key={expense.id}
              className="border rounded p-2 flex justify-between bg-white shadow-sm"
            >
              <span>{expense.name}</span>
              <span className="font-semibold">${expense.amount.toFixed(2)}</span>
              <span className="italic text-gray-500">{expense.budgetName}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default RecentExpenses;
