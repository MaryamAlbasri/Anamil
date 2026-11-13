
import { useState } from "react";
import { bookings } from "../../data/bookings";

const statusStyles = {
  Pending: "bg-yellow-100 text-yellow-800",
  Confirmed: "bg-green-100 text-green-800",
  Completed: "bg-gray-100 text-gray-700",
  Cancelled: "bg-red-100 text-red-700"
};

function MyBookings() {
  const [activeTab, setActiveTab] = useState("upcoming");

  const [cancelledIds] = useState(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("anamil-cancelled-bookings") || "[]"
      );
      return Array.isArray(saved) ? saved : [];
    } catch {
      return [];
    }
  });

  const allBookings = bookings.map((booking) => ({
    ...booking,
    status: cancelledIds.includes(booking.id)
      ? "Cancelled"
      : booking.status
  }));

  const isUpcoming = (booking) =>
    ["Pending", "Confirmed"].includes(booking.status);

  const visibleBookings = allBookings.filter((booking) =>
    activeTab === "upcoming"
      ? isUpcoming(booking)
      : !isUpcoming(booking)
  );

  const upcomingCount = allBookings.filter(isUpcoming).length;
  const pastCount = allBookings.length - upcomingCount;

  const formatDate = (date) =>
    new Date(`${date}T12:00:00`).toLocaleDateString(
      "en-GB",
      {
        day: "numeric",
        month: "short",
        year: "numeric"
      }
    );

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-6 text-3xl font-bold">
          My bookings
        </h1>

        <div className="mb-6 flex gap-6 border-b">
          {[
            { id: "upcoming", label: "Upcoming", count: upcomingCount },
            { id: "past", label: "Past", count: pastCount }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
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
                <div className="flex flex-col gap-5 sm:flex-row sm:justify-between">
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold">
                      {booking.lesson}
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                      {booking.craftsperson}
                    </p>

                    <p className="mt-3 text-sm text-gray-600">
                      {formatDate(booking.date)} · {booking.time}
                    </p>

                    <p className="mt-1 text-sm text-gray-600">
                      {booking.location}
                    </p>

                    <p className="mt-1 text-sm font-medium">
                      {booking.price} SAR
                    </p>
                  </div>

                  <div className="flex flex-col items-start gap-3 sm:items-end">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        statusStyles[booking.status] || statusStyles.Pending
                      }`}
                    >
                      {booking.status}
                    </span>

                    <a
                      href={`/learner-preview.html?screen=booking-details&id=${booking.id}`}
                      className="rounded-lg border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50"
                    >
                      View details
                    </a>

                    {isUpcoming(booking) && booking.canCancel && (
                      <a
                        href={`/learner-preview.html?screen=cancel-booking&id=${booking.id}`}
                        className="text-sm text-red-600 underline"
                      >
                        Cancel booking
                      </a>
                    )}

                    {booking.status === "Completed" && (
                      <a
                        href={`/learner-preview.html?screen=review-lesson&id=${booking.id}`}
                        className="text-sm font-medium underline"
                      >
                        Write a review
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
