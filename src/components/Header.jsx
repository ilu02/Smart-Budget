import { FaTrash } from "react-icons/fa";

function Header() {
  return (
    <header className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold text-teal-600">🏠 HomeBudget</h1>
      <button className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
        <FaTrash />
        Delete User
      </button>
    </header>
  );
}

export default Header;
