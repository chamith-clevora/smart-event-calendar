import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import CalendarModal from "../components/CalendarModal";
import toast from 'react-hot-toast';


const Navbar: React.FC = () => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const status = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(status);
  }, []);

  const handleCalendarClick = () => {
    if (!isLoggedIn) {
      toast.error("Please login to access the calendar.");
      return;
    }
    setIsCalendarOpen(true);
  };

  const handleEventsClick = () => {
    if (!isLoggedIn) {
       toast.error("Please login to view events.");
      return;
    }
    toast.error("This feature is available in the Pro version. Upgrade to unlock event history and collaboration.");
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("clevoraUser");
    setIsLoggedIn(false);
    toast.error("You have been logged out.");
    navigate("/");
    window.location.reload(); 
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 py-6">
      <div className="max-w-7xl mx-auto flex justify-center space-x-[13%] mt-3 items-center">
        <img
          src="/logo.png"
          alt="Logo"
          className="absolute top-[-25%] left-2 h-[190px] w-auto object-contain"
        />

        <Link
          to="/"
          className="inline-block px-6 py-3 text-lg rounded-xl border border-white/20 text-white transition-all duration-300 hover:text-yellow-400 hover:border-yellow-400 hover:shadow-yellow-400 hover:shadow-md"
        >
          Home
        </Link>

        <button
          onClick={handleCalendarClick}
          className="bg-transparent inline-block px-6 py-3 text-lg rounded-xl border border-white/20 text-white transition-all duration-300 hover:text-yellow-400 hover:border-yellow-400 hover:shadow-yellow-400 hover:shadow-md"
        >
          Calendar
        </button>

        <button
          onClick={handleEventsClick}
          className="bg-transparent inline-block px-6 py-3 text-lg rounded-xl border border-white/20 text-white transition-all duration-300 hover:text-yellow-400 hover:border-yellow-400 hover:shadow-yellow-400 hover:shadow-md"
        >
          Events
        </button>

        {isLoggedIn && (
          <button
            onClick={handleLogout}
            className="inline-block px-6 py-3 text-lg rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold transition-all"
          >
            Logout
          </button>
        )}
      </div>
        
      <CalendarModal
      isOpen={isCalendarOpen}
      onClose={() => {
      setIsCalendarOpen(false);
      window.location.reload();
       }}
    />
    </nav>
  );
};

export default Navbar;
