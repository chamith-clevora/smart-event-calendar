
import React, { useEffect, useState } from 'react';

interface EventItem {
  id?: string;
  title: string;
  date: string;
}
   // fetching section - events 

const EventFeed: React.FC = () => {
  const [events, setEvents] = useState<EventItem[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/events");
        const data = await res.json();
        if (res.ok) {
          const formatted = data.map((e: any) => ({
            id: e._id,
            title: e.title,
            date: e.date.split("T")[0],
          }));
          setEvents(formatted);
        }
      } catch (err) {
        console.error("Error fetching events", err);
      }
    };

    fetchEvents();
  }, []);

  if (events.length === 0) {
    return <p className="text-white/80">No upcoming events</p>;
  }

  return (
    <div className="bg-gray-900 bg-opacity-60 backdrop-blur-md p-6 rounded-xl shadow-xl w-[170%] mt-8">
      <h2 className="text-xl font-semibold text-yellow-400 mb-4">Upcoming Events</h2>
      <ul className="space-y-3">
        {events
          .sort((a, b) => a.date.localeCompare(b.date))
          .map((event) => (
            <li key={event.id} className="p-3 border-l-4 border-yellow-400 bg-gray-800 rounded">
              <div className="text-white font-semibold">{event.title}</div>
              <div className="text-sm text-gray-400">{event.date}</div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default EventFeed;
