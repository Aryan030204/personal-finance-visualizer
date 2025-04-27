import { useState } from "react";
import { Link } from "react-router-dom";
import { Home, Plus, List, BarChart, Menu, X } from "lucide-react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-md p-4">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        {/* Logo or App Name */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          Finance Visualizer
        </Link>

        {/* Navbar Links for Desktop */}
        <div className="hidden md:flex gap-6 items-center">
          <Link to="/" className="flex items-center text-gray-700 hover:text-blue-600">
            <Home className="w-6 h-6 mr-2" /> Home
          </Link>
          <Link to="/add" className="flex items-center text-gray-700 hover:text-blue-600">
            <Plus className="w-6 h-6 mr-2" /> Create
          </Link>
          <Link to="/monthly-chart" className="flex items-center text-gray-700 hover:text-blue-600">
            <BarChart className="w-6 h-6 mr-2" /> Monthly Chart
          </Link>
        </div>

        {/* Mobile Menu Icon (Hamburger) */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-700 p-2 border rounded-md">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col gap-4 mt-4 bg-white p-4">
          <Link to="/" className="text-gray-700 hover:text-blue-600 flex items-center">
            <Home className="w-6 h-6 mr-2" /> Home
          </Link>
          <Link to="/add" className="text-gray-700 hover:text-blue-600 flex items-center">
            <Plus className="w-6 h-6 mr-2" /> Create
          </Link>
          <Link to="/monthly-chart" className="text-gray-700 hover:text-blue-600 flex items-center">
            <BarChart className="w-6 h-6 mr-2" /> Monthly Chart
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
