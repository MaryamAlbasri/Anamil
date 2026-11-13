
import { useState } from "react";
import { getBookingById } from "../../data/bookings";

const statusStyles = {
  Pending: "bg-yellow-100 text-yellow-800",
  Confirmed: "bg-green-100 text-green-800",
  Completed: "bg-gray-100 text-gray-700",
  Cancelled: "bg-red-100 text-red-700"
};

function BookingDetails() {
  const [showMore, setShowMore] = useState(false);

    const bookingId = window.location.pathname.split("/")[2];

  const booking = getBookingById(bookingId);

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

  const status = booking
    ? cancelledIds.includes(booking.id)
      ? "Cancelled"
      : booking.status
    : null;

  const formatDate = (date) =>
    new Date(`${date}T12:00:00`).toLocaleDateString(
      "en-GB",
      {
        day: "numeric",
        month: "short",
        year: "numeric"
      }
    );

  if (!booking) {
    return (
      <main className="min-h-screen bg-gray-50 p-8">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-2xl font-bold">
            Booking not found
          </h1>

          <p className="mt-3 text-gray-600">
            We could not find the selected booking.
          </p>

          <a
            href="/my-bookings"
            className="mt-6 inline-block rounded-lg bg-black px-5 py-3 text-white"
          >
            Back to My Bookings
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-3xl">
        <a
          href="/my-bookings"
          className="text-sm text-gray-600 underline"
        >
          ← Back to My Bookings
        </a>

        <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-sm text-gray-500">
                Booking #{booking.id}
              </p>

              <h1 className="mt-2 text-2xl font-bold">
                {booking.lesson}
              </h1>

              <p className="mt-2 text-gray-600">
                With {booking.craftsperson}
              </p>
            </div>

            <span
              className={`rounded-full px-3 py-1 text-sm font-medium ${
                statusStyles[status]
              }`}
            >
              {status}
            </span>
          </div>

          <div className="mt-6 border-t pt-6">
            <h2 className="mb-4 text-lg font-semibold">
              Booking information
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm text-gray-500">
                  Date
                </p>
                <p className="font-medium">
                  {formatDate(booking.date)}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Time
                </p>
                <p className="font-medium">
                  {booking.time}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Location
                </p>
                <p className="font-medium">
                  {booking.location}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Total paid (demo)
                </p>
                <p className="font-medium">
                  {booking.price} SAR
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 border-t pt-6">
            <button
              type="button"
              onClick={() => setShowMore(!showMore)}
              className="text-sm font-medium underline"
            >
              {showMore
                ? "Hide booking information"
                : "More booking information"}
            </button>

            {showMore && (
              <div className="mt-4 rounded-lg bg-gray-50 p-4 text-sm text-gray-600">
                <p>
                  Booking reference: AN-{booking.id}
                </p>
                <p className="mt-2">
                  Status: {status}
                </p>
                <p className="mt-2">
                  This is a demonstration booking.
                  No real payment was processed.
                </p>
              </div>
            )}
          </div>

          <div className="mt-6 flex flex-wrap gap-3 border-t pt-6">
            {["Pending", "Confirmed"].includes(status) &&
              booking.canCancel && (
                <a
                  href={`/my-bookings/${booking.id}/cancel`}
                  className="rounded-lg border border-red-300 px-5 py-3 text-sm font-medium text-red-600"
                >
                  Cancel booking
                </a>
              )}

            {status === "Completed" && (
              <a
                href={`/my-bookings/${booking.id}/review`}
                className="rounded-lg bg-black px-5 py-3 text-sm font-medium text-white"
              >
                Write a review
              </a>
            )}

            <a
              href="/my-bookings"
              className="rounded-lg border border-gray-300 px-5 py-3 text-sm font-medium"
            >
              My Bookings
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}

export default BookingDetails;
