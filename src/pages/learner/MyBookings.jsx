import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { bookings } from "../../data/bookings";

const CANCELLED_KEY = "anamil-cancelled-bookings";

const statusStyles = {
  Pending: "bg-gold/30 text-ink",
  Confirmed: "bg-green-100 text-green-700",
  Completed: "bg-blush text-clay",
  Cancelled: "bg-red-100 text-red-700",
  Declined: "bg-cream text-muted",
};

function getCancelledIds() {
  try {
    const saved = JSON.parse(localStorage.getItem(CANCELLED_KEY) || "[]");
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

// Turns "5:00 - 7:00 PM" + date into a real Date for the lesson start
function getLessonStart(booking) {
  const parts = booking.time.split("-");
  const startTime = parts[0].trim();
  const endTime = parts[1]?.trim() || "";
  const period = endTime.match(/(AM|PM)$/i)?.[1];
  const match = startTime.match(/^(\d{1,2}):(\d{2})(?:\s*(AM|PM))?$/i);
  if (!match) return null;

  let hours = Number(match[1]);
  const minutes = Number(match[2]);
  const startPeriod = match[3] || period;
  if (!startPeriod) return null;

  if (startPeriod.toUpperCase() === "PM" && hours !== 12) hours += 12;
  if (startPeriod.toUpperCase() === "AM" && hours === 12) hours = 0;

  const date = new Date(`${booking.date}T00:00:00`);
  if (Number.isNaN(date.getTime())) return null;
  date.setHours(hours, minutes, 0, 0);
  return date;
}

function MyBookings() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("upcoming");
  const [cancelledIds] = useState(getCancelledIds);
  const [cancelErrorId, setCancelErrorId] = useState(null);

  const allBookings = bookings.map((booking) => ({
    ...booking,
    status: cancelledIds.includes(booking.id) ? "Cancelled" : booking.status,
  }));

  const isUpcoming = (booking) => {
    const lessonStart = getLessonStart(booking);
    return (
      ["Pending", "Confirmed"].includes(booking.status) &&
      lessonStart !== null &&
      lessonStart.getTime() > Date.now()
    );
  };

  const upcomingBookings = allBookings.filter(isUpcoming);
  const pastBookings = allBookings.filter((booking) => !isUpcoming(booking));
  const visibleBookings = activeTab === "upcoming" ? upcomingBookings : pastBookings;

  const formatDate = (date) =>
    new Date(`${date}T12:00:00`).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

  const handleCancelClick = (booking) => {
    setCancelErrorId(null);
    const lessonStart = getLessonStart(booking);
    const hoursRemaining = lessonStart ? (lessonStart.getTime() - Date.now()) / (1000 * 60 * 60) : -1;

    if (!booking.canCancel || !["Pending", "Confirmed"].includes(booking.status) || hoursRemaining <= 24) {
      setCancelErrorId(booking.id);
      return;
    }
    navigate(`/my-bookings/${booking.id}/cancel`);
  };

  const tabs = [
    { id: "upcoming", label: "Upcoming", count: upcomingBookings.length },
    { id: "past", label: "Past", count: pastBookings.length },
  ];

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-cream px-6 py-10">
        <div className="mx-auto max-w-5xl">
          <h1 className="mb-6 font-serif text-4xl italic text-ink">My bookings</h1>

          {/* Tabs */}
          <div className="mb-6 flex gap-6 border-b border-blush">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActiveTab(tab.id);
                  setCancelErrorId(null);
                }}
                className={`-mb-px border-b-2 pb-3 text-sm font-medium ${
                  activeTab === tab.id ? "border-clay text-clay" : "border-transparent text-muted hover:text-ink"
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>

          {/* List */}
          <div className="space-y-4">
            {visibleBookings.length === 0 ? (
              <div className="rounded-3xl bg-white p-10 text-center">
                <p className="text-muted">No bookings here yet.</p>
                <Link to="/browse" className="mt-4 inline-block rounded-full bg-clay px-6 py-3 text-sm font-medium text-white">
                  Find a teacher
                </Link>
              </div>
            ) : (
              visibleBookings.map((booking) => (
                <article key={booking.id} className="rounded-3xl bg-white p-5">
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex-1">
                      <h2 className="text-lg font-medium text-ink">{booking.lesson}</h2>
                      <p className="mt-1 text-sm text-muted">
                        {booking.craftsperson} · {formatDate(booking.date)} · {booking.time}
                      </p>
                      <p className="mt-1 text-sm text-muted">{booking.location}</p>

                      {cancelErrorId === booking.id && (
                        <p role="alert" className="mt-2 text-sm font-medium text-red-600">
                          Bookings can't be cancelled within 24 hours of the lesson.
                        </p>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyles[booking.status] || statusStyles.Pending}`}>
                        {booking.status}
                      </span>

                      <Link
                        to={`/my-bookings/${booking.id}`}
                        className="rounded-full border border-ink px-4 py-2 text-sm text-ink hover:bg-cream"
                      >
                        View details
                      </Link>

                      {isUpcoming(booking) && (
                        <button
                          type="button"
                          onClick={() => handleCancelClick(booking)}
                          className="rounded-full px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                        >
                          Cancel
                        </button>
                      )}

                      {booking.status === "Completed" && (
                        <Link
                          to={`/my-bookings/${booking.id}/review`}
                          className="rounded-full bg-clay px-4 py-2 text-sm font-medium text-white hover:opacity-90"
                        >
                          Write a review
                        </Link>
                      )}
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default MyBookings;