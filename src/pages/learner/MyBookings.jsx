
import { useState } from "react";
import { bookings } from "../../data/bookings";

const CANCELLED_KEY = "anamil-cancelled-bookings";

const statusStyles = {
  Pending: "bg-yellow-100 text-yellow-800",
  Confirmed: "bg-gray-200 text-gray-800",
  Completed: "bg-gray-200 text-gray-800",
  Cancelled: "bg-red-100 text-red-700",
  Declined: "bg-gray-200 text-gray-700"
};

function getCancelledIds() {
  try {
    const saved = JSON.parse(
      localStorage.getItem(CANCELLED_KEY) || "[]"
    );
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}


function getLessonStart(booking) {
  const parts = booking.time.split("-");
  const startTime = parts[0].trim();
  const endTime = parts[1]?.trim() || "";

  const periodMatch = endTime.match(/(AM|PM)$/i);
  const period = periodMatch?.[1];

  const match = startTime.match(
    /^(\d{1,2}):(\d{2})(?:\s*(AM|PM))?$/i
  );

  if (!match) return null;

  let hours = Number(match[1]);
  const minutes = Number(match[2]);
  const startPeriod = match[3] || period;

  if (!startPeriod) return null;

  if (startPeriod.toUpperCase() === "PM" && hours !== 12) {
    hours += 12;
  }

  if (startPeriod.toUpperCase() === "AM" && hours === 12) {
    hours = 0;
  }

  const date = new Date(`${booking.date}T00:00:00`);
  if (Number.isNaN(date.getTime())) return null;

  date.setHours(hours, minutes, 0, 0);

  return date;
}


function MyBookings() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [cancelledIds, setCancelledIds] = useState(
    getCancelledIds
  );
  const [cancelErrorId, setCancelErrorId] = useState(null);

  const allBookings = bookings.map((booking) => ({
    ...booking,
    status: cancelledIds.includes(booking.id)
      ? "Cancelled"
      : booking.status
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
  const pastBookings = allBookings.filter(
    (booking) => !isUpcoming(booking)
  );

  const visibleBookings =
    activeTab === "upcoming"
      ? upcomingBookings
      : pastBookings;

  const formatDate = (date) =>
    new Date(`${date}T12:00:00`).toLocaleDateString(
      "en-GB",
      {
        day: "numeric",
        month: "short",
        year: "numeric"
      }
    );

  const handleCancelClick = (booking) => {
    setCancelErrorId(null);

    const lessonStart = getLessonStart(booking);

    const hoursRemaining = lessonStart
      ? (lessonStart.getTime() - Date.now()) /
        (1000 * 60 * 60)
      : -1;

    if (
      !booking.canCancel ||
      !["Pending", "Confirmed"].includes(booking.status) ||
      hoursRemaining <= 24
    ) {
      setCancelErrorId(booking.id);
      return;
    }

    window.location.href =
      `/my-bookings/${booking.id}/cancel`;
  };

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-6 text-3xl font-bold">
          My bookings
        </h1>

        <div className="mb-6 flex gap-6 border-b">
          {[
            {
              id: "upcoming",
              label: "Upcoming",
              count: upcomingBookings.length
            },
            {
              id: "past",
              label: "Past",
              count: pastBookings.length
            }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                setActiveTab(tab.id);
                setCancelErrorId(null);
              }}
              className={`border-b-2 pb-3 text-sm font-medium ${
                activeTab === tab.id
                  ? "border-black text-black"
                  : "border-transparent text-gray-500"
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {visibleBookings.length === 0 ? (
            <div className="rounded-xl bg-white p-8 text-center text-gray-500">
              No bookings found.
            </div>
          ) : (
            visibleBookings.map((booking) => (
              <article
                key={booking.id}
                className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
              >
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold">
                      {booking.lesson}
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                      {booking.craftsperson} ·{" "}
                      {formatDate(booking.date)} ·{" "}
                      {booking.time}
                    </p>

                    {cancelErrorId === booking.id && (
                      <p
                        role="alert"
                        className="mt-2 text-sm font-medium text-red-600"
                      >
                        Bookings can't be cancelled within
                        24 hours of the lesson.
                      </p>
                    )}

                    <p className="mt-2 text-sm text-gray-500">
                      {booking.location}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        statusStyles[booking.status] ||
                        statusStyles.Pending
                      }`}
                    >
                      {booking.status}
                    </span>

                    <a
                      href={`/my-bookings/${booking.id}`}
                      className="rounded-lg border border-gray-300 px-4 py-2 text-sm"
                    >
                      View details
                    </a>

                    {isUpcoming(booking) && (
                      <button
                        type="button"
                        onClick={() => handleCancelClick(booking)}
                        className="rounded-lg border border-gray-400 px-4 py-2 text-sm font-medium hover:bg-gray-100"
                      >
                        Cancel
                      </button>
                    )}

                    {booking.status === "Completed" && (
                      <a
                        href={`/my-bookings/${booking.id}/review`}
                        className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white"
                      >
                        Write review
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </main>
  );
}

export default MyBookings;
