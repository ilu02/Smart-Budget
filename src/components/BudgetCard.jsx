import { FaEye } from "react-icons/fa";

function BudgetCard({ title, themeColor, budgeted, spent }) {
  const remaining = (budgeted - spent).toFixed(2);
  const percentage = (spent / budgeted) * 100;

  const themeClass = {
    red: "bg-red-500",
    orange: "bg-orange-500",
  }[themeColor];

  return (
    <div className="rounded border p-4 shadow-sm space-y-3">
      <h4 className={`text-lg font-bold text-${themeColor}-600`}>{title}</h4>
      <p className="font-medium">${budgeted.toFixed(2)} Budgeted</p>
      <div className="w-full bg-gray-200 rounded h-4 overflow-hidden">
        <div
          className={`${themeClass} h-full`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="text-sm">
        <p>${spent.toFixed(2)} spent</p>
        <p>${remaining} remaining</p>
      </div>
      <button
        className={`mt-2 flex items-center gap-2 text-white px-3 py-1 rounded ${themeClass} hover:brightness-90`}
      >
        <FaEye />
        View Details
      </button>
    </div>
  );
}

export default BudgetCard;
