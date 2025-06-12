import { FaHome, FaCog } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <aside className="sidebar">
      <ul className="sidebar-nav">
        <li>
          <Link to="/dashboard">
            <FaHome /> Dashboard
          </Link>
        </li>
        <li>
          <Link to="/settings">
            <FaCog /> Settings
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
