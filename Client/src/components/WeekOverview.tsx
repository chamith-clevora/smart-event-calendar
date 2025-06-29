import { useEffect, useState } from "react";

interface Holiday {
  date: string;
  localName: string;
}

const WeekOverview: React.FC = () => {
  const [weekDays, setWeekDays] = useState<{ date: string; day: string; holiday?: string }[]>([]);

  useEffect(() => {
    const today = new Date();
    const next7Days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      return {
        date: d.toISOString().split("T")[0],
        day: d.toLocaleDateString("en-US", { weekday: "long" }),
      };
    });

    fetch("https://date.nager.at/api/v3/PublicHolidays/2025/LK")
      .then((res) => res.json())
      .then((data: Holiday[]) => {
        const updatedDays = next7Days.map((day) => {
          const found = data.find((h) => h.date === day.date);
          return found ? { ...day, holiday: found.localName } : day;
        });
        setWeekDays(updatedDays);
      })
      .catch((err) => {
        console.error("Failed to fetch holidays", err);
        setWeekDays(next7Days); // fallback
      });
  }, []);

  return (
    <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-xl w-full max-w-xl text-white mt-4">
      <h2 className="text-lg font-semibold text-yellow-400 mb-3">📅 Week Overview & Holidays</h2>
      <ul className="space-y-2 text-sm">
        {weekDays.map((d) => (
          <li
            key={d.date}
            className="bg-gray-800 p-3 rounded border-l-4"
            style={{ borderColor: d.holiday ? "#facc15" : "#4b5563" }}
          >
            <span className="font-medium">{d.day}</span> – {d.date}
            {d.holiday && <span className="text-yellow-400 ml-2">🎉 {d.holiday}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WeekOverview;
