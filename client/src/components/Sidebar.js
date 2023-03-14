import { useState } from "react";
import { FiUser, FiUsers, FiUserCheck } from "react-icons/fi";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        className="fixed z-10 bottom-4 right-4 p-3 rounded-full bg-blue-500 text-white shadow-md hover:bg-blue-600 focus:outline-none"
        onClick={toggleSidebar}
      >
        {isOpen ? <FiUserCheck /> : <FiUsers />}
      </button>
      <aside
        className={`fixed z-10 top-0 right-0 w-64 h-full bg-white shadow-lg transition-all duration-300 transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 text-lg font-medium">Menu</div>
        <ul className="py-2">
          <li className="flex items-center p-2 space-x-2 text-gray-600 hover:bg-gray-100">
            <FiUser className="w-6 h-6" />
            <span>Students</span>
          </li>
          <li className="flex items-center p-2 space-x-2 text-gray-600 hover:bg-gray-100">
            <FiUser className="w-6 h-6" />
            <span>Teachers</span>
          </li>
          <li className="flex items-center p-2 space-x-2 text-gray-600 hover:bg-gray-100">
            <FiUser className="w-6 h-6" />
            <span>Parents</span>
          </li>
        </ul>
      </aside>
    </>
  );
}

export default Sidebar;
