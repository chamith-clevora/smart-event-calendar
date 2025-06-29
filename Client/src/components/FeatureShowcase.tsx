import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const features = [
  {
    name: "Event Calendar",
    icon: "/icons/event.png",
    description: "Easily view and manage upcoming events. Plan your schedule with a clean, visual calendar layout."
  },
  {
    name: "Task Management",
    icon: "/icons/checklist.png",
    description: "Organize tasks with deadlines and priorities. Stay productive with intuitive task tracking."
  },
  {
    name: "Reminders",
    icon: "/icons/notification.png",
    description: "Never forget an event with smart reminders. Customize alerts to fit your needs."
  },
  {
    name: "Team Collaboration",
    icon: "/icons/team.png",
    description: "Work together in real-time. Share events and tasks with your entire team effortlessly."
  },
  {
    name: "Secure Login",
    icon: "/icons/security.png",
    description: "Protect your data with secure login and encryption. Your privacy is our priority."
  }
];


const FeatureShowcase: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % features.length);
    }, 4000); // every 4 seconds
    return () => clearInterval(interval);
  }, []);

  const { name, icon, description } = features[index];

  return (
    <div className="relative w-full max-w-2xl pl-[10%]"> {/* Moved right */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="flex flex-col items-center text-center"
        >
          <img src={icon} alt={name} className="w-[50%] h-[50%] mb-4 drop-shadow-x2" />
          <h3 className="text-2xl font-bold text-white mb-2">{name}</h3>
          <p className="text-white/80 text-md px-4">{description}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default FeatureShowcase;
