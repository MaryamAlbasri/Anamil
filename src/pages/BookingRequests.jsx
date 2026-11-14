
import { useState } from "react";
import Button from "../components/Button";
import Tag from "../components/Tag";
import { useBookings } from "../context/BookingContext.jsx";

// AI Assistance: ChatGPT helped integrate BookingRequests
// with shared booking data, status updates, and validations.

function getTagVariant(status) {
  switch (status) {
    case "Confirmed":
    case "Completed":
      return "success";
    case "Declined":
    case "Cancelled":
      return "danger";
    case "Pending":
      return "pending";
    default:
      return "default";
  }
}

// For the prototype, allow completion only after the lesson date.
function hasLessonDatePassed(date) {
  if (!date) return false;

  const lessonDate = new Date(`${date.slice(0, 10)}T00:00:00`);

  if (Number.isNaN(lessonDate.getTime())) {
    return false;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return lessonDate < today;
}

export default function BookingRequests() {
  const { bookings, updateBookingStatus } = useBookings();

  const [decliningId, setDecliningId] = useState(null);
  const [declineReason, setDeclineReason] = useState("");
  const [message, setMessage] = useState("");

  function acceptBooking(id) {
    const booking = bookings.find((item) => item.id === id);

    if (!booking || booking.status !== "Pending") {
      setMessage("This booking cannot be accepted.");
      return;
    }

    updateBookingStatus(id, "Confirmed");
    setMessage("Booking confirmed successfully (demo).");
  }

  function startDecline(id) {
    const booking = bookings.find((item) => item.id === id);

    if (!booking || booking.status !== "Pending") return;

    setDecliningId(id);
    setDeclineReason("");
    setMessage("");
  }

  function confirmDecline() {
    const booking = bookings.find(
        (item) => item.id === decliningId
    );

    if (!booking || booking.status !== "Pending") {
      setDecliningId(null);
      return;
    }

    updateBookingStatus(
        decliningId,
        "Declined",
        declineReason
    );

    setDecliningId(null);
    setDeclineReason("");

    setMessage(
        "Booking declined. Refund and notification are simulated."
    );
  }

  function markCompleted(id) {
    const booking = bookings.find((item) => item.id === id);

    if (
        !booking ||
        booking.status !== "Confirmed" ||
        !hasLessonDatePassed(booking.date)
    ) {
      setMessage("This lesson cannot be completed yet.");
      return;
    }

    updateBookingStatus(id, "Completed");
    setMessage("Lesson marked as completed (demo).");
  }

  return (
      <main className="min-h-screen bg-cream px-4 py-10 text-ink">
        <div className="mx-auto max-w-4xl">
          <h1 className="font-serif text-4xl text-clay">
            Booking Requests
          </h1>

          <p className="mb-8 mt-2 text-sm text-muted">
            Manage learners' requests for your craft lessons.
          </p>

          {message && (
              <p
                  role="status"
                  className="mb-5 rounded-lg bg-blush p-4 text-sm"
              >
                {message}
              </p>
          )}

          <div className="mb-6 grid gap-4 sm:grid-cols-3">
            {["Pending", "Confirmed", "Completed"].map(
                (status) => (
                    <div
                        key={status}
                        className="rounded-xl bg-white p-5 shadow-sm"
                    >
                      <p className="text-sm text-muted">
                        {status}
                      </p>

                      <p className="mt-2 text-3xl font-semibold">
                        {
                          bookings.filter(
                              (booking) => booking.status === status
                          ).length
                        }
                      </p>
                    </div>
                )
            )}
          </div>

          <section className="space-y-4">
            {bookings.length === 0 && (
                <p className="rounded-xl bg-white p-6 text-muted">
                  No booking requests found.
                </p>
            )}

            {bookings.map((booking) => (
                <article
                    key={booking.id}
                    className="rounded-2xl bg-white p-6 shadow-sm"
                >
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h2 className="text-xl font-semibold">
                        Booking #{booking.id}
                      </h2>

                      <p className="text-sm text-muted">
                        Learner ID: {booking.learnerId ?? "N/A"}
                      </p>
                    </div>

                    <Tag variant={getTagVariant(booking.status)}>
                      {booking.status}
                    </Tag>
                  </div>

                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>Lesson:</strong>{" "}
                      {booking.lesson ?? "N/A"}
                    </p>

                    <p>
                      <strong>Craftsperson:</strong>{" "}
                      {booking.craftsperson ?? "N/A"}
                    </p>

                    <p>
                      <strong>Date:</strong>{" "}
                      {booking.date ?? "N/A"}
                    </p>

                    <p>
                      <strong>Time:</strong>{" "}
                      {booking.time ?? "N/A"}
                    </p>

                    <p>
                      <strong>Location:</strong>{" "}
                      {booking.location ?? "N/A"}
                    </p>

                    <p>
                      <strong>Price:</strong>{" "}
                      {booking.price ?? 0} SAR
                    </p>

                    <p>
                      <strong>Payment:</strong>{" "}
                      {booking.paymentStatus ?? "N/A"}
                    </p>

                    {booking.note && (
                        <p>
                          <strong>Learner note:</strong>{" "}
                          {booking.note}
                        </p>
                    )}

                    {booking.status === "Declined" &&
                        booking.declineReason && (
                            <p className="text-red-600">
                              <strong>Decline reason:</strong>{" "}
                              {booking.declineReason}
                            </p>
                        )}
                  </div>

                  {booking.status === "Pending" && (
                      <div className="mt-5 flex flex-wrap gap-3">
                        <Button
                            onClick={() => acceptBooking(booking.id)}
                        >
                          Accept
                        </Button>

                        <Button
                            variant="secondary"
                            onClick={() => startDecline(booking.id)}
                        >
                          Decline
                        </Button>
                      </div>
                  )}

                  {booking.status === "Confirmed" &&
                      hasLessonDatePassed(booking.date) && (
                          <div className="mt-5">
                            <Button
                                onClick={() => markCompleted(booking.id)}
                            >
                              Mark as Completed
                            </Button>
                          </div>
                      )}
                </article>
            ))}
          </section>

          {decliningId !== null && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="decline-title"
                    className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg"
                >
                  <h2
                      id="decline-title"
                      className="mb-3 text-xl font-semibold"
                  >
                    Decline Booking
                  </h2>

                  <label
                      htmlFor="decline-reason"
                      className="mb-2 block text-sm"
                  >
                    Reason (optional)
                  </label>

                  <textarea
                      id="decline-reason"
                      value={declineReason}
                      onChange={(event) =>
                          setDeclineReason(event.target.value)
                      }
                      maxLength={500}
                      rows={4}
                      placeholder="Reason for declining..."
                      className="anamil-input"
                  />

                  <div className="mt-5 flex flex-wrap gap-3">
                    <Button
                        type="button"
                        onClick={confirmDecline}
                    >
                      Confirm Decline
                    </Button>

                    <Button
                        type="button"
                        variant="secondary"
                        onClick={() => {
                          setDecliningId(null);
                          setDeclineReason("");
                        }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
          )}
        </div>
      </main>
  );
}
