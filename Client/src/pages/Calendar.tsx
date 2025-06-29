import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import type { CalendarProps } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

interface EventItem {
  _id?: string;
  title: string;
  date: string;
}

export default function App() {
  const [date] = useState<Date>(new Date());
  const [events, setEvents] = useState<EventItem[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [eventName, setEventName] = useState('');
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/events");
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        console.error("Failed to fetch events", err);
      }
    };
    fetchEvents();
  }, []);

  const handleDateChange: CalendarProps['onChange'] = (value) => {
    const selected = value as Date;
    setSelectedDate(selected);
    const existing = events.find((e) => e.date === formatDate(selected));
    setEventName(existing ? existing.title : '');
    setEditingEventId(existing ? existing._id || null : null);
    setShowModal(true);
  };

  const formatDate = (date: Date) => date.toISOString().split('T')[0];


    // save 
  const handleSave = async () => {
    if (!eventName.trim()) return;
    try {
      const res = await fetch("http://localhost:5000/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: eventName, date: formatDate(selectedDate) }),
      });
      const saved = await res.json();
      setEvents((prev) => [...prev, saved]);
      setShowModal(false);  

    } catch (err) {
      console.error("Failed to save event", err);
    }
  };

   // Delete
  const handleDelete = async () => {
    if (!editingEventId) return;
    try {
      await fetch(`http://localhost:5000/api/events/${editingEventId}`, {
        method: "DELETE",
      });
      setEvents((prev) => prev.filter((e) => e._id !== editingEventId));
      setShowModal(false);

    } catch (err) {
      console.error("Failed to delete event", err);
    }
  };

   // Edit
  const handleEdit = async () => {
    if (!editingEventId || !eventName.trim()) return;
    try {
      const res = await fetch(`http://localhost:5000/api/events/${editingEventId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: eventName, date: formatDate(selectedDate) }),
      });
      const updated = await res.json();
      setEvents((prev) => prev.map((e) => (e._id === updated._id ? updated : e)));
      setShowModal(false);

    } catch (err) {
      console.error("Failed to edit event", err);
    }
  };

     {/* Calendar content with tailwind */}
  return (
    <div className="h-screen w-screen text-white flex overflow-hidden">
      <style>{`
        .react-calendar {
          background-color: #1f2937;
          color: #fff;
          border: none;
          border-radius: 1rem;
          padding: 2rem;
          width: 100%;
        }
        .react-calendar__navigation {
          margin-bottom: 1rem;
          justify-content: center;
        }
        .react-calendar__navigation button {
          font-size: 1.2rem;
          color: red;
        }
        .react-calendar__month-view__weekdays {
          font-size: 1rem;
          text-align: center;
          color: #9ca3af;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid #374151;
        }
        .react-calendar__month-view__days {
          display: grid !important;
          grid-template-columns: repeat(7, 1fr);
          gap: 0.75rem;
        }
        .react-calendar__tile {
          aspect-ratio: 1 / 1;
          padding: 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
          background-color: #111827;
          border-radius: 0.75rem;
          font-size: 1rem;
          font-weight: 500;
          border: 1px solid #1f2937;
          position: relative;
          overflow: hidden;
          transition: background 0.2s ease, box-shadow 0.2s ease;
        }
        .react-calendar__tile:hover {
          background-color: #059669;
          color: green;
          box-shadow: 0 0 5px #10b981;
        }
        .react-calendar__tile--now {
          background: #10b981;
          color: white;
        }
        .react-calendar__tile--active {
          background: #3b82f6;
          color: white;
        }
        .react-calendar__month-view__days__day--weekend {
          color: #f87171;
        }
        .event-title {
          position: absolute;
          bottom: 6px;
          left: 6px;
          right: 6px;
          font-size: 0.75rem;
          color: #a7f3d0;
          background-color: rgba(34, 197, 94, 0.2);
          padding: 3px 6px;
          border-radius: 0.4rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      `}</style>
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-5xl flex gap-8">
          <div className="w-[70%]">
            <h1 className="text-3xl font-bold text-center mb-6">Calendar</h1>
            <Calendar
              onClickDay={handleDateChange}
              value={date}
              className="react-calendar"
              tileClassName={({ date }) => {
                const hasEvent = events.some((e) => formatDate(date) === e.date);
                return hasEvent ? 'event-day' : null;
              }}
              tileContent={({ date }) => {
                const event = events.find((e) => formatDate(date) === e.date);
                return event ? <div className="event-title">{event.title}</div> : null;
              }}
            />
          </div>

                  {/* Event list content */}
          <div className="w-[35%] bg-gray-700 rounded-xl p-6 mt-[4%] overflow-y-auto h-[640px] shadow-inner">
            <h2 className="text-2xl font-semibold mb-4">Event List</h2>
            {events.length === 0 ? (
              <p className="text-gray-400 text-base">No events yet</p>
            ) : (
              events
                .sort((a, b) => a.date.localeCompare(b.date))
                .map((event, idx) => (
                  <div
                    key={idx}
                    className="mb-4 p-4 border-l-4 border-blue-500 bg-gray-800 rounded"
                  >
                    <div className="text-lg font-medium">{event.title}</div>
                    <div className="text-sm text-gray-400">{event.date}</div>
                  </div>
                ))
            )}
          </div>
        </div>
      </div>
             
             {/* modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 text-white p-6 rounded-xl shadow-2xl w-full max-w-sm">
            <h2 className="text-xl font-semibold mb-2">{editingEventId ? 'Edit Event' : 'Add Event'}</h2>
            <p className="text-sm text-gray-400 mb-4">{formatDate(selectedDate)}</p>
            <input
              type="text"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              className="w-full bg-gray-900 border border-gray-600 rounded px-3 py-2 mb-4 text-white"
              placeholder="Event Name"
            />
            <div className="flex justify-between">
              <button
                onClick={editingEventId ? handleEdit : handleSave}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                {editingEventId ? 'Update' : 'Save'}
              </button>
              {editingEventId && (
                <button
                  onClick={handleDelete}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              )}
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
