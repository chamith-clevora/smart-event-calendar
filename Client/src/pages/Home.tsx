import { useEffect, useState } from 'react';
import FeatureShowcase from "../components/FeatureShowcase";
import Introduction from "../components/Introduction";
import LoginModal from "../components/LoginModal";
import SignupModal from "../components/SignupModal";
import EventFeed from "../components/EventFeed";
import AboutModal from "../components/AboutModal";
import ForgotPasswordModal from '../components/ForgotPasswordModal';
import WeekOverview from "../components/WeekOverview";

interface EventItem {
  id?: string;
  title: string;
  date: string;
}

const Home: React.FC = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [notifications, setNotifications] = useState<EventItem[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showAbout, setShowAbout] = useState(false);
 
   
  //showing quote in this section 
  const quotes = [
  {
    text: "The key is not to prioritize what's on your schedule, but to schedule your priorities.",
    author: "Stephen Covey",
  },
  {
    text: "Success is the sum of small efforts, repeated day-in and day-out.",
    author: "Robert Collier",
  },
  {
    text: "The best way to get started is to quit talking and begin doing.",
    author: "Walt Disney",
  },
];

const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

 useEffect(() => {
  const interval = setInterval(() => {
    setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
  }, 30000); 

  return () => clearInterval(interval);
 }, []);


  // Check login status from localStorage
 useEffect(() => {
  const user = localStorage.getItem("clevoraUser");
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  if (isLoggedIn && user) {
    setIsLoggedIn(true);
  } else {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("clevoraUser");
  }
}, []);


  // Live ticking clock
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);


  // Fetch notifications (today + tomorrow events)
  useEffect(() => {
    if (!isLoggedIn) return;

    const fetchNotificationEvents = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/events");
        const data = await res.json();

        const today = new Date().toISOString().split("T")[0];
        const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];

        const filtered = data.filter((e: any) => {
          const eventDate = e.date.split("T")[0];
          return eventDate === today || eventDate === tomorrow;
        });

        setNotifications(filtered);
      } catch (err) {
        console.error("Failed to fetch notifications", err);
      }
    };

    fetchNotificationEvents();
    }, [isLoggedIn]);

  

            // return section in first line background 
   return (
    <section className="fixed top-0 left-0 w-screen h-screen bg-[url('/bg-2.jpg')] bg-cover bg-center overflow-hidden flex flex-col md:flex-row items-center justify-between px-8 text-white">

      {/* Birds Animation */}
      <img
        src="/birds.gif"
        alt="Flying Birds"
        className="absolute top-32 right-14 w-56 h-auto opacity-80 pointer-events-none z-10"
      />

      {/* Shooting Star */}
      <div className="absolute w-2 h-1 bg-white rounded-full animate-shooting-star top-10 left-10 z-10" />

      {/* 🔔 Notifications */}
      {isLoggedIn && notifications.length > 0 && (
        <div className="absolute top-[45%] right-[67%] bg-gradient-to-br from-orange-400/40 to-purple-600/40 backdrop-blur-lg text-white-900 p-4 rounded-lg z-50 shadow-xl w-[25%] ">
          <h3 className="font-bold text-md mb-2">Event Reminder</h3>
          <ul className="space-y-1 text-sm">
            {notifications.map((e) => {
              const label =
                e.date === new Date().toISOString().split("T")[0]
                  ? "📅 Today:"
                  : "⏰ Tomorrow:";
              return (
                <li key={e.id}>
                  {label} <strong>{e.title}</strong>
                </li>
              );
            })}
          </ul>
           
            {/* showing Quote */}
           
          <div className="mt-4 p-3 rounded-lg bg-black/30 text-sm text-white/80 transition-opacity duration-500 ease-in-out">
            <p className="italic">“{quotes[currentQuoteIndex].text}”</p>
            <p className="mt-2 text-right text-yellow-300 text-xs">— {quotes[currentQuoteIndex].author}</p>
          </div>      

        </div>
      )}     
             
        {/* contact me  */}
           {isLoggedIn && (
         <div className="absolute top-[72.5%] right-[65%] ml-[6%] mt-4 p-3 rounded-lg bg-black/30 text-sm text-white/80 transition-opacity duration-500 ease-in-out">
       <p className="italic">
        🚧 This project is currently under active development. While it’s functional, there’s still plenty of room for enhancement and refinement.
         </p>
        <p className="mt-2">
         If you'd like to use or contribute to this project, please reach out to me at 
         <a href="mailto:chamithnmaduranga45@gmail.com" className="text-yellow-300 underline ml-1">
         chamithnmaduranga45@gmail.com
        </a>.
         </p>
       </div> )}



               {/* week Overview */}

      {isLoggedIn && (
        <div className="absolute top-[23.7%] right-[35%] bg-gradient-to-br from-orange-400/40 to-purple-600/40 backdrop-blur-lg text-white-900 p-4 rounded-lg z-50 shadow-xl w-[25%] ">
        <h4 className="text-lg font-semibold text-yellow-400 mb-3">📅 Week Overview</h4>
        <WeekOverview />
     </div>
      )}

            {/* Left Side Content - features */}

      <div className="w-full md:w-1/2 md:pt-0 md:ml-20 z-20">
        {!isLoggedIn ? (
          <FeatureShowcase />
        ) : 
        
              
        (    // clok - showing time 

          <div className="absolute top-[27%] flex-col items-start justify-center h-full pl-6">
            <h1 className="text-7xl font-extrabold text-black-50 mb-2 tracking-wide">
              {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </h1>
            <p className="text-3xl text-white/80">
              {currentTime.toLocaleDateString(undefined, {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        )}
      </div>

      {/* Right Side Content - intro */}

      <div className="absolute w-full top-[21%] left-[48%] md:w-1/2 flex justify-center pt-10 md:pt-0 z-20">
        {!isLoggedIn ? (
          <Introduction
            onLoginClick={() => setShowLogin(true)}
            onSignupClick={() => setShowSignup(true)}
            
          />
        ) : (
          <div className="hidden md:block w-[80%] min-h-[300px]" />
        )}
      </div>

      {/* Event Feed Overlay */}
      {isLoggedIn && (
        <div className="absolute top-[18%] right-[15%] p-4 rounded-lg z-50 shadow-xl w-[16%]">
          <EventFeed />
        </div>
      )}


      {/* Footer */}
      <div className="absolute bottom-0 w-full text-white text-center py-3 text-sm z-30">
        © 2025 <span className="font-semibold text-yellow-400">Clevora</span>. All content, features, and rights associated with this platform are the exclusive property of Clevora. Unauthorized use or reproduction is strictly prohibited. &nbsp;
        <a
          href="#"
           onClick={() => setShowAbout(true)}
           className="text-purple-300 hover:text-yellow-400 underline font-medium"
         >
           About Clevora
        </a>
      </div>


       {/* Login Modal */}
       {showLogin && (
        <LoginModal
         isOpen={showLogin}
         onClose={() => setShowLogin(false)}
         onSwitch={(target) => {
         setShowLogin(false);
           if (target === "signup") setShowSignup(true);
           if (target === "forgot") setShowForgot(true); 
           
      }}
      />
      )}

          {showSignup && (
            <SignupModal
             isOpen={showSignup}
             onClose={() => setShowSignup(false)}
             onSwitch={(target) => {
             if (target === "Login") {
             setShowSignup(false);
             setShowLogin(true);  // 👈 make sure this line is present!
           }
          }}
            />
         )}


       {/* showing modals  */}
      {showForgot && (
        <ForgotPasswordModal isOpen={showForgot} onClose={() => setShowForgot(false)} />
       )}

        <AboutModal isOpen={showAbout} onClose={() => setShowAbout(false)} />
        
    </section>
  );
};

export default Home;
